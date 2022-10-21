import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Poi } from '@/_models/poi';

@Injectable({ providedIn: 'root' })
export class PoiService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Poi[]>(`${config.apiUrl}/poi`);
    }

    add(poi: Poi) {
        return this.http.post(`${config.apiUrl}/poi/add`, poi);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/poi/${id}`);
    }
}