// frontend/src/services/hafalanService.js
import apiService from './apiService';

const hafalanService = () => {
    const { get } = apiService();

    const fetchHafalan = async () => {
        try {
            const response = await get('/api/hafalan');
            return response;
        } catch (error) {
            throw new Error('Failed to fetch hafalan data');
        }
    };

    // Additional hafalan-related methods can be added here

    return { fetchHafalan };
};

export default hafalanService;