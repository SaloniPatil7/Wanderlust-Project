
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: "mapbox://styles/mapbox/streets-v12",
  center: mapCoordinates,
  zoom: 9
});

console.log(mapCoordinates);

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(mapCoordinates)
  .addTo(map)
  .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML("<h6>Exact Location will be provided after booking</h6>"))