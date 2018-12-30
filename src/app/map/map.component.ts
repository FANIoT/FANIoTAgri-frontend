import { Component } from '@angular/core';

import { control, Map, icon, latLng, marker, polyline, polygon, tileLayer, Layer, layerGroup } from 'leaflet';
import { GestureHandling } from 'leaflet-gesture-handling';

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
        [ 36.720169444444444, 57.20257777777778 ],
        [ 36.731122222222226, 57.204997222222225 ],
        [ 36.73677222222222, 57.180636111111106 ],
        [ 36.726125, 57.17706944444444 ]
      ]),
      'Central Office': marker([36.72371666666667, 57.19871388888888], {
        icon: icon({
          iconSize: [25, 30],
          iconUrl: 'assets/img/drop-pins/office.png',
        })
      }),
      'Weather Station': marker([ 36.6388777778, 57.4046222222 ], {
        icon: icon({
          iconSize: [25, 30],
          iconUrl: 'assets/img/drop-pins/weather.png',
        })
      }),
      'Communication Station': marker([ 36.646472, 57.413339 ], {
        icon: icon({
          iconSize: [25, 30],
          iconUrl: 'assets/img/drop-pins/bts.png',
        })
      }),
      'Vineyard': layerGroup([
        marker([36.618333, 57.419968]).bindPopup('Wine Grape'), // Garden 33
        marker([36.617412, 57.421914]).bindPopup('Wine Grape'), // Garden 34
        marker([36.616586, 57.423869]).bindPopup('Wine Grape'), // Garden 35
        marker([36.615667, 57.425852]).bindPopup('Wine Grape'), // Garden 36
        marker([36.614769, 57.427833]).bindPopup('Wine Grape'), // Garden 37
        marker([36.616700, 57.418761]).bindPopup('Table Grape'), // Garden 41
        marker([36.615866, 57.420759]).bindPopup('Table Grape'), // Garden 42
      ])
    }
  };

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [ this.satelliteStreet ],
    zoom: 12.25,
    center: latLng([ 36.6582695, 57.3080566 ]), // center of the Joveyn provice
    zoomControl: false,
    attributionControl: false,
    gestureHandling: true,
    scrollWheelZoom	: false
  };

  layersControlOptions = {
    position: 'bottomright',
    collapsed: false
  }

  // onMapReady is called with map component reference when it is ready.
  onMapReady(map: Map) {
    map.addControl(control.zoom({ position: 'bottomleft' }));
    Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);
  }

}
