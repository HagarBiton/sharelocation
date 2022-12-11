window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("find-me").addEventListener("click", geoFindMe);
    document.getElementById("shareBtn").addEventListener("click", share);
    
})

var googleURL = "";
var titleToshare = "";

    function geoFindMe()
    {
          const status = document.querySelector('#status');
          const mapLink = document.querySelector('#map-link');
          const iframe = document.querySelector('#iframe');
          mapLink.href = '';
          mapLink.textContent = '';
    
            if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
          } else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
          }
        
          function success(position) {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
        
            status.textContent = '';
            mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
            mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
            iframe.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`
            iframe.classList.remove("d-none")
            googleURL = `https://maps.google.com/?q=${latitude},${longitude}`;
            titleToshare = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
          }
  
        
          function error() {
            status.textContent = 'Unable to retrieve your location';
          }
        }
     

function share(){
  if(navigator.share){
    const shareData = {
      title: "my Geo Location",
      text: titleToshare,
      url: googleURL,
    }   
    navigator.share(shareData);
  }
    else{
      document.getElementById("status").textContent = "could not share data..."
    }
     
}
