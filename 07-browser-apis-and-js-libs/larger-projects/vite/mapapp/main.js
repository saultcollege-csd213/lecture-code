
// Import the leaflet CSS
import 'leaflet/dist/leaflet.css' // When using a bundler, you can import CSS files!

// Import the leaflet library
import leaflet from 'leaflet'


function initMap(lat, lng) {
  const map = leaflet.map('map').setView([lat, lng], 15);
  leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  leaflet.marker([lat, lng]).addTo(map)
}

if ( navigator.geolocation ) {

  const params = new URLSearchParams(window.location.search);

  // If the URL contains lat and lng query parameters, use them
  if ( params.has('lat') && params.has('lng') ) {
      try {
          const lat = parseFloat(params.get("lat"));
          const lng = parseFloat(params.get("lng"));
          initMap(lat, lng);
      } catch (e) {
          console.error(e);
      }
  // Otherwise, try to get the user's location using the browser's geolocation API
  } else {
      navigator.geolocation.getCurrentPosition((position) => {
          initMap(position.coords.latitude, position.coords.longitude);
      });
  }
} else {
  document.getElementById('map').textContent = "Geolocation is not supported by this browser";
}