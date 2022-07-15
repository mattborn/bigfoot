const q = document.querySelectorAll.bind(document)
const g = document.getElementById.bind(document)

const state = {}

let coords

function initMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGJvcm4iLCJhIjoiY2w1Ym0wbHZwMDh3eTNlbnh1aW51cm0ydyJ9.Z5h4Vkk8zqjf6JydrOGXGA'

  navigator.geolocation.getCurrentPosition(p => {
    coords = [p.coords.longitude, p.coords.latitude]
    renderMap()
  }, e => {
    coords = [-73.95, 40.69]
    renderMap()
  })
}

function renderMap() {
  // console.log(coords)
  const map = new mapboxgl.Map({
    center: coords,
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 12
  })
  map.addControl(new mapboxgl.NavigationControl())
  const marker1 = new mapboxgl.Marker()
    .setLngLat(coords)
    .addTo(map)
}

ScrollReveal().reveal('.card-thing', {
  cleanup: true,
  distance: '20%',
  interval: 100,
  origin: 'bottom',
})

//mattborn.com/experiment/2044/

function goHere(path) {
  history.pushState({}, path, location.origin +'/demo/'+ path)
  render(path)
}

q('[data-route]').forEach(el => el.addEventListener('click', (e) => {
  // this no longer works for imported pages
  e.preventDefault()
  goHere(el.dataset.route)
}))

window.addEventListener('popstate', (e) => render(getPath()))

function getPath() {
  return location.pathname.substring(5) || location.hash.substring(2) || 'search'
}

function render(path) {
  // if route has a template, load it
  // const html = library.getElementById(path)
  // if (html) document.getElementById('scroll').innerHTML = html.innerHTML
  q('.content').forEach(el => el.classList.remove('active'))
  g(path).classList.add('active')

  if (path === 'map') initMap()

  // mark anything pointing to this route as active
  markActive(path)
}

function markActive(path) {
  q('[data-route]').forEach(el => {
    // remove active class from anything pointing to a route
    el.classList.remove('active')
    // add active class to matching routes
    if (el.dataset.route === path) el.classList.add('active')
  })
}
