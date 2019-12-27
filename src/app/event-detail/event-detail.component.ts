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
  columnsToDisplay = ['name', 'level', 'icon'];
  expandedElement: Player | null;

  // Data for the select
  thList: any[];

  // Event detail
  event: Event;

  // Player form data
  playerData: Player = {
    name: '',
    level: '',
    icon: '',
    comment: ''
  };

  // Event Id
  id: string;

  // Form toggle
  showForm = true;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar,
    private serv: EventService) {  }

  ngOnInit() {
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
    this.event.playersList.push(this.playerData);

    // Update the event by sending the new object
    this.serv.addPlayer(this.event, this.id, this.event.key);

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
      // Sort the playerList Table : desc
      this.dataSource = this.event.playersList.sort((a, b) => {
        const c = a.level;
        const d = b.level;
        if (c > d) {
          return -1;
        }
        if (c < d) {
          return 1;
        }
        return 0;
      });
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
      comment: ''
    };
  }

}

