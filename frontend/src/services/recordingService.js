// frontend/src/services/recordingService.js
import apiService from './apiService';

const recordingService = () => {
    const { post } = apiService();

    const submitRecording = async (recordingData) => {
        const response = await post('/api/recordings/submit', recordingData);
        return response;
    };

    return { submitRecording };
};

export default recordingService;
