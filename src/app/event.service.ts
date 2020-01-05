import { Event } from './model/event';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class EventService {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  pathEvent = '/events';

  // navbar
  title$: BehaviorSubject<string>;
  artwork$: BehaviorSubject<string>;
  navBar$: BehaviorSubject<string>;

  constructor(private db: AngularFireDatabase,
              private snackBar: MatSnackBar) {
                this.title$ = new BehaviorSubject('UKAA C.O.C Events');
                this.artwork$ = new BehaviorSubject(null);
                this.navBar$ = new BehaviorSubject('events');
              }

  // Get All Events
  getEvents(): Observable<Event[]> {
     this.itemsRef = this.db.list('/events');
     // Use snapshotChanges().map() to store the key
     this.items = this.itemsRef.snapshotChanges().pipe(
       map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
       )
     );
     return this.items;
  }

  // Get Event by Id
  getEventbyId(id: string): Observable<Event[]> {
    // return this.db.list<Event>(this.pathEvent, ref => ref.orderByChild('id').equalTo(id)).valueChanges();
    return this.db.list<Event>(this.pathEvent, ref => ref.orderByChild('id').equalTo(id)).snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  // Add a new player to an event
  addPlayer(event: Event, id: string, key: string) {
    const obj = this.db.list<Event>(this.pathEvent, ref => ref.orderByChild('id').equalTo(id));
    obj.update(key, event);
  }

  // Add a new event
  addEvent(event: Event) {
    const obj = this.db.list('/events');
    obj.push(event);
  }

  // Delete Event
  deleteEvent(key): void {
    const obj = this.db.list('/events');
    obj.remove(key);
  }

  login(): void {
    // tslint:disable-next-line: max-line-length
    localStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJyb2xlIjoiQWRtaW4ifQ.rEkg53_IeCLzGHlmaHTEO8KF5BNfl6NEJ8w-VEq2PkE`);
  }

  isTokenExpired(): boolean {
    return false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this.isTokenExpired();
  }

  clear(): void {
    localStorage.clear();
  }

  logout(): void {
    this.clear();
    this.snackBar.open('You are disconnected', 'Bye', {
      duration: 10000,
    });
  }

}
