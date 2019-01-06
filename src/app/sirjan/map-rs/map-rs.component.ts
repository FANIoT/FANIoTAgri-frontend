import { Component, OnInit } from '@angular/core';
import { control, Map, icon, latLng, tileLayer } from 'leaflet';
import { interval } from 'rxjs';
import 'leaflet-gesture-handling';
import 'leaflet-measure';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import geoblaze from 'geoblaze';

@Component({
  selector: 'app-map-rs',
  templateUrl: './map-rs.component.html',
  styleUrls: ['./map-rs.component.css']
})
export class MapRsComponent implements OnInit {

  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  satMaps = tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  });

  satelliteStreet = tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  });

  layersControl = {
    baseLayers: {
      'Satellite-Street': this.satelliteStreet,
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps,
      'Satellite Maps': this.satMaps
    },
    overlays: {
    }
  };

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [ this.satelliteStreet ],
    zoom: 16.4,
    center: latLng([ 29.306181, 55.813189 ]), // center of the Sirjan provice
    zoomControl: false,
    attributionControl: false,
    gestureHandling: true,
    scrollWheelZoom	: false
  };

  layersControlOptions = {
    position: 'bottomright',
    collapsed: false
  };

  async loadSavi() {
    const data = await geoblaze.load('assets/rs/savi.tif');
    this.layersControl.overlays['savi'] = new GeoRasterLayer({
      georaster: data,
      opacity: 0.7,
      pixelValueToColorFn: (value) => {
        if (value > 0) {
          return "black";
        } else {
          return "white";
        }
      }
    });
  }

  ngOnInit() {
    this.loadSavi();
  }

  // onMapReady is called with map component reference when it is ready.
  onMapReady(map: Map) {
    interval(1000).subscribe(() => { map.invalidateSize(); });
    map.addControl(control.zoom({ position: 'bottomleft' }));
    // casts the control to any because of the leaflet awkward plugin model.
    map.addControl((<any> control).measure(
      {
        position: 'bottomleft',
        primaryLengthUnit: 'meters',
        secondaryLengthUnit: 'kilometers',
        primaryAreaUnit: 'sqmeters',
        secondaryAreaUnit: 'hectares',
      }
    ));
  }
}
