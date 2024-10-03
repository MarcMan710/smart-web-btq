const Hafalan = require('../../models/Hafalan'); // Adjust the path as necessary
const { getAllHafalan, getHafalanDetails, createOrUpdateHafalan, deleteHafalan } = require('../../controllers/hafalanController'); // Adjust the path as necessary

describe('Hafalan Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: { id: '123' },
            body: {},
            user: { level: 1 }
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    test('should retrieve all Hafalan entries sorted by levelRequired', async () => {
        const hafalanData = [{ title: 'Test Hafalan', levelRequired: 1 }];
        Hafalan.find = jest.fn().mockReturnValue({ sort: jest.fn().mockResolvedValue(hafalanData) });

        await getAllHafalan(req, res);

        expect(Hafalan.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(hafalanData);
    });

    test('should get details of a specific Hafalan entry by ID', async () => {
        const hafalanData = { title: 'Test Hafalan', levelRequired: 1 };
        Hafalan.findById = jest.fn().mockResolvedValue(hafalanData);

        await getHafalanDetails(req, res);

        expect(Hafalan.findById).toHaveBeenCalledWith('123');
        expect(res.json).toHaveBeenCalledWith(hafalanData);
    });

    test('should return 404 when Hafalan entry is not found', async () => {
        Hafalan.findById = jest.fn().mockResolvedValue(null);

        await getHafalanDetails(req, res);

        expect(Hafalan.findById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Hafalan not found' });
    });

    test('should return 403 when user level is insufficient to access Hafalan details', async () => {
        const hafalanData = { title: 'Test Hafalan', levelRequired: 2 };
        Hafalan.findById = jest.fn().mockResolvedValue(hafalanData);

        await getHafalanDetails(req, res);

        expect(Hafalan.findById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Access denied: Insufficient level' });
    });
});