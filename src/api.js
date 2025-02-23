import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getProjects = async () => {
    try {
        const response = await api.get('/projects');
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const addProject = async (project) => {
    try {
        const response = await api.post('/add_project', project);
        return response.data;
    } catch (error) {
        console.error('Error adding project:', error);
        throw error;
    }
};
