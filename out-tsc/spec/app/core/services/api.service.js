import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { constants } from '../constants';
let ApiService = class ApiService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    get(query) {
        const url = `${constants.api.baseUrl}${query}`;
        return this.httpClient.get(url);
    }
    post(query, body) {
        const url = `${constants.api.baseUrl}${query}`;
        return this.httpClient.post(url, body);
    }
    update(query, body) {
        const url = `${constants.api.baseUrl}${query}`;
        return this.httpClient.put(url, body);
    }
    patch(query, body) {
        const url = `${constants.api.baseUrl}${query}`;
        return this.httpClient.patch(url, body);
    }
    delete(query) {
        const url = `${constants.api.baseUrl}${query}`;
        return this.httpClient.delete(url);
    }
    request(method, query, options) {
        const url = `${constants.api.baseUrl}${query}`;
        return this.httpClient.request(method, url, options);
    }
};
ApiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ApiService);
export { ApiService };
//# sourceMappingURL=api.service.js.map