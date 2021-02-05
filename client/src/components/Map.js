import React, { useRef, useState, useEffect } from 'react';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';

import {
	setMapReference,
	setMapZoom,
	setMapBounds,
	getStations as callForStations,
} from '../store/actions/mapActions';
import { initialState } from '../store/reducers/mapReducers';

import GeoSearch from './GeoSearch';
import FireStations from './FireStations';

const Map = () => {
	const zoomThreshhold = useSelector((state) => state.map.zoomThreshhold);
	const currentZoom = useSelector((state) => state.map.zoom);

	const mapRef = useRef(null);
	const { zoom, center } = initialState;
	const dispatch = useDispatch();

	useEffect(() => {
		window.map = mapRef.current.leafletElement;
		dispatch(setMapReference(mapRef.current.leafletElement));
		getStations();
	}, []);

	const getStations = () => {
		const map = mapRef.current.leafletElement;
		const zoom = map.getZoom();
		const bounds = map.getBounds();
		dispatch(setMapZoom(zoom));
		dispatch(setMapBounds(bounds));

		if (zoom >= zoomThreshhold) {
			callForStations({ bounds });
		}
	};

	return (
		<LeafletMap
			center={center}
			zoom={zoom}
			id="mapID"
			ref={mapRef}
			onMoveEnd={getStations}
		>
			<GeoSearch
				position="topleft"
				useMapBounds={false}
				providers={['arcgisOnlineProvider', 'geocodeServiceProvider']}
			/>

			<TileLayer url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=e19950ff5cbf4a589528ddb5134c193e" />

			{currentZoom >= zoomThreshhold && <FireStations />}
		</LeafletMap>
	);
};

export default Map;
