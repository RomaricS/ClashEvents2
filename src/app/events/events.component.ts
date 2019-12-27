import { Event } from './../model/event';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [EventService]
})
export class EventsComponent implements OnInit {

  eventList: Event[];
  constructor(private serv: EventService) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.serv.getEvents().subscribe(res => {
      if (res) {
        this.eventList = res.map(this.castData, this);
        console.log(this.eventList);
      } else {
        console.log('NO DATA');
      }
    });
  }

  castData(d): Event {
    const data: Event = {
        title: d.title,
        id: d.id,
        picture: d.picture || 'https://i.ytimg.com/vi/r2BFeSUkNCI/maxresdefault.jpg',
        startsAt: d.startsAt,
        active: d.active,
        townhall: d.townhall.filter(hall => hall.state),
        playersList: d.playersList
    };
    return data;
  }

}
