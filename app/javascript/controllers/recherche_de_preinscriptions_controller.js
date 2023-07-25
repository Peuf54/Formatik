import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="recherche-de-preinscriptions"
export default class extends Controller {
  connect() {
    $(document).ready(function() {
      setInterval(checkForNewPreinscriptions, 5000);

      // Recherche de pré-inscriptions
      function checkForNewPreinscriptions() {
        console.log("Recherche de nouvelles Pré-inscriptions...");
        $.ajax({
          url: "/pre_inscription/check_preinscriptions",
          type: "GET",
          dataType: "json",
          success: function(response) {
            if (response.newPreinscriptions > 0) {
              alert("Nouvelle Preinscription: " + response.newPreinscriptions);
              // à remplacer par un flash alert
            }
          },
          error: function() {
            console.log("Une erreur a eu lieu dans la recherche de pré-inscriptions.");
          }
        });
      }
    });
  }
}
