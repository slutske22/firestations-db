export const C = {

   SET_MAP_REFERENCE: "SET_MAP_REFERENCE",
   SET_MAP_CENTER: "SET_MAP_CENTER",
   SET_MAP_ZOOM: "SET_MAP_ZOOM",
   SET_MAP_BOUNDS: "SET_MAP_BOUNDS",
   SET_FIRESTATIONS: "SET_FIRESTATIONS"

}

export const setMapReference = reference => ({
   type: C.SET_MAP_REFERENCE,
   reference
})

export const setMapCenter = center => ({
   type: C.SET_MAP_CENTER,
   center
})

export const setMapZoom = zoom => ({
   type: C.SET_MAP_ZOOM,
   zoom
})

export const setMapBounds = bounds => ({
   type: C.SET_MAP_BOUNDS,
   bounds
})

export const setFireStations = stations => ({
   type: C.SET_FIRESTATIONS,
   stations
})