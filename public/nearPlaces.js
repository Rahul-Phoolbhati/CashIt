

    function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Earth's radius in km
    var dLat = degToRad(lat2 - lat1);
    var dLon = degToRad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c*1000;
    console.log(distance);
    return distance;
}
function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}




// (111.1 km) = 1
// 111.320*cos(latitude) = 1
// .045 for 5 km  lat 
// 1/111.320*cos(latitude)*5 for lon

function updateLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var userLatitude = position.coords.latitude;
      var userLongitude = position.coords.longitude;
      console.log(`location: lat: ${userLatitude} and lon: ${userLongitude}`);
  
  
      // fetching and display 
      fetchNearbyPlaces(userLatitude, userLongitude);
      
    });
  }
  
  function fetchNearbyPlaces(lat, lng){
    const apiUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:50000,${lat},${lng})[amenity=restaurant];out;`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Process the data (list of nearby restaurants)
      console.log(data.elements);
  
      // Create an HTML list element
      var placelistDiv = document.getElementById('placeList');
      
      placelistDiv.innerHTML = "<h2>Nearby Places:</h2>";
      if (data.elements.length > 0) {
        data.elements.forEach(function(rest) {
          placelistDiv.innerHTML += `<li><strong>${rest.tags.name}:</strong>  ${(calculateDistance(lat, lng, rest.lat, rest.lon)/10).toFixed(5)} m</li>`
          // user.name + " - Distance: " + calculateDistance(userLatitude, userLongitude, user.lat, user.lon).toFixed(5) + " m<br>";
        });
      } else {
        userListDiv.innerHTML += "No nearby users found.";
      }
  
      // You can now use this data to display information about nearby restaurants
    })
    .catch(error => console.error('Error fetching data:', error));
  
  }
  

  
    // Update location every 10 seconds
  setInterval(updateLocation, 10000);
  
  
  function updateLocationInDb() {
      navigator.geolocation.getCurrentPosition(function(position) {
        var userLatitude = position.coords.latitude;
        var userLongitude = position.coords.longitude;
        var userId = 'your-user-id'; // You'll need to have a way to identify the user
    
        // Send location update to the server
        fetch('/api/v1/update-location', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ lat: userLatitude, lon: userLongitude })
        })
        .catch(error => console.error('Error updating location:', error));
      });
  }
    
  // Update location every few seconds
  setInterval(updateLocationInDb, 5000); // Update every 5 seconds, for example
  