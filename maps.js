const apiKey = 'AIzaSyA2mvBYUCSwer6A31nvCq54EmbCP_kscbY';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

function getPlaces(type, locationData, num) {
    const url = `${proxyUrl}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationData.lat},${locationData.lng}&radius=5000&type=${type}&key=${apiKey}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultAtIndex = data.results[num - 1]; // Adjust index since num is 1-based
            if (resultAtIndex) {
                displayResults([resultAtIndex], type);
                return [resultAtIndex];
            } else {
                console.error(`Result at index ${num} not found.`);
                return [];
            }
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
            const location = data.results[0]?.geometry?.location;
            return location ? { lat: location.lat, lng: location.lng } : null;
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
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');
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
                    getPlaces('restaurant', coordinates, 1),
                    getPlaces('restaurant', coordinates, 2),
                    getPlaces('restaurant', coordinates, 3),
                    getPlaces('lodging', coordinates, 1),
                    getPlaces('tourist_attraction', coordinates, 1),
                    getPlaces('tourist_attraction', coordinates, 2)
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
