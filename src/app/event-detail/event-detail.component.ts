import { Icons } from './../model/hall';
import { Player } from './../model/player';
import { Event } from './../model/event';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {MatSnackBar} from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('1s cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class EventDetailComponent implements OnInit {
  // data for the table
  dataSource: Player[];
  columnsToDisplay = ['name', 'level', 'icon', 'action'];
  expandedElement: Player | null;

  artUrl = this.serv.artwork$;

  // Data for the select
  thList: any[];

  // Event detail
  event: Event;

  // Player form data
  playerData: Player = {
    name: '',
    level: '',
    icon: '',
    comment: '',
    ukaa: false,
    fe: false,
    gow: false
  };

  // Event Id
  id: string;

  // Form toggle
  showForm = true;

  // Auth
  isAuth = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar,
    private serv: EventService) {  }

  ngOnInit() {
  // auth check
  this.isAuth = this.serv.isAuthenticated();
  if (!this.isAuth) {
    this.columnsToDisplay = this.columnsToDisplay.filter(res => res !== 'action');
  }

  // Get event id from url
  this.route.params.subscribe(params => {
    this.id = params.id;
    this.loadEventData(this.id);
  });
  }

  openSnackBar() {
    // Get icon based on TH level
    this.playerData.icon = Icons[this.playerData.level];
    // Add new player to existing list
    if (this.event.playersList) {
      this.event.playersList.push(this.playerData);
    } else {
      this.event.playersList = new Array(this.playerData);
    }

    this.updateEvent();
    // SnackBar
    this.snackBar.open('Nice, clash on', 'Got it!', {
      duration: 10000,
    });

    // Hide the form to prevent multiple unwanted entries
    this.toggleForm();
  }

  isFormValid(): boolean {
    return (this.playerData.name !== '' && this.playerData.level !== '');
  }

  loadEventData(id): void {
    this.serv.getEventbyId(id).subscribe(res => {
      this.event = res[0];
      if (this.event.picture && this.event.picture !== '') {
        this.serv.artwork$.next(this.event.picture);
      }
      // Sort the playerList Table : desc
      if (this.event.playersList.length > 0) {
        this.dataSource = this.event.playersList.sort((a, b) => {
          // Sort all GOW players
          const i = a.gow;
          const j = b.gow;
          if (i > j) {
            return 1;
          }
          if (i < j) {
            return -1;
          }

          // Sort FE players
          const g = a.fe;
          const h = b.fe;
          if (g > h) {
            return 1;
          }
          if (g < h) {
            return -1;
          }

          // Sort UKAA players
          const e = a.ukaa;
          const f = b.ukaa;
          if (e > f) {
            return 1;
          }
          if (e < f) {
            return -1;
          }

          // Sort players based on level
          const c = parseInt(a.level.slice(2), 10);
          const d = parseInt(b.level.slice(2), 10);
          if (c > d) {
            return -1;
          }
          if (c < d) {
            return 1;
          }
          return 0;
        });
      }
      this.thList = this.event.townhall.filter(th => th.state);
    },
    err => console.log(err));
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.playerData = {
      name: '',
      level: '',
      icon: '',
      comment: '',
      ukaa: false,
      fe: false,
      gow: false
    };
  }

  // delete player from array
  delPlayer(name): void {
    this.dataSource = this.dataSource.filter(res => res.name !== name);
    this.event.playersList = this.dataSource;
    this.updateEvent();
    this.snackBar.open('Player removed', 'Ok', {
      duration: 10000,
    });
  }

  // Update the event by sending the new object
  updateEvent(): void {
    this.serv.addPlayer(this.event, this.id, this.event.key);
  }

  // Save roster
  saveRoster(): void {
    this.event.playersList = this.dataSource;
    this.updateEvent();
    this.snackBar.open('Roster saved', 'Ok', {
      duration: 10000,
    });
  }

  // Get total for every clan
  getUKAATotal(): number {
    return this.dataSource.filter(res => res.ukaa).length;
  }

  getFETotal(): number {
    return this.dataSource.filter(res => res.fe).length;
  }

  getGOWTotal(): number {
    return this.dataSource.filter(res => res.gow).length;
  }

}

