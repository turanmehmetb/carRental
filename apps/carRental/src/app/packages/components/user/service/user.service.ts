import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from "@carRental/models";
import { BehaviorSubject, Observable, lastValueFrom } from "rxjs";
import { BaseService } from "../../../base/base.service";
import { ConfigService } from "../../../config/config.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService<User, string> {

    constructor(private readonly http: HttpClient, private readonly configService: ConfigService) {
        super(http, configService.getConfig().apiBaseUrl + '/user');
    }

    loginState = new BehaviorSubject(this.getToken() ? true : false);
    
    test() {
        return this.http.get(this._base + '/test');
    }

    login(credentials: User): Observable<{accessToken: string, userId: string}> {
        return this.http.post<{accessToken: string, userId: string}>(this._base + '/login', credentials);
    }

    register(credentials: User): Observable<User> {
        return this.http.post<User>(this._base + '/register', credentials);
    }

    changePassword(email: string, password: string): Observable<User> {
        let params = new HttpParams();
        params = params.append("email", email);
        params = params.append("password", password);
        return this.http.get<User>(this._base + '/changePassword', {params} );
    }

    logout() {
        this.removeToken();
        this.removeUserId();
    }

    getUserByEmail(email: string): Observable<User> {
        let params = new HttpParams();
        params = params.append("email", email);
        return this.http.get<User>(this._base + '/getUserByEmail', {params: params} );
    }

    getUserByUserId(userId: string): Observable<User> {
        let params = new HttpParams();
        params = params.append("userId", userId);
        return this.http.get<User>(this._base + '/getUserByUserId', {params: params});
    }

    async getCurrentUser(): Promise<User | null> {
        const userId = this.getUserId();
        if(userId && this.isLoggedIn()) {
            return lastValueFrom(this.getUserByUserId(userId));
        }
        
        return null;
    }
      
    setUserId(userId: string) {
        localStorage.setItem('userId', userId);
    }

    getUserId(): string | null{
        return localStorage.getItem('userId');
    }

    removeUserId() {
        localStorage.removeItem('userId');
    }
    
    setToken(token: string): void {
        this.loginState.next(true);
        localStorage.setItem('token', token);
    }

    
    getToken(): string | null{
        return localStorage.getItem('token');
    }

    removeToken(): void {
        this.loginState.next(false);
        localStorage.removeItem('token');
    }

    isLoggedIn(): boolean  {
        return localStorage.getItem('token') ? true : false;
    }

}