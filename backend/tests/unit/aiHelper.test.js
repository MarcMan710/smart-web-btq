const axios = require('axios');
const { processRecording } = require('../../utils/aiHelper'); // Adjust the import path as needed
const config = require('../../config/keys'); // Import the config object

jest.mock('axios');

describe('AI Helper', () => {
    describe('processRecording', () => {
        // Successfully processes a valid audio URL and returns the expected data
        it('should return expected data when given a valid audio URL', async () => {
            const mockResponse = { data: { result: 'success' } };
            jest.spyOn(axios, 'post').mockResolvedValue(mockResponse);

            const audioUrl = 'http://valid-audio-url.com/audio.mp3';
            const result = await processRecording(audioUrl);

            expect(result).toEqual(mockResponse.data);
            expect(axios.post).toHaveBeenCalledWith(config.aiApiUrl, { audioUrl }, { headers: { 'Authorization': `Bearer ${config.aiApiKey}` } });
        });

        // Processes an invalid or malformed audio URL
        it('should throw an error when given an invalid or malformed audio URL', async () => {
            jest.spyOn(axios, 'post').mockRejectedValue(new Error('Invalid URL'));

            const audioUrl = 'invalid-url';

            await expect(processRecording(audioUrl)).rejects.toThrow('AI processing failed');
            expect(axios.post).toHaveBeenCalledWith(config.aiApiUrl, { audioUrl }, { headers: { 'Authorization': `Bearer ${config.aiApiKey}` } });
        });
    });
});