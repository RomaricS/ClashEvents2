import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface PeriodicElement {
  name: string;
  icon: number;
  level: string;
  comment: string;
}

export interface TownHall {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Hydrogen',
    icon: 1.0079,
    level: 'H',
    comment: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    name: 'Helium',
    icon: 4.0026,
    level: 'He',
    comment: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    name: 'Lithium',
    icon: 6.941,
    level: 'Li',
    comment: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    name: 'Beryllium',
    icon: 9.0122,
    level: 'Be',
    comment: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    name: 'Boron',
    icon: 10.811,
    level: 'B',
    comment: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    name: 'Carbon',
    icon: 12.0107,
    level: 'C',
    comment: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    name: 'Nitrogen',
    icon: 14.0067,
    level: 'N',
    comment: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    name: 'Oxygen',
    icon: 15.9994,
    level: 'O',
    comment: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    name: 'Fluorine',
    icon: 18.9984,
    level: 'F',
    comment: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    name: 'Neon',
    icon: 20.1797,
    level: 'Ne',
    comment: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];

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
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'level', 'icon'];
  expandedElement: PeriodicElement | null;
  event = {
    name : 'CWL January',
    startsAt: '01/01/2020',
    allowed: ['TH12', 'TH13'],
    stillActive: true

  };
  thlist: TownHall[] = [
    {value: 'th-13', viewValue: 'TownHall 13'},
    {value: 'th-12', viewValue: 'TownHall 12'},
    {value: 'th-11', viewValue: 'TownHall 11'},
    {value: 'th-10', viewValue: 'TownHall 10'},
    {value: 'th-9', viewValue: 'TownHall 9'},
  ];

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private snackBar: MatSnackBar) { }

    @ViewChild(MatSort, {static: false}) sort: MatSort;

    ngOnInit() {

    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

}

