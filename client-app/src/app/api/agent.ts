﻿import Axios, {AxiosResponse} from "axios";
import {IActivity} from "../models/Activity";
import {history} from "../..";
import {toast} from "react-toastify";


Axios.defaults.baseURL = 'http://localhost:5000/api';

Axios.interceptors.response.use(undefined, error => {
    
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running')
    }
    const {status, data, config} = error.response;
    
    if (status === 404) {
        history.push('/notfound')
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound')
    }

    if (status === 500) {
        toast.error('server error - check terminal for more info')
    }

    throw error;
});

const responseBody = (response : AxiosResponse) => response.data;

const sleep = (ms:number) => (response: AxiosResponse) => 
new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms ));

const requests = {
    get: (url:string) => Axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url:string, body: {}) => Axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url:string, body: {}) => Axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url:string) => Axios.delete(url).then(sleep(1000)).then(responseBody)
};

const Activities = {
    list: () : Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${ id }`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id }`, activity),
    delete: (id: string) => requests.del(`/activities/${ id }`)
};

export default {
    Activities
}
