import { Event } from './model/event';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  pathEvent = 'events';

  constructor(private db: AngularFireDatabase) { }

  // Get All Events
  getEvents() {
    return this.db.list(this.pathEvent).valueChanges();
  }

  // Get Event by Id
  getEventbyId(id) {
    // return this.db.collection('/events', ref => ref.orderByChild('id').equalTo(id)).valueChanges();
  }

  // Add a new Event
  addEvent(d) {
    // const obj = this.db.ref(this.pathEvent);
    // obj.push(d);
  }

  signUp(d) {
    // const obj = this.firebase.database.ref(this.pathEvent);
    // obj.push(d);
  }
}
