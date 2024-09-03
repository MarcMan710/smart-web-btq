import useAuth from '../hooks/useAuth';

const ApiService = () => {
    const { authState } = useAuth();

    const getHeaders = () => {
        return {
            'Content-Type': 'application/json',
            ...(authState.token ? { Authorization: `Bearer ${authState.token}` } : {}),
        };
    };

    const get = async (url) => {
        const response = await fetch(url, { headers: getHeaders() });
        if (!response.ok) throw new Error('Failed to fetch data');
        return await response.json();
    };

    const post = async (url, body) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error('Failed to submit data');
        return await response.json();
    };

    // Other HTTP methods (PUT, DELETE) can be added similarly

    return { get, post };
};

export default ApiService;