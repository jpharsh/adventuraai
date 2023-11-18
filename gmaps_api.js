        // Replace 'YOUR_API_KEY' with your actual Google API key
        const apiKey = 'AIzaSyA2mvBYUCSwer6A31nvCq54EmbCP_kscbY';

        // Function to make a request to the Google Places API
        function getPlaces(type, locationData) {
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationData.lat},${locationData.lng}&radius=5000&type=${type}&key=${apiKey}`;

            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the response data to the console
                displayResults(data.results.slice(0, 5), type);
            })
            .catch(error => console.error('Error fetching data:', error));
        
        }
        // Function to display results on the webpage
        function displayResults(results, type) {
            const resultsDiv = document.getElementById('resultsDiv');
            resultsDiv.innerHTML += `<h2>${type}</h2><ul>`;

            results.forEach(place => {
                resultsDiv.innerHTML += `<li>${place.name}</li>`;
            });

            resultsDiv.innerHTML += `</ul>`;
        }

        // Example: Get top 5 transportation maps, hotels, attractions, and food around a specific location
        const myLocation = { lat: 41.8781, lng: -87.6298 }; // Chicago coordinates

        getPlaces('transit_station', myLocation);
        getPlaces('lodging', myLocation); // Hotels
        getPlaces('tourist_attraction', myLocation); // Attractions
        getPlaces('restaurant', myLocation); // Food