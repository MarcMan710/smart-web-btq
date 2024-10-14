import apiService from './apiService';

const hafalanService = () => {
    const { get, post } = apiService();

    const fetchHafalan = async () => {
        try {
            const response = await get('/api/hafalan');
            return response;
        } catch (error) {
            throw new Error('Failed to fetch hafalan data');
        }
    };

    const addHafalan = async (hafalanData) => {
        try {
            const response = await post('/api/hafalan', hafalanData);
            return response;
        } catch (error) {
            throw new Error('Failed to add hafalan data');
        }
    };

    return { fetchHafalan, addHafalan };
};

export default hafalanService;