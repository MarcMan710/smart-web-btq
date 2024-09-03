// frontend/src/services/levelService.js
import apiService from './apiService';

const levelService = () => {
    const { get, post } = apiService();

    const fetchLevels = async () => {
        const response = await get('/api/levels');
        return response;
    };

    const updateUserLevel = async (levelData) => {
        const response = await post('/api/levels/update', levelData);
        return response;
    };

    return { fetchLevels, updateUserLevel };
};

export default levelService;
