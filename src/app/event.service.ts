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

}
