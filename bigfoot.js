
mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGJvcm4iLCJhIjoiY2w1Ym0wbHZwMDh3eTNlbnh1aW51cm0ydyJ9.Z5h4Vkk8zqjf6JydrOGXGA'

navigator.geolocation.getCurrentPosition(p => {
  renderMap([p.coords.longitude, p.coords.latitude])
}, e => {
  console.log(e)
  renderMap([-73.95, 40.69])
})

function renderMap(coords) {
  const map = new mapboxgl.Map({
    center: coords,
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 12
  })
  map.addControl(new mapboxgl.NavigationControl())
}

ScrollReveal().reveal('.card-thing', {
  cleanup: true,
  distance: '20%',
  interval: 100,
  origin: 'bottom',
})
