import { Event } from './model/event';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

  // Download
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class EventService {
  itemsRef: AngularFireList<any>;
  credRef: AngularFireList<any>;
  items: Observable<any[]>;
  cred: Observable<any[]>;
  pathEvent = '/events';

  // navbar
  title$: BehaviorSubject<string>;
  artwork$: BehaviorSubject<string>;
  navBar$: BehaviorSubject<string>;

  token = this.cred;

  constructor(private db: AngularFireDatabase,
              private snackBar: MatSnackBar) {
                this.title$ = new BehaviorSubject('UKAA C.O.C Events');
                this.artwork$ = new BehaviorSubject(null);
                this.navBar$ = new BehaviorSubject('events');
              }

  // Get All Events
  getEvents(): Observable<Event[]> {
     this.itemsRef = this.db.list('/events');
     // Use snapshotChanges().map() to store the key
     this.items = this.itemsRef.snapshotChanges().pipe(
       map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
       )
     );
     return this.items;
  }

  // Get Event by Id
  getEventbyId(id: string): Observable<Event[]> {
    // return this.db.list<Event>(this.pathEvent, ref => ref.orderByChild('id').equalTo(id)).valueChanges();
    return this.db.list<Event>(this.pathEvent, ref => ref.orderByChild('id').equalTo(id)).snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  // Add a new player to an event
  addPlayer(event: Event, id: string, key: string) {
    const obj = this.db.list<Event>(this.pathEvent, ref => ref.orderByChild('id').equalTo(id));
    obj.update(key, event);
  }

    // Update cred
  updateCred(cred, id: string, key: string) {
      const obj = this.db.list<any>('/cred', ref => ref.orderByChild('id').equalTo(id));
      obj.update(key, cred);
    }

  // Add a new event
  addEvent(event: Event) {
    const obj = this.db.list('/events');
    obj.push(event);
  }

  // Get cred
  getCred(): Observable<any> {
    this.credRef = this.db.list('/cred');
    // Use snapshotChanges().map() to store the key
    this.cred = this.credRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.getToken();
    return this.cred;
 }

  // Delete Event
  deleteEvent(key): void {
    const obj = this.db.list('/events');
    obj.remove(key);
  }

  login(token, admin): void {
    if (admin) {
    localStorage.setItem('adminUKAA', 'MRTCREDENTIALSFORUKAA');
    }
    localStorage.setItem('token', token);
  }

  isTokenExpired(): boolean {
      return false;
  }

  getToken(): any {
    this.cred.subscribe(res => this.token = res[0].token);
  }

  isSameToken() {
    // return localStorage.getItem('token') === token[0].token;
  }

  isAuthenticated(): any {
    // this.getCred();
    // console.log(this.isSameToken());
    return localStorage.getItem('token') != null && !this.isTokenExpired();
  }

  clear(): void {
    localStorage.clear();
  }

  logout(): void {
    this.clear();
    this.snackBar.open('You are disconnected', 'Bye', {
      duration: 10000,
    });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
