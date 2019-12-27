import { Event } from './model/event';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class EventService {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  pathEvent = '/events';

  constructor(private db: AngularFireDatabase) { }

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

}
