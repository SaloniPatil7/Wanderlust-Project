
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12', 
  center: mapListing.geometry.coordinates, 
  zoom: 9 
});

// console.log(mapCoordinates);

const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(mapListing.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML("<h6>Exact Location will be provided after booking</h6>"))
  .addTo(map);