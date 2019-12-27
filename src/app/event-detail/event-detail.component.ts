import { Icons } from './../model/hall';
import { Player } from './../model/player';
import { Event } from './../model/event';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
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

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar,
    private serv: EventService) {  }

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit() {
  // Get event id from url
  this.route.params.subscribe(params => this.loadEventData(params.id));
  }

  openSnackBar() {
    // Get icon based on TH level
    this.playerData.icon = Icons[this.playerData.level];
    // Add new player to existing list
    this.event.playersList.push(this.playerData);
    console.log(this.playerData);

    // Update the event by sending the new object
    this.serv.addPlayer(this.event);
    this.snackBar.open('Player added to Event list', 'Yosh', {
      duration: 2000,
    });
  }

  isFormValid(): boolean {
    return (this.playerData.name !== '' && this.playerData.level !== '');
  }

  loadEventData(id): void {
    this.serv.getEventbyId(id).subscribe(res => {
      this.event = res[0];
      this.dataSource = this.event.playersList;
      this.thList = this.event.townhall.filter(th => th.state);
      console.table(this.thList);
    },
    err => console.log(err));
  }

}

