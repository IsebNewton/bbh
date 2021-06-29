// TODO: make dynamic, so that it works in local dev mode and in deployment
var apiUrl = 'http://localhost:8080/api';

import axios from 'axios';

class service {

    static getOne(endpointName, id, getParams) {
        const requestOptions = {
            method: 'GET',
            params: getParams
        };
        return axios(`${apiUrl}/${endpointName}/${id}`, requestOptions).then(service.handleResponse);
    }

    static getAll(endpointName, getParams){
        const requestOptions = {
            method: 'GET',
            params: getParams
        };
        return axios(`${apiUrl}/${endpointName}`, requestOptions).then(service.handleHeaderResponse);
    }

    static postOne(endpointName, body){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(body)
        };
        return axios(`${apiUrl}/${endpointName}`, requestOptions).then(service.handleResponse);
    }

    static putOne(endpointName, id, body) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(body)
        };
        return axios(`${apiUrl}/${endpointName}/${id}`, requestOptions).then(service.handleResponse);
    }

    static deleteOne(endpointName, id, body) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(body)
        };
        return axios(`${apiUrl}/${endpointName}/${id}`, requestOptions).then(service.handleResponse);
    }

    static deleteOneSubEntity(endpointName, id, id2, body) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(body)
        };
        return axios(`${apiUrl}/${endpointName}/${id}/${id2}`, requestOptions).then(service.handleResponse);
    }

    static postFile(endpointName, file, destination) {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('destination', destination);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
        };
        return axios(`${apiUrl}/${endpointName}`, requestOptions).then(service.handleResponse);
    }

    static deleteFile(endpointName, getParams) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'multipart/form-data' },
            params: getParams
        };
        return axios(`${apiUrl}/${endpointName}`, requestOptions).then(service.handleResponse);
    }

    static downloadFile(endpointName, getParams, fileName) {
        service.filename = fileName;
        const requestOptions = {
            method: 'GET',
            params: getParams,
            responseType: 'blob'
        };
        return axios(`${apiUrl}/${endpointName}`, requestOptions).then(({ data }) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', service.filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }

    static handleResponse(response) {
        return new Promise(function (resolve, reject) {
            if (response.status == 401) {
                location.reload(true);
                reject(response)
            } else if (response.status >= 200 && response.status <= 230) {
                resolve(response.data);
            } else {
                reject(response);
            }
        }.bind(this))
    }
    
    static handleHeaderResponse(response) {
        return new Promise(function (resolve, reject) {
            if (response.status == 401) {
                location.reload(true);
                reject(response)
            } else if (response.status >= 200 && response.status <= 230) {
                resolve({
                    entities: response.data, headers: response.headers, pagination: {
                        page: parseInt(response.headers['x-page-number']) + 1,
                        pages: parseInt(response.headers['x-page-count']),
                        size: parseInt(response.headers['x-page-size']),
                        total: parseInt(response.headers['x-total-count'])
                    }
                });
            } else {
                reject(response);
            }
        }.bind(this))
    }
}

export default service;