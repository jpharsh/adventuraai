        const apiKey = 'AIzaSyA2mvBYUCSwer6A31nvCq54EmbCP_kscbY';

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        // Function to make a request to the Google Places API
        function getPlaces(type, locationData) {
            const url = `${proxyUrl}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationData.lat},${locationData.lng}&radius=5000&type=${type}&key=${apiKey}`;
        
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Log the response data to the console
                    displayResults(data.results.slice(0, 5), type);
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
                    getPlaces('tourist_attraction', coordinates); // Attractions
                    getPlaces('restaurant', coordinates); // Food
                }
            });
        
        
        
        
        
        
        