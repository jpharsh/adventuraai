
const apiKey = 'AIzaSyA2mvBYUCSwer6A31nvCq54EmbCP_kscbY';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

// Function to make a request to the Google Places API
function getPlaces(type, locationData) {
    const url = `${proxyUrl}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationData.lat},${locationData.lng}&radius=5000&type=${type}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the response data to the console
            displayResults(data.results.slice(0, 1), type);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to get coordinates for a city
function getCoordinatesForCity(cityName) {
const geocodingUrl = `${proxyUrl}https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${apiKey}`;

return fetch(geocodingUrl)
.then(response => response.json())
.then(data => {
    const location = data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
})
.catch(error => {
    console.error('Error fetching coordinates:', error);
    return null;
});
}

// Function to display results on the webpage
function displayResults(results, type) {
    const resultsDiv = document.getElementById('trial');
    resultsDiv.innerHTML += `<h2>${type}</h2><ul>`;

    results.forEach(place => {
        resultsDiv.innerHTML += `<li>${place.name}</li>`;
    });

    resultsDiv.innerHTML += `</ul>`;
}

// Example: Get top 5 transportation maps, hotels, attractions, and food around a specific location

const cityName = 'Atlanta'; // Replace with the desired city name
getCoordinatesForCity(cityName)
    .then(coordinates => {
        if (coordinates) {
            getPlaces('transit_station', coordinates);
            getPlaces('lodging', coordinates); // Hotels
            getPlaces('restaurant', coordinates); // Food
        }
    });


      function initMap(cityName) {
        // Map initialization
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: getCoordinatesForCity(cityName) // Set the initial center of the map
        });
        // Array of stops
        const stops = [
          { location: getPlaces('transit_station', coordinates) },
          { location: getPlaces('lodging', coordinates) },
          { location: getPlaces('restaurant', coordinates) }
          // Add more stops as needed
        ];
    
        // Create markers for each stop
        stops.forEach(stop => {
          geocodeAddress(stop.location, function (position) {
            const marker = new google.maps.Marker({
              position: position,
              map: map,
              title: stop.location
            });
    
            // Info window for each marker
            const infoWindow = new google.maps.InfoWindow({
              content: stop.location
            });
    
            marker.addListener('click', function() {
              infoWindow.open(map, marker);
            });
          });
        });
      }
    
      function geocodeAddress(address, callback) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function(results, status) {
          if (status === 'OK') {
            callback(results[0].geometry.location);
          } else {
            console.error('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

