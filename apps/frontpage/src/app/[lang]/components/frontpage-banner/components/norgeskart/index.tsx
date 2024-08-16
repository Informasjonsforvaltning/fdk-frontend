'use client';

import dynamic from 'next/dynamic';

// import { MapContainer, TileLayer } from 'react-leaflet';
const MapContainer = dynamic(() => import('react-leaflet').then((module) => module.MapContainer), {
    ssr: false,
});
const TileLayer = dynamic(() => import('react-leaflet').then((module) => module.TileLayer), {
    ssr: false,
});

import 'leaflet/dist/leaflet.css';

import styles from './norgeskart.module.scss';

const Norgeskart = () => {
    const urls = {
        kartverketOld:
            'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart_graatone&zoom={z}&x={x}&y={y}',
        kartverket: {
            topo: 'https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png',
            topograatone: 'https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/webmercator/{z}/{y}/{x}.png',
            toporaster: 'https://cache.kartverket.no/v1/wmts/1.0.0/toporaster/default/webmercator/{z}/{y}/{x}.png'
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
    ];

    const randomIndex = Math.floor(Math.random() * locations.length);
    const initCoords = locations[randomIndex];
    // const initCoords = locations[4];

    return (
        <MapContainer
            className={styles.norgeskart}
            center={[initCoords.lat - initCoords.offset, initCoords.lng]}
            zoom={initCoords.zoom}
            zoomControl={false}
        >
            <TileLayer url={urls.kartverket.topo} />
        </MapContainer>
    );
};

export default Norgeskart;
