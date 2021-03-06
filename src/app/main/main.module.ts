import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatTabsModule } from '@angular/material/tabs';

import { MainComponent } from './main.component';
import { MapComponent } from './map/map.component';
import { SensorsComponent } from './sensors/sensors.component';
import { NavComponent } from './nav/nav.component';
import { CalendarComponent } from './calendar/calendar.component';
import { QuoteComponent } from './quote/quote.component';
import { FooterComponent } from './footer/footer.component';
import { MapRsComponent } from './map-rs/map-rs.component';

@NgModule({
  declarations: [
    MainComponent,
    MapComponent,
    NavComponent,
    SensorsComponent,
    CalendarComponent,
    QuoteComponent,
    FooterComponent,
    MapRsComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    NgbModule,
    ScrollToModule.forRoot(),
    BrowserAnimationsModule,
    MatTabsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class MainModule { }
