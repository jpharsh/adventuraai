const apiKey = 'AIzaSyA2mvBYUCSwer6A31nvCq54EmbCP_kscbY';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        function getPlaces(type, locationData) {
            const url = `${proxyUrl}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationData.lat},${locationData.lng}&radius=5000&type=${type}&key=${apiKey}`;

            return fetch(url)
                .then(response => response.json())
                .then(data => {
                    displayResults(data.results.slice(0, 1), type)
                    return data.results.slice(0, 1); // Take only the first result for simplicity
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    return [];
                });
        }

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

        function displayResults(results, type) {
    const resultsDiv = document.getElementById('trial');
    resultsDiv.innerHTML += `<h2>${type}</h2><ul>`;

    results.forEach(place => {
        resultsDiv.innerHTML += `<li>${place.name}</li>`;
    });

    resultsDiv.innerHTML += `</ul>`;
}

        function initMap() {
            const city = 'San Francisco'; //Replace with selected city
            const mapElement = document.getElementById('map');

            getCoordinatesForCity(city)
                .then(coordinates => {
                    if (coordinates) {
                        const map = new google.maps.Map(mapElement, {
                            center: coordinates,
                            zoom: 12
                        });

                        // Get places for food, lodging, and tourist attraction
                        const promises = [
                            getPlaces('restaurant', coordinates),
                            getPlaces('restaurant', coordinates),
                            getPlaces('restaurant', coordinates),
                            getPlaces('lodging', coordinates),
                            getPlaces('tourist_attraction', coordinates),
                            getPlaces('tourist_attraction', coordinates)
                        ];

                        Promise.all(promises)
                            .then(results => {
                                results.forEach((places, index) => {
                                    if (places.length > 0) {
                                        const place = places[0];
                                        const marker = new google.maps.Marker({
                                            position: { lat: place.geometry.location.lat, lng: place.geometry.location.lng },
                                            map: map,
                                            title: place.name
                                        });

                                        const infoWindow = new google.maps.InfoWindow({
                                            content: `<h3>${place.name}</h3><p>${place.vicinity}</p>`
                                        });

                                        marker.addListener('click', () => {
                                            infoWindow.open(map, marker);
                                        });
                                    }
                                });
                            });
                    }
                });
        }