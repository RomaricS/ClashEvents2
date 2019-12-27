import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventComponent } from './event/event.component';

// Material Components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';

// DB
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Services
import { EventService } from './event.service';



@NgModule({
   declarations: [
      AppComponent,
      EventsComponent,
      HomeComponent,
      EventDetailComponent,
      EventComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      MatCardModule,
      MatButtonModule,
      MatInputModule,
      MatTableModule,
      MatSelectModule,
      MatSnackBarModule,
      MatListModule,
      MatIconModule,
      FormsModule,
      MatGridListModule,
      MatDatepickerModule,
      MatCheckboxModule,
      MatNativeDateModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
      AngularFireAuthModule
    ],
   providers: [EventService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
