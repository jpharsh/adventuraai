function openGoogleMapsDirections() {
    const origin = 'San Francisco, CA';
    const destination = 'Las Vegas, NV';
    const travelMode = 'transit';

    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${travelMode}`;

    window.open(url, '_blank');
  }

  function initMap() {
    // Map initialization
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: { lat: 37.7749, lng: -122.4194 } // Set the initial center of the map
    });

    // Array of stops
    const stops = [
      { location: 'San Francisco, CA' },
      { location: 'Los Angeles, CA' },
      { location: 'Las Vegas, NV' }
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