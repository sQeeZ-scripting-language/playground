import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private baseUrl: string = 'https://sqeez-webservice.onrender.com';

    constructor(
        private http: HttpClient,
    ) { }

    public async activateWebservice(): Promise<string> {
        return await this.http.get(`${this.baseUrl}`, { responseType: 'text' }).toPromise() ?? '';
    }

    public async interpretCode(code: string): Promise<any> {
        return await this.http.post(`${this.baseUrl}/api/interpreter/interpret`, { code: code, dev: false }).toPromise() ?? '';
    }
}
