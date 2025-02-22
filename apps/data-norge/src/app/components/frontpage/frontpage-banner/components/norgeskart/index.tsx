'use client';

import 'leaflet/dist/leaflet.css';

import styles from './norgeskart.module.scss';
import React, { useEffect, useRef } from 'react';

const Norgeskart = () => {
    const mapRef = useRef<HTMLDivElement>(null); // Reference to the map container
    const mapInstanceRef = useRef<any>(null); // Reference to the Leaflet map instance

    const urls = {
        kartverketOld:
            'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart_graatone&zoom={z}&x={x}&y={y}',
        kartverket: {
            topo: 'https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png',
            topograatone: 'https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/webmercator/{z}/{y}/{x}.png',
            toporaster: 'https://cache.kartverket.no/v1/wmts/1.0.0/toporaster/default/webmercator/{z}/{y}/{x}.png',
        },
        osm: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        otm: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        cycle: 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
        osmHot: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    };

    const locations = [
        { name: 'oslo', lat: 59.9130191, lng: 10.740048, zoom: 14, offset: 0.03 },
        { name: 'tromso', lat: 69.64801, lng: 18.98749, zoom: 14, offset: 0.0125 },
        { name: 'trheim', lat: 63.42691, lng: 10.39691, zoom: 14, offset: 0.015 },
        { name: 'bergen', lat: 60.39323, lng: 5.3245, zoom: 14, offset: 0.02 },
        { name: 'geiranger', lat: 62.10186, lng: 7.2, zoom: 13, offset: 0.03 },
        { name: 'leikanger', lat: 61.18556, lng: 6.80454, zoom: 13, offset: 0.02 },
        { name: 'bronnoysund', lat: 65.4764088, lng: 12.2125588, zoom: 13, offset: 0.02 },
    ];

    useEffect(() => {
        const initializeMap = async () => {
            // Dynamically import Leaflet only when needed
            const L = await import('leaflet');
            if (mapInstanceRef.current) return; // Prevent multiple initializations

            const randomIndex = Math.floor(Math.random() * locations.length);
            const initCoords = locations[randomIndex];

            // Initialize Leaflet map
            if (mapRef.current !== null) {
                mapInstanceRef.current = L.map(mapRef.current, {
                    center: [initCoords.lat - initCoords.offset, initCoords.lng],
                    zoom: initCoords.zoom,
                    zoomControl: false,
                });

                // Add tile layer
                L.tileLayer(urls.kartverket.topo, {}).addTo(mapInstanceRef.current);
            }
        };

        initializeMap();

        return () => {
            mapInstanceRef?.current?.remove(); // Clean up on unmount
        };
    }, []);

    return (
        <div
            ref={mapRef}
            className={styles.norgeskart}
            aria-hidden={true}
        />
    );
};

export default Norgeskart;
