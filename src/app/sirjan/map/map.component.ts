import { Component } from '@angular/core';
import { control, Map, icon, latLng, marker, polyline, polygon, tileLayer, Layer, layerGroup } from 'leaflet';
import { interval } from 'rxjs';
import 'leaflet-gesture-handling';
import 'leaflet-measure';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

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
      'Farms': polygon([
        [ 29.307584, 55.807002 ],
        [ 29.308545, 55.811350 ],
        [ 29.305979, 55.812384 ],
        [ 29.306536, 55.815374 ],
        [ 29.307477, 55.815185 ],
        [ 29.307897, 55.815742 ],
        [ 29.314256, 55.814113 ],
        [ 29.314450, 55.815173 ],
        [ 29.315488, 55.815055 ],
        [ 29.316223, 55.819684 ],
        [ 29.306445, 55.821960 ],
        [ 29.304705, 55.809103 ],
      ]),
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
