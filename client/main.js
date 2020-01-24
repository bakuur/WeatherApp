import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Markers = new Mongo.Collection('markers');
citiesDB = new Mongo.Collection('cities');

Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {

      var markers = {};

      Markers.find().observe({
        added: function (document) {
          //Create an info window containing weather description
          var infowindow = new google.maps.InfoWindow({
            content: document.description
          });

          //Add marker for each entry in the markers collection
          var marker = new google.maps.Marker({
            draggable: false,
            icon : 'flatpin1.png',
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(document.lat, document.lng),
            map: map.instance,
            id: document._id,
            label: {
              text: document.title,
              color: "#000",
              fontWeight: "500"
            },
          });

          //Add listeners to display and close info window
          marker.addListener('mouseover', function() {
            infowindow.open(map, marker);
          });
          marker.addListener('mouseout', function() {
            infowindow.close(map, marker);
          });

          markers[document._id] = marker;
        },
        changed: function (newDocument, oldDocument) {
          markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
        },
        removed: function (oldDocument) {
          markers[oldDocument._id].setMap(null);
          google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
          delete markers[oldDocument._id];
        }
      });
    });

});


Meteor.startup(function() {
  //TODO: hide key in settings,json file
  //The key has been restricted to be used with only a single domain.
  GoogleMaps.load({ v: '3', key: 'AIzaSyCIBEQH3atkN56OsnJdWmDDCkg5L_ZYKjM', libraries: 'geometry,places' });
});

Template.map.helpers({
    //initial map options
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(53.917965, -122.750263),
          zoom: 5
        };
      }
    }
  });
