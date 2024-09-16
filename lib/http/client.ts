import axios, { AxiosResponse } from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:4000/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthHeader = (token : string) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
};

export const authService = {
    register: (data : any): Promise<AxiosResponse> => {
        return apiClient.post('/auth/register', data);
    },
    login: (data : any): Promise<AxiosResponse> => {
        return apiClient.post('/auth/login', data);
    },
    resetPassword: (data : any): Promise<AxiosResponse> => {
        return apiClient.post('/auth/password', data);
    },
};

export const eventService = {
    createEvent: (data : any, token : string): Promise<AxiosResponse> => {
        return apiClient.post('/events', data, setAuthHeader(token));
    },
    getAllEvents: (token : string): Promise<AxiosResponse> => {
        return apiClient.get('/events?limit=10&page=1', setAuthHeader(token));
    },
    getEventById: (id : string, token : string): Promise<AxiosResponse> => {
        return apiClient.get(`/events/${id}`, setAuthHeader(token));
    },
    updateEvent: (id : string, data : any, token : string): Promise<AxiosResponse> => {
        return apiClient.patch(`/events/${id}`, data, setAuthHeader(token));
    },
};

export const projectService = {
    createProject: (data : any, token : string): Promise<AxiosResponse> => {
        return apiClient.post('/projects', data, setAuthHeader(token));
    },
    getAllProjects: (token : string): Promise<AxiosResponse> => {
        return apiClient.get('/projects?limit=10&page=1', setAuthHeader(token));
    },
    getProjectById: (id : string, token : string): Promise<AxiosResponse> => {
        return apiClient.get(`/projects/${id}`, setAuthHeader(token));
    },
    updateProject: (id : string, data : any, token : string): Promise<AxiosResponse> => {
        return apiClient.patch(`/projects/${id}`, data, setAuthHeader(token));
    },
};

export const rssService = {
    getAllRSS: (token : string): Promise<AxiosResponse> => {
        return apiClient.get('/rss?limit=10&page=1', setAuthHeader(token));
    },
    getRSSById: (id : string, token : string): Promise<AxiosResponse> => {
        return apiClient.get(`/rss/${id}`, setAuthHeader(token));
    },
};

export const datasetService = {
    getAllDatasets: (token : string): Promise<AxiosResponse> => {
        return apiClient.get('/datasets?limit=10&page=1', setAuthHeader(token));
    },
    getDatasetById: (id : string, token : string): Promise<AxiosResponse> => {
        return apiClient.get(`/datasets/${id}`, setAuthHeader(token));
    },
};

export const commentService = {
    postComment: (data : any, token : string): Promise<AxiosResponse> => {
        return apiClient.post('/comments', data, setAuthHeader(token));
    },
    getComments: (token : string): Promise<AxiosResponse> => {
        return apiClient.get('/comments', setAuthHeader(token));
    },
};
