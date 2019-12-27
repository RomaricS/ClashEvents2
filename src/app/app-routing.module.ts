import { EventComponent } from './event/event.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDetailComponent } from './event-detail/event-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'admin', component: HomeComponent },
  { path: 'addEvent', component: EventComponent },
  { path: 'event/:id', component: EventDetailComponent },
  { path: 'events', component: EventsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
