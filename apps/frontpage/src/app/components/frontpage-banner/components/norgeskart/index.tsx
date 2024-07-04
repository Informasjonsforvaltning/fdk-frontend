"use client";

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
 
const MapContainer = dynamic(() => import('react-leaflet').then((module) => module.MapContainer), {
    ssr: false   // Disable server-side rendering
});

const TileLayer = dynamic(() => import('react-leaflet').then((module) => module.TileLayer), {
    ssr: false   // Disable server-side rendering
});

import "leaflet/dist/leaflet.css";

import styles from './norgeskart.module.scss';

const Norgeskart = () => {

	const url = 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart_graatone&zoom={z}&x={x}&y={y}';
  
  const locations = [
    { name: 'oslo', lat: 59.9130191, lng: 10.740048, zoom: 13, offset: 0.035 },
    { name: 'tromso', lat: 69.64801, lng: 18.98749, zoom: 14, offset: 0.0125 },
    { name: 'trheim', lat: 63.42691, lng: 10.39691, zoom: 14, offset: 0.015 },
    { name: 'bergen', lat: 60.39323, lng: 5.3245, zoom: 14, offset: 0.02 },
    { name: 'geiranger', lat: 62.10186, lng: 7.20719, zoom: 13, offset: 0.0275 }
  ];

  const randomIndex = Math.floor(Math.random() * locations.length);
  const initCoords = locations[randomIndex];

	return (
		<MapContainer
			className={styles.norgeskart}
			center={[initCoords.lat-initCoords.offset, initCoords.lng]}
			zoom={initCoords.zoom}
			zoomControl={false}
		>
      <TileLayer url={url} />
    </MapContainer>
	);
}

export { Norgeskart };