﻿import Axios, {AxiosResponse} from "axios";
import {IActivity} from "../models/Activity";
import {act} from "react-dom/test-utils";

Axios.defaults.baseURL = 'http://localhost:5000/api';

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
