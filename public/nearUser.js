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
    fetchNearbyUsers(userLatitude, userLongitude);
    
  });
}

function fetchNearbyUsers(userLatitude, userLongitude){
    fetch(`/api/v1/nearby-users?lat=${userLatitude}&lon=${userLongitude}`)
    .then(response => response.json())
    .then(data => {
        // Display nearby users list
      displayNearbyUsers(data, userLatitude, userLongitude);
    })
    .catch(error => console.error('Error fetching nearby users:', error));
}

function displayNearbyUsers(nearbyUsers,userLatitude,userLongitude){
    var userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = "<h2>Nearby Users:</h2>";
    if (nearbyUsers.length > 0) {
      nearbyUsers.forEach(function(user) {
        userListDiv.innerHTML += `<li><img   class='profile-icon'><strong>${user.name}:</strong> <strong>Distance:</strong>${(calculateDistance(userLatitude, userLongitude, user.lat, user.lon)/10).toFixed(2)} m<a href='/api/v1/chat/${user._id}' ><span class='message-icon'>&#128172;</span></a></li>`
        // user.name + " - Distance: " + calculateDistance(userLatitude, userLongitude, user.lat, user.lon).toFixed(5) + " m<br>";
      });
    } else {
      userListDiv.innerHTML += "No nearby users found.";
    }
}

 // Calculate distance between two points using Haversine formula
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


  // Update location every 10 seconds
// setInterval(updateLocation, 10000);
updateLocation();


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
