import { Hall } from './../model/hall';
import { Player } from './../model/player';
import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-clan-list',
  templateUrl: './clan-list.component.html',
  styleUrls: ['./clan-list.component.scss']
})
export class ClanListComponent implements OnInit {

  @Input() list: Player[];
  @Input() clanName: string;
  @Input() halls: any;


  stats = [
    {
      level: 'th13',
      total: 0
    },
    {
      level: 'th12',
      total: 0
    },
    {
      level: 'th11',
      total: 0
    },
    {
      level: 'th10',
      total: 0
    },
    {
      level: 'th9',
      total: 0
    },
    {
      level: 'th8',
      total: 0
    },
    {
      level: 'th7',
      total: 0
    }
  ];

  constructor(private serv: EventService) { }

  ngOnInit() {
    this.stats = this.stats.filter(res => this.getActiveHall(res.level));
    console.log(this.stats);
  }

  getTotalByLevel(level: string): number {
    if (this.list.length > 0) {
      return this.list.filter(res => res.level === level).length;
    }
    return 0;
  }

  getActiveHall(level: string): boolean {
    if (this.halls.length > 0) {
      return this.halls.filter(res => res.level === level && res.state).length > 0;
    }
    return false;
  }

  exportRoster() {
    const a = this.list.map(res => {
      return {
        name: res.name.toUpperCase(),
        level: res.level.toUpperCase(),
        comment: res.comment.toUpperCase()
      };
    });
    this.serv.exportAsExcelFile(a, this.clanName);
  }

}
