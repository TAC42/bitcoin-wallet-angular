import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map, take } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { storageService } from './user-async-storage.service';
import { User, UserFilter } from '../models/user.model';
const ENTITY = 'users'

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {

        const users = JSON.parse(localStorage.getItem(ENTITY) || 'null');
        if (!users || users.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify(this._createUsers()))
        }
    }

    private _users$ = new BehaviorSubject<User[]>([]);
    public users$ = this._users$.asObservable()

    private _filterBy$ = new BehaviorSubject<UserFilter>({ term: '' });
    public filterBy$ = this._filterBy$.asObservable()


    public query() {
        return from(storageService.query<User>(ENTITY))
            .pipe(
                tap(users => {
                    const filterBy = this._filterBy$.value
                    users = users.filter(user => user.name.toLowerCase().includes(filterBy.term.toLowerCase()))
                    this._users$.next(users)
                }),
                retry(1),
                catchError(this._handleError)
            )
    }


    public shouldAdoptUser() {
        return this.http.get<{ answer: string }>('https://yesno.wtf/api')
            .pipe(
                map(res => res.answer),
                retry(1),
                catchError((err: HttpErrorResponse) => {
                    console.log('err:', err)
                    return throwError(() => err)
                })
            )
    }

    public getEmptyUser() {
        return { name: '', coins: 0, moves: [] }
    }

    public remove(userId: string) {
        return from(storageService.remove(ENTITY, userId))
            .pipe(
                tap(() => {
                    const pets = this._users$.value
                    const petIdx = pets.findIndex(pet => pet._id === userId)
                    pets.splice(petIdx, 1)
                    this._users$.next([...pets]);
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public getById(petId: string): Observable<User> {
        return from(storageService.get<User>(ENTITY, petId))
            .pipe(
                retry(1),
                catchError(this._handleError)
            )

    }

    public setFilterBy(filterBy: UserFilter) {
        this._filterBy$.next(filterBy)
        this.query().pipe(take(1)).subscribe()
    }

    public save(user: User) {
        return user._id ? this._edit(user) : this._add(user)
    }

    private _add(user: User) {
        return from(storageService.post(ENTITY, user))
            .pipe(
                tap(newUser => {
                    const pets = this._users$.value
                    pets.push(newUser)
                    this._users$.next([...pets])
                    return newUser
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _edit(user: User) {
        return from(storageService.put(ENTITY, user))
            .pipe(
                tap(updatedUser => {
                    const users = this._users$.value
                    const userIdx = users.findIndex(_user => _user._id === user._id)
                    users.splice(userIdx, 1, updatedUser)
                    this._users$.next([...users])
                    return updatedUser
                }),
                retry(1),
                catchError(this._handleError)
            )
    }


    private _createUsers() {
        const users: User[] = [
            { _id: 'u123', name: 'Melody Burns', coins: 100 , moves: [] },
            { _id: 'u124', name: 'Brian Adams', coins: 100 , moves: [] },
            { _id: 'u125', name: 'Mila Kunis',  coins: 100 , moves: [] },
            { _id: 'u126', name: 'Hugh Laurie', coins: 100 , moves: [] },
            { _id: 'u127', name: 'David Solomon',  coins: 100 , moves: [] },
            { _id: 'u128', name: 'Albert Einstein',  coins: 100 , moves: [] },
        ];
        return users
    }

    private _handleError(err: HttpErrorResponse) {
        console.log('err:', err)
        return throwError(() => err)
    }

    private _makeId(length = 5) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
