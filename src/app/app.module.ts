import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SensorsComponent } from './sensors/sensors.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SensorsComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
