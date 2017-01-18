import {Component, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProfilePage} from "../Profile/profile";
import {ViewChild} from "@angular/core/src/metadata/di";
import {ConnectivityService} from "../../providers/connectivity-service";
import {Geolocation, GoogleMapsAnimation, GoogleMapsMarkerOptions, GoogleMapsLatLng} from 'ionic-native';
/*
  Generated class for the Transition page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var google;
@Component({
  selector: 'page-transition',
  templateUrl: 'transition.html'
})
export class TransitionPage {
   profile=ProfilePage
  transition:TransitionPage
   pet:string="map";
  @ViewChild('map_canvas') mapElement: ElementRef;

  @ViewChild('map_canvas2') mapElement24: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: 'AIzaSyDS1s-CmlAqqWpEpS8D7hm8-TchEtq_Dyc';
  constructor(public navCtrl: NavController,public connectivityService: ConnectivityService,private navParams:NavParams) {
    this.loadGoogleMaps();

  }
/*
  updatePage(pet) {
    if (pet === 'map') {
      this.loadGoogleMaps();
    }
    else if (pet === 'direction'){
      this.loadMap3();

    }
  }*/

  loadGoogleMaps(){


    this.addConnectivityListeners();

    if(typeof google == "undefined" || typeof google.maps == "undefined"){

      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if(this.connectivityService.isOnline()){
        console.log("online, loading map");

        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if(this.apiKey){
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);

      }
    }
    else {

      if(this.connectivityService.isOnline()){
        console.log("showing map");
        this.initMap();
        this.enableMap();
      }
      else {
        console.log("disabling map");
        this.disableMap();
      }

    }

    this.initMap();
  }

  initMap(){

    var map:any;
    this.mapInitialised = true;

     Geolocation.getCurrentPosition().then((position) => {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       var latLng2 = new google.maps.LatLng(this.navParams.get("lat"),this.navParams.get("lng"));
      var  myloc_lat=position.coords.latitude;
      var  myloc_lng=position.coords.longitude;

       let mapOptions = {
        center: latLng,
        zoom: 17,
        panControl: false,
        //rotateControlOptions:false,
        rotateControl:true,
        streetViewControl:false,
        zoomControl: false,
        mapTypeControl:true,
        scaleControl: true,
        overviewMapControl:false,
         zoomcontroller:false,
         mapTypeId: google.maps.MapTypeId.ROADMAP,

          }

       var chicago = {lat:position.coords.latitude, lng:position.coords.longitude};

       var indianapolis = {lat: this.navParams.get("lat"), lng:this.navParams.get("lng")};


       var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


       /// my position

       var catIcon = {
        url: 'https://s3.ap-south-1.amazonaws.com/hillffair2016/images/co_convener_finearts.jpg',
         //state your size parameters in terms of pixels
         size: new google.maps.Size(50,50),
         scaledSize: new google.maps.Size(50, 50),
         origin: new google.maps.Point(0,0),

         animation: google.maps.Animation.DROP
       }

       var catIcon2 = {
         url: 'http://meridianapps.com/images/icon_bludot@2x.png',
         //state your size parameters in terms of pixels
         size: new google.maps.Size(40,40),
         scaledSize: new google.maps.Size(40,40),
         origin: new google.maps.Point(0,0),

       }




       var marker = new google.maps.Marker({
         position:latLng,
         map: map,
         // set the icon as catIcon declared above
         icon: catIcon,
         animation: google.maps.Animation.DROP,
         // must use optimized false for CSS
         optimized: false,
       });


       var marker2 = new google.maps.Marker({
         position:latLng,
         map: map,
         // set the icon as catIcon declared above
         icon: catIcon2,
         animation: google.maps.Animation.DROP,
         // must use optimized false for CSS
         //  optimized: false,
       });

       var myoverlay = new google.maps.OverlayView();
       myoverlay.draw = function () {
         this.getPanes().markerLayer.id='markerLayer';
       };
       myoverlay.setMap(map);






       ////


       var icon = {
         url: "https://maxcdn.icons8.com/Share/icon/Maps//map_pin1600.png", // url
         scaledSize: new google.maps.Size(40,40), // scaled size
          //origin: new google.maps.Point(0,0), // origin
           //anchor: new google.maps.Point(6,6),

         animation: google.maps.Animation.DROP// anchor
          }
       var lineSymbol = {
         path: 'M 157.98695,184.38488 L 173.37483,168.20017 C 182.38616,159.18884 197.56012,162.31477 197.56012,162.31477 L 242.58958,168.47612 L 265.39575,146.16045 C 277.41087,134.35989 288.26269,152.4142 283.54247,158.63631 L 271.83305,172.24635 L 320.32641,181.22794 L 336.78707,162.03882 C 354.38063,141.01237 367.47041,159.95529 359.53185,171.11218 L 348.89521,184.56906 L 421.75804,194.07153 C 484.40828,133.78139 509.98537,108.77262 526.46939,123.63021 C 543.05967,138.5836 513.71315,168.38877 456.64135,227.17701 L 467.00204,302.24678 L 482.26714,289.52597 C 491.27847,282.01653 507.27901,294.06392 490.75822,309.72648 L 469.76089,329.52825 L 478.61969,378.66527 L 491.73923,368.58052 C 503.32523,359.35463 517.39476,371.55518 501.7322,388.29052 L 480.88803,409.28786 C 480.02981,409.93153 487.69305,452.38631 487.69305,452.38631 C 492.41327,473.19821 480.67347,480.80195 480.67347,480.80195 L 466.35838,493.27782 L 411.97962,339.67439 C 407.47395,326.15738 396.0546,311.47862 376.97351,313.22076 C 366.8894,314.29354 341.41552,331.49026 337.98263,335.56682 L 279.00579,392.27531 C 277.5039,393.34809 288.07915,465.99635 288.07915,465.99635 C 288.07915,468.14191 269.38054,492.66454 269.38054,492.66454 L 232.01433,426.14725 L 213.56128,434.7301 L 224.35108,417.93211 L 157.06733,379.9526 L 182.29502,361.49956 C 194.31014,364.28878 257.3034,371.36975 258.59073,370.72608 C 258.59073,370.72608 309.88762,319.85344 312.81633,316.77643 C 329.76623,298.96831 335.46935,292.31456 338.04402,283.51778 C 340.6208,274.71377 336.23117,261.81195 309.62838,245.4769 C 272.93937,222.94855 157.98695,184.38488 157.98695,184.38488 z',
         scale: 0.105,
         rotation: -30,
         strokeColor: '#cb1b58',
         fillColor: '#cb1b58',
         fillOpacity: 1
       };

       var pathOptions = {
         geodesic: true,
         strokeColor: 'green',
         strokeOpacity: 1.0,
         strokeWeight: 2,
         icons: [{
           icon: lineSymbol,
           offset:'0%'
         },{
           icon:icon,
           offset:'0%'
         }]
       };

        var directionsDisplay = new google.maps.DirectionsRenderer({
          map:map,
          //suppressMarkers:true,
          suppressBicyclingLayer:true,
          //draggable:true,
          hideRouteList:true,
         markerOptions:{icon:icon},
          polylineOptions:{ strokeColor: '#cb1b58',strokeWeight: 2}


       });


       var icons = {
         start: new google.maps.MarkerImage(
           // URL
           'https://maxcdn.icons8.com/Share/icon/Logos//safari1600.png',
           // (width,height)
           new google.maps.Size( 44, 32 ),
           // The origin point (x,y)
           new google.maps.Point( 0, 0 ),
           // The anchor point (x,y)
           new google.maps.Point( 22, 32 )
         ),
         end: new google.maps.MarkerImage(
           // URL
           'https://maxcdn.icons8.com/Share/icon/Logos//safari1600.png',
           // (width,height)
           new google.maps.Size( 44, 32 ),
           // The origin point (x,y)
           new google.maps.Point( 0, 0 ),
           // The anchor point (x,y)
           new google.maps.Point( 22, 32 )
         )
       };


       // Set destination, origin and travel mode.
       var request = {
         destination: indianapolis,
         origin: chicago,
         travelMode: 'WALKING'
       };



       // Pass the directions request to the directions service.
       var directionsService = new google.maps.DirectionsService();
       directionsService.route(request, function(response, status) {
         if (status == google.maps.DirectionsStatus.OK) {
           // Display the route on the map.
           directionsDisplay.setDirections(response);
           var leg = response.routes[ 0 ].legs[ 0 ];
           console.log("A="+leg.start_location.lat()+","+leg.start_location.lng()+"B="+leg.end_location.lat()+","+leg.end_location.lng());


         }


       });





     });



  }



  disableMap(){
    console.log("disable map");
  }

  enableMap(){
    console.log("enable map");
  }

  addConnectivityListeners(){

    let onOnline = () => {

      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){

          this.loadGoogleMaps();

        } else {

          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }
      },20);

    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }







  }
