import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    sessionId: String
  }
  connect() {
    // Get the mapBoxGL api key, and the Map's markers through AJAX requests
    const getApiUrl = '/getMapBoxApiKey';
    const getMarkersUrl = `/getMarkersForMap/${this.sessionIdValue}`;

    const promises = [
      fetch(getApiUrl).then((response) => response.text()),
      fetch(getMarkersUrl).then((response) => response.json())
    ];

    Promise.all(promises)
      .then(([apiKey, markers]) => {
        // Call the map's initialization only when both apiKey and markers have arrived
        this.initMapBox(apiKey, markers)
      })
      .catch((error) => {
        console.log('Error : ', error);
      })
  }

  initMapBox(apiKey, markers) {
    // Initialization of the MapBox
    mapboxgl.accessToken = apiKey

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10"
    })

    this.#addMarkersToMap(markers)
    this.#fitMapToMarkers(markers)
  }

  #addMarkersToMap(markers) {
    // Add the markers for the sessions locations
    markers.forEach((marker) => {
      new mapboxgl.Marker()
        .setLngLat([marker.lng, marker.lat])
        .addTo(this.map)
    })
  }

  #fitMapToMarkers(markers) {
    // Set the map frontiers 
    const bounds = new mapboxgl.LngLatBounds()
    markers.forEach(marker => bounds.extend([marker.lng, marker.lat]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }
}
