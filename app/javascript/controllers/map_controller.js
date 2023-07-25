import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    markers: Array
  }
  connect() {
    // Get the mapBoxGL api key through an AJAX request
    const url = '/getMapBoxApiKey';

    fetch(url)
    .then((response) => response.text())
    .then((data) => {
      // Call the rest of the initialization only when the return(api key) have arrived
      this.initMapBox(data);
    })
  }

  initMapBox(apiKey) {
    // Initialization of the MapBox
    mapboxgl.accessToken = apiKey

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10"
    })

    this.#addMarkersToMap()
    this.#fitMapToMarkers()
  }

  #addMarkersToMap() {
    // Add the markers for the sessions locations
    this.markersValue.forEach((marker) => {
      new mapboxgl.Marker()
        .setLngLat([marker.lng, marker.lat])
        .addTo(this.map)
    })
  }

  #fitMapToMarkers() {
    // Set the map frontiers 
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([marker.lng, marker.lat]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }
}
