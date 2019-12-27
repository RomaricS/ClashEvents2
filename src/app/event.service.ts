import { Event } from './model/event';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class EventService {

  pathEvent = '/events';

  constructor(private db: AngularFireDatabase) { }

  // Get All Events
  getEvents(): Observable<Event[]> {
    return this.db.list<Event>(this.pathEvent).valueChanges();
  }

  // Get Event by Id
  getEventbyId(id): Observable<Event[]> {
    return this.db.list<Event>(this.pathEvent, ref => ref.orderByChild('id').equalTo(id)).valueChanges();
  }

  // Add a new player to an event
  addPlayer(player) {
    const obj = this.db.database.ref(this.pathEvent);
    obj.push(player);
  }

}
