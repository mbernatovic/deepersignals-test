import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { AuthenticationService } from './auth.service';

export class BaseService {
    currentUser: any;
    accessToken: string;
    url: string;
    options: { headers: { 'X-Token': string;} };
    headers: { 'X-Token': string;};

    constructor(protected http: HttpClient, protected authService: AuthenticationService) {
        this.currentUser = this.authService.currentUserValue;
        this.accessToken = this.currentUser.token;
        this.url = environment.apiUrl;
        this.headers = { 'X-Token': this.accessToken };
        this.options = { headers: this.headers };
    }

    getData(urlSlug) {
        const url = this.url + urlSlug;
        return this.http
            .get<any>(url.replace(/[^\x20-\x7E]/g, ''), this.options)
            .pipe(map((body) => body));
    }

    deleteData(urlSlug) {
        const url = this.url + urlSlug;
        return this.http
            .delete<any>(url.replace(/[^\x20-\x7E]/g, ''), this.options)
            .pipe(map((body) => body));
    }

    updateData(urlSlug, body) {
        const url = this.url + urlSlug;
        return this.http.post<any>(url, body, this.options);
    }

    serialize(obj): string {
        const str = [];
        for (const p in obj) {
            if (obj.hasOwnProperty(p)) {
                if (obj[p] != null && obj[p] !== '') {
                    if ((Array.isArray && Array.isArray(obj[p])) || Object.prototype.toString.call(obj[p]) === '[object Array]') {
                        obj[p].forEach(x => str.push(encodeURIComponent(`${p}`) + '=' + encodeURIComponent(x)));
                    } else {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                }
            }
        }

        return str.join('&');
    }
}
