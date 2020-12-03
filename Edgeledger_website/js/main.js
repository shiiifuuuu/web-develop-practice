//Initialize and add the map
function initMap() {
   //your location
   const loc={lat:23.702144, lng: 90.450360};

   //centered map on location
  const map = new google.maps.Map(document.querySelector('.contact-map'), {
    center: loc,
    zoom: 14,
  });

  //The marker, positioned at location
  const marker = new google.maps.Marker({position: loc, map: map});
}

//Smooth Scrolling
$('#navbar a, .btn').on('click', function(event) {
  if(this.hash!==''){
    event.preventDefault();

    const hash = this.hash;

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 60
      },
      800
    );
  }
});

//Sticky menu background
window.addEventListener('scroll', function(){
  if(window.scrollY > 100){
    document.querySelector('#navbar').style.opacity=0.9;
  }
  else{
    document.querySelector('#navbar').style.opacity=1;
  }
});