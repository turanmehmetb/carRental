import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class BaseService<T, ID> {
    constructor(
        protected _http: HttpClient, 
        protected _base: string
    ) { }

    save(t: T): Observable<T> {
        return this._http.post<T>(this._base, t);
    }

    multiSave(t: T[]): Observable<T> {
        return this._http.post<T>(this._base + "/insertMany", t);
    }

    multiUpdate(t: T[]): Observable<T> {
        return this._http.post<T>(this._base + "/updateMany", t);
    }

    multiDelete(t: string[]): Observable<T> {
        return this._http.post<T>(this._base + "/deleteMany", t);
    }

    update(t: T): Observable<T> {
        return this._http.put<T>(this._base, t);
    }

    findOne(id: ID): Observable<T> {
        return this._http.get<T>(this._base + '/' + id);
    }

    findAll(): Observable<T[]> {
        return this._http.get<T[]>(this._base);
    }

    delete(id: ID): Observable<T> {
        return this._http.delete<T>(this._base + '/' + id);
    }
    
    deleteAll(): Observable<T> {
        return this._http.delete<T>(this._base + '/');
    }

    findByStatus(id: ID): Observable<T> {
        return this._http.get<T>(this._base + '/findByStatus/' + id);
    }

    findAllByStatus(): Observable<T[]> {
        return this._http.get<T[]>(this._base + '/findAllByStatus/');
    }

    findCount(): Observable<number> {
        return this._http.get<number>(this._base + '/findCount/');
    }

    findCountByStatus(): Observable<number> {
        return this._http.get<number>(this._base + '/findCountByStatus/');
    }

    deleteByStatus(t: T): Observable<T> {
        return this._http.put<T>(this._base + '/delete/', t);
    }
}