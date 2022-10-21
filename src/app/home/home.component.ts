import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { Poi } from '@/_models/poi';
import { AuthenticationService } from '@/_services';
import { PoiService } from '@/_services/poi.service';

declare var L: any;

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

    latitude: number = -1.538717;
    longitude: number = 47.205638;

    map: any;

    currentUser: User;

    pois = [];

    // Tableau d'objets connectés non dynamique
    objets = [
        {
            "id": 1,
            "latitude":-1.538717,
            "longitude":47.205638,
            "type":"Drone",
            "description": "Point de drone"
        },
        {
            "id": 2,
            "latitude":-1.539,
            "longitude":47.20,
            "type":"Panneau",
            "description": "Point de panneau photovoltaique"
        },
    ]

    constructor(
        private authenticationService: AuthenticationService,
        private poiService: PoiService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {

        this.map = L.map('map').setView([this.longitude, this.latitude], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        // Boucle foreach pour créer un marqueur pour chaque objet connecté en base de données

        this.objets.forEach(element => {
            L.marker([element.longitude, element.latitude])
            .addTo(this.map)
            .bindPopup(element.type).openPopup();
        });

        this.map.on('click', this.addMarker);
    }

    addMarker(e) {
        L.marker(e.latlng).addTo(this.map);
    }

}