const { submitRecording, reprocessRecording, approveRecording, getRecordingDetails, deleteAIResult, giveFeedback } = require('../../controllers/recordingController');
const Hafalan = require('../../models/Hafalan');
const Recording = require('../../models/Recording');
const User = require('../../models/User');
const { processRecording } = require('../../utils/aiHelper');

jest.mock('../../models/Hafalan');
jest.mock('../../models/Recording');
jest.mock('../../models/User');
jest.mock('../../utils/aiHelper');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
};

const mockRequest = (body = {}, params = {}, user = {}) => ({
    body,
    params,
    user
});

describe('Recording Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should process and save a new recording when valid data is provided', async () => {
        const req = mockRequest(
            { audioUrl: 'http://example.com/audio.mp3', hafalanId: 'hafalan123' },
            {},
            { id: 'user123' }
        );
        const res = mockResponse();

        const hafalan = { _id: 'hafalan123' };
        const recording = {
            save: jest.fn(),
            _id: 'recording123',
            user: 'user123',
            hafalan: 'hafalan123',
            audioUrl: 'http://example.com/audio.mp3',
            status: 'processing'
        };
        const aiResult = { score: 85 };

        Hafalan.findById.mockResolvedValue(hafalan);
        Recording.mockImplementation(() => recording);
        processRecording.mockResolvedValue(aiResult);

        await submitRecording(req, res);

        expect(Hafalan.findById).toHaveBeenCalledWith('hafalan123');
        expect(recording.save).toHaveBeenCalled();
        expect(processRecording).toHaveBeenCalledWith('http://example.com/audio.mp3');
        expect(recording.status).toBe('pending_approval');
        expect(recording.aiResult).toBe(aiResult);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Recording submitted and processed, awaiting approval',
            recording
        });
    });

    it('should update recording status and reprocess when reprocessing a recording', async () => {
        const req = mockRequest({}, { id: 'recording123' });
        const res = mockResponse();

        const recording = {
            _id: 'recording123',
            audioUrl: 'http://example.com/audio.mp3',
            status: 'completed',
            save: jest.fn()
        };
        const aiResult = { score: 75 };

        Recording.findById.mockResolvedValue(recording);
        processRecording.mockResolvedValue(aiResult);

        await reprocessRecording(req, res);

        expect(recording.save).toHaveBeenCalledTimes(2);
        expect(recording.status).toBe('completed');
        expect(processRecording).toHaveBeenCalledWith('http://example.com/audio.mp3');
        expect(res.json).toHaveBeenCalledWith({
            message: 'Recording reprocessed',
            recording
        });
    });

    it('should update user\'s progress and level when approving a recording', async () => {
        const req = mockRequest(
            { score: 80 },
            { id: 'recording123' }
        );
        const res = mockResponse();

        const recording = {
            _id: 'recording123',
            user: 'user123',
            aiResult: { score: 80 },
            save: jest.fn()
        };
        const user = {
            _id: 'user123',
            progress: [],
            level: 4,
            role: 'student',
            completedModules: 5,
            save: jest.fn()
        };

        Recording.findById.mockResolvedValue(recording);
        User.findById.mockResolvedValue(user);

        await approveRecording(req, res);

        expect(Recording.findById).toHaveBeenCalledWith('recording123');
        expect(User.findById).toHaveBeenCalledWith('user123');
        expect(recording.save).toHaveBeenCalled();
        expect(user.progress).toContainEqual({ recordingId: 'recording123', score: 80 });
        expect(user.level).toBe(5);
        expect(user.completedModules).toBe(6);
        expect(user.role).toBe('instructor');
        expect(res.json).toHaveBeenCalledWith({
            message: 'Recording approved',
            recording,
            promotionMessage: 'Congratulations on your promotion to Instructor!'
        });
    });

    it('should return correct recording details when valid ID is provided', async () => {
        const req = mockRequest({}, { id: 'recording123' });
        const res = mockResponse();

        const recording = {
            _id: 'recording123',
            user: 'user123',
            hafalan: 'hafalan123',
            audioUrl: 'http://example.com/audio.mp3',
            status: 'completed'
        };

        Recording.findById.mockResolvedValue(recording);

        await getRecordingDetails(req, res);

        expect(res.json).toHaveBeenCalledWith(recording);
    });

    it('should update recording\'s AI result field to null when deleting AI result', async () => {
        const req = mockRequest({}, { id: 'recording123' });
        const res = mockResponse();

        const recording = {
            save: jest.fn(),
            _id: 'recording123',
            status: 'processing',
            aiResult: { score: 85 }
        };

        Recording.findById.mockResolvedValue(recording);

        await deleteAIResult(req, res);

        expect(recording.aiResult).toBeNull();
        expect(recording.save).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            message: 'AI result deleted',
            recording
        });
    });

        // Successfully adds feedback to an existing recording
    it('should add feedback to an existing recording when valid ID is provided', async () => {
      const req = {
        params: { id: 'validRecordingId' },
        body: { feedback: 'Great recording!' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const recording = {
        feedback: '',
        save: jest.fn().mockResolvedValue(true)
      };
      jest.spyOn(Recording, 'findById').mockResolvedValue(recording);

      await giveFeedback(req, res);

      expect(Recording.findById).toHaveBeenCalledWith('validRecordingId');
      expect(recording.feedback).toBe('Great recording!');
      expect(recording.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Feedback diberikan', recording });
    });
});