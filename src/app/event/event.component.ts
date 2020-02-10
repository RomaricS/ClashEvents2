import { Event } from './../model/event';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event: Event = {
    title: '',
    id: '',
    picture: '',
    startsAt: '',
    spinDate: '',
    clanSelection: false,
    active: true,
    townhall: [
      {
        level: 'th13',
        state: true
      },
      {
        level: 'th12',
        state: true
      },
      {
        level: 'th11',
        state: true
      },
      {
        level: 'th10',
        state: true
      },
      {
        level: 'th9',
        state: true
      },
      {
        level: 'th8',
        state: true
      },
      {
        level: 'th7',
        state: true
      }
      ],
    playersList: []
  };

  // Toggle form and buttons
  showForm = true;

  // Date
  startDate = new Date();

  constructor(private snackBar: MatSnackBar,
              private serv: EventService) {
                this.serv.navBar$.next('add');
              }

  ngOnInit() {
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  isFormValid(): boolean {
    return (this.event.title !== '' && this.event.id !== '' && this.event.startsAt !== '' && this.event.spinDate !== '') ;
  }

  openSnackBar() {
    if (this.event.picture === '') {
      this.event.picture = 'https://pbs.twimg.com/profile_images/1142194267319873541/imd-tTed_400x400.jpg';
    }
    this.event.startsAt = new Date(this.event.startsAt).toLocaleDateString('en-GB');
    this.event.spinDate = new Date(this.event.spinDate).toLocaleDateString('en-GB');

    // Send data to db
    this.serv.addEvent(this.event);

    // SnackBar
    this.snackBar.open('Event created', 'Ok', {
      duration: 10000,
    });

    // Hide the form to prevent multiple unwanted entries
    this.toggleForm();
  }
}
