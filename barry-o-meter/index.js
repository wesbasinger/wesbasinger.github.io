const directionRequestObject = {
    origin: "1114 Explorer St Duncanville TX 75137",
    destination: "Rockwall Texas",
    travelMode: "DRIVING",
    drivingOptions: {
        departureTime: new Date()
    }
}

const getMap = () => {
 
  var dallas = new google.maps.LatLng(32.7767, -96.7970);
  var mapOptions = {
    zoom:9,
    center: dallas
  }
  
  return new google.maps.Map(document.getElementById('map'), mapOptions);

}



function initMap() {

    const map = getMap();

    const directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

}
  
  const calcRoute = () => {

    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();

    const map = getMap();

    directionsDisplay.setMap(map);

    directionRequestObject.drivingOptions.departureTime = new Date();

    directionsService.route(directionRequestObject, (result, status) => {
      if (status == 'OK') {

        const primaryLeg = result.routes[0].legs[0];

        const distance = primaryLeg.distance.text;
        const duration = primaryLeg.duration.text;

        const summary = result.routes[0].summary;

        console.log(primaryLeg.distance.text, primaryLeg.duration.text);

        directionsDisplay.setDirections(result);

        updateDistance(distance);
        updateDuration(duration);
        updateSummary(summary);

      }
    });
  }

  const button = document.querySelector("button");

  button.addEventListener("click", () => {
      calcRoute();
  })

  initMap()
  calcRoute()

  const updateDistance = (distance) => {

    const h2 = document.querySelector("#distance");

    h2.innerHTML = "Distance: " + distance;

  }

  const updateDuration = (duration) => {

    const h2 = document.querySelector("#duration");

    h2.innerHTML = "Duration: " + duration;

  }

  const updateSummary = (summary) => {

    const h2 = document.querySelector("#summary");

    h2.innerHTML = "Summary: " + summary;

  }