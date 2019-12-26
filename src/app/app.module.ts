import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

// Material Components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EventComponent } from './event/event.component';

// DB
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
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
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule, // imports firebase/firestore, only needed for database features
      AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
      AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
      AngularFireStorageModule // imports firebase/storage only needed for storage features
    ],
   providers: [EventService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
