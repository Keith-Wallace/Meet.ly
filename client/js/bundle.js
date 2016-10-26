/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	module.exports = __webpack_require__(16);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// SET UP FRONT-END FRAMEWORK USING ANGULARJS

	// INSTANTIATE THE APPLICATION
	/*
	    APPLICATION DETAILS:
	    MeetlyApp         // DIRECTIVE THAT DEFINES & LINKS APP TO HTML PAGE
	    MeetlyApp.form    // CONTROLLER FOR FORM SUBMISSION [app/controlers/formController.js]
	    MeetlyApp.map     // CONTROLLER FOR INVITE RESULTS [app/controlers/mapController.js]
	    MeetlyApp.yelp    // CONTROLLER FOR YELP CONTENT [app/controlers/yelpController.js]
	    ui.router         // FOR SWITCHING VIEWS IN THE BROWSER
	*/
	angular.module('MeetlyApp', [
	  'MeetlyApp.form',
	  'MeetlyApp.map',
	  'MeetlyApp.yelp',
	  'MeetlyApp.authServices',
	  'MeetlyApp.dataServices',
	  'MeetlyApp.register',
	  'MeetlyApp.login',
	  'MeetlyApp.dashboard',
	  'MeetlyApp.nav',
	  'MeetlyApp.signout',
	  'MeetlyApp.invites',
	  'MeetlyApp.services',
	  'MeetlyApp.invites',
	  'MeetlyApp.services',
	  'MeetlyApp.invites',
	  'MeetlyApp.services',
	  'MeetlyApp.yourInvites',
	  'ui.router'])

	// SET STATE AND ROUTER PROVIDERS FOR SPA
	.config(function($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise('/');

	    $stateProvider
	    .state('home', {
	      url: '/',
	      templateUrl: 'app/views/form.html',
	      authenticate: true
	    })
	    .state('map-view', {   
	      url:'/map-view',   
	      templateUrl: 'app/views/map-view.html',
	      authenticate: true
	    })
	    .state('register', {
	      url: '/register',
	      templateUrl: 'app/views/register.view.html',
	      controller: 'Register'      
	    })
	    .state('login', {
	      url: '/login',
	      templateUrl: 'app/views/login.view.html',
	      controller: 'Login'      
	    })
	    .state('dashboard', {
	      url: '/dashboard',
	      templateUrl: 'app/views/dashboard.view.html',
	      controller: 'Dashboard',
	      authenticate: true    
	    })
	    .state('signout', {
	      url: '/signout',
	      templateUrl: 'app/views/signout.view.html',
	      controller: 'Signout'      
	    })
	    .state('invites', {
	      url: '/invites',
	      templateUrl: 'app/views/invites.view.html',
	      controller: 'Invites'      
	    })
	    .state('yourInvites',{
	      url: '/yourInvites',
	      templateUrl:'app/views/yourInvites.view.html',
	      controller: 'formController'
	    })
	})

	.run(function ($rootScope, $location, $window, Auth, $state) {
	  // Check whether the user is authenticated to navigate to a route or not on every
	  // route change.
	  $rootScope.$on('$stateChangeStart', function (event, next, prev) {

	    //If unauthenticated user tries to access protected page, redirect to login
	    if (!Auth.isLoggedIn() && next.authenticate) {            
	      event.preventDefault();      
	      // $location.path('/'); // not working for some reason
	      $window.location.href = '#/login';            
	    }
	  })
	})  


/***/ },
/* 2 */
/***/ function(module, exports) {

	angular.module('MeetlyApp.auth', [])

	/**
	 * This controller is used by both login and signup and has methods for both
	 *
	 * NOTE: controllers are not singletons in Angular.
	 * A controller will be instantiated for each of the views it is connected to.
	 * As such, although login and signup both use the $scope.user object,
	 * the user object exists separately in memory for each view.
	 */
	.controller('AuthController', function ($scope, $window, $location, Auth) {
	  $scope.user = {};

	  $scope.login = function () {
	    Auth.login($scope.user)
	      .then(function (token) {f
	        $location.path('/tasks');
	      })
	      .catch(function (error) {
	        $location.path('/login');
	      });
	  };

	  $scope.signup = function () {
	    Auth.signup($scope.user)
	      .then(function (token) {
	        $location.path('/tasks');
	      })
	      .catch(function (error) {
	        $location.path('/login');
	      });
	  };
	});


/***/ },
/* 3 */
/***/ function(module, exports) {

	angular.module('MeetlyApp.dashboard', [])
	.controller('Dashboard', function($scope, $location, Data){
	  $scope.user = {};

	  Data.getProfile()
	    .success(function(data){
	      $scope.user = data;
	    })
	    .error(function(error){
	      console.log(error);
	    });
	})


/***/ },
/* 4 */
/***/ function(module, exports) {

	// CONTROLLER USED TO HANDLE MEET INVITE FORM DATA
	angular.module('MeetlyApp.form', [])

	.controller('formController', function($scope, $location, validateFormFactory, httpRequestsFactory, storeData) {

	  // SET VARIABLES
	  $scope.formData = {};
	  $scope.categoryData = [
	    { name: 'Select Category' },
	    { name: 'Active Life' },
	    { name: 'Arts & Entertainment' },
	    { name: 'Automotive' },
	    { name: 'Beauty & Spas' },
	    { name: 'Education' },
	    { name: 'Event Planning & Services' },
	    { name: 'Financial Services' },
	    { name: 'Food' },
	    { name: 'Health & Medical' },
	    { name: 'Home Services' },
	    { name: 'Hotels & Travel' },
	    { name: 'Local Flavor' },
	    { name: 'Local Services' },
	    { name: 'Mass Media' },
	    { name: 'Nightlife' },
	    { name: 'Pets' },
	    { name: 'Professional Services' },
	    { name: 'Public Services & Government' },
	    { name: 'Real Estate' },
	    { name: 'Religious Organizations' },
	    { name: 'Restaurants' },
	    { name: 'Shopping' }
	  ];

	  $scope.disableName = 'Select Category'

	  $scope.selectedCategory = $scope.categoryData[0];

	  // GET EVENT DATE AND TIME ============================================================
	  $scope.eventDateTime = {};

	  $('#datetimepicker').datetimepicker({
	    format: 'MM-DD-YYYY, hh:mm A'
	  });

	  $("#datetimepicker").on("dp.change", function (e) {
	    var getDateTime = $('#eventDateTime').val();
	    var fields = getDateTime.split(', ');
	    $scope.eventDateTime.f_date = fields[0];
	    $scope.eventDateTime.f_time = fields[1];
	  });

	  // PULL FRIENDS LIST AND APPEND TO PAGE ===============================================
	  httpRequestsFactory.friendsList()
	  .then(function (friends) {
	    $scope.friendsList = friends;
	  })
	  .catch(function (error) {
	    console.error(error);
	  });

	  $scope.checkbox = function() {    
	    $scope.selectedFriendsList = [];
	    angular.forEach($scope.friendsList, function(friend){
	      if (!!friend.selected) $scope.selectedFriendsList.push({ name: friend.name }) ;
	    });
	    console.log('checkbox')
	    console.log($scope.selectedFriendsList)
	  }

	  // HANDLE FORM SUBMISSION AND VALIDATE DATA =====================================================
	  $scope.submitForm = function(formSubmissionObj) {
	    $scope.postRequest = validateFormFactory.toValidate(formSubmissionObj);
	    console.log('submitForm',$scope.postRequest);
	    $scope.formData = $scope.postRequest;
	    console.log('YO',$scope.postRequest.obj.f_name)
	   

	    
	    if ($scope.postRequest) {
	      // DATA IS VALID AND CAN CALL YELP API POST REQUEST
	      initMeetSearch();
	      $scope.data.searchResultsArr =  [];
	    } else {
	      // HANDLE VALIDATION ERROR
	    };
	  };

	  // SEND FORM DATA TO SERVER API ROUTER ==========================================================
	  $scope.data = {};
	  var initMeetSearch = function () {
	    httpRequestsFactory.postRequest($scope.postRequest.obj)
	      .then(function (searchResults) {
	        $scope.data.results = searchResults;
	        console.log('HELLO',$scope.data.results)
	      

	        // STORE DATA
	        // storeData.set('apiResults', $scope.data.results);

	        // REDIRECT TO RESULTS PAGE
	        // $location.path('/map-view');
	      })
	      .catch(function (error) {
	        console.error(error);
	      });
	  };

	  // SET AND STORE GEO LOCATION ===================================================================
	  var geoLocator = function() {
	    var options = {
	      enableHighAccuracy: true,
	      timeout: 5000,
	      maximumAge: 0
	    };

	    var geoLoc = {};

	    function success(pos) {
	      var crd = pos.coords;
	      geoLoc.lat = parseFloat(crd.latitude);
	      geoLoc.lng = parseFloat(crd.longitude);
	      storeData.set('geoLocation', geoLoc);
	    };

	    function error(err) {
	      console.warn('ERROR(' + err.code + '): ' + err.message);
	    };

	    navigator.geolocation.getCurrentPosition(success, error, options);
	  };

	  // INVOKE FUNCTIONS
	  geoLocator();       // GET GEO LOCATION

	});


/***/ },
/* 5 */
/***/ function(module, exports) {

	angular.module('MeetlyApp.invites', [])
	.controller('Invites', function($scope, $location, Data, validateFormFactory, httpRequestsFactory, storeData){
	  $scope.invite = {};  
	  $scope.selectedCat = '-- Select Category --';   // DEFAULT CATEGORY

	//****** CHANGE below to get invite data *******//
	//probably very similar. difference is gonna be on 
	//server side
	  Data.getInvites()
	    .success(function(data){
	      console.log('DATA!!',data)
	      $scope.invite = data[0]; //just use first invite for now
	    })
	    .error(function(error){
	      console.log(error);
	    });

	  $scope.submitForm = function(formSubmissionObj) {
	    console.log('submitFrom data:')
	    console.log(formSubmissionObj);

	    httpRequestsFactory.postReqEvent(formSubmissionObj) //should validate this info first
	  };

	  $scope.selectedTypes = {
	      selected:{}
	  };

	   $scope.toggleCheckbox = function(friend) {
	    console.log('selected: ', $scope.selectedTypes)
	  }

	})

	 // // HANDLE FORM SUBMISSION AND VALIDATE DATA =====================================================
	 //  $scope.submitForm = function(formSubmissionObj) {
	 //    $scope.postRequest = validateFormFactory.toValidate(formSubmissionObj);
	    
	 //    if ($scope.postRequest) {
	 //      // DATA IS VALID AND CAN CALL YELP API POST REQUEST
	 //      initMeetSearch();
	 //    } else {
	 //      // HANDLE VALIDATION ERROR
	 //    };
	 //  };

	 //  // SEND FORM DATA TO SERVER API ROUTER ==========================================================
	 //  $scope.data = {};
	 //  var initMeetSearch = function () {
	 //    httpRequestsFactory.postRequest($scope.postRequest.obj)
	 //      .then(function (searchResults) {
	 //        $scope.data.results = searchResults;

	 //        // STORE DATA
	 //        storeData.set('apiResults', $scope.data.results);

	 //        // REDIRECT TO RESULTS PAGE
	 //        $location.path('/map-view');
	 //      })
	 //      .catch(function (error) {
	 //        console.error(error);
	 //      });
	 //  };

	 //  // SET AND STORE GEO LOCATION ===================================================================
	 //  var geoLocator = function() {
	 //    var options = {
	 //      enableHighAccuracy: true,
	 //      timeout: 5000,
	 //      maximumAge: 0
	 //    };

	 //    var geoLoc = {};

	 //    function success(pos) {
	 //      var crd = pos.coords;
	 //      geoLoc.lat = parseFloat(crd.latitude);
	 //      geoLoc.lng = parseFloat(crd.longitude);
	 //      storeData.set('geoLocation', geoLoc);
	 //    };

	 //    function error(err) {
	 //      console.warn('ERROR(' + err.code + '): ' + err.message);
	 //    };

	 //    navigator.geolocation.getCurrentPosition(success, error, options);
	 //  };



/***/ },
/* 6 */
/***/ function(module, exports) {

	angular.module('MeetlyApp.login', [])

	.controller('Login', function($scope, $location, Auth){
	  $scope.credentials = {
	    email : "",
	    password : ""
	  };

	  $scope.onSubmit = function () {
	    Auth
	      .login($scope.credentials)
	      .error(function(err){
	        alert(err);
	      })
	      .then(function(){
	        $location.path('home');
	      });
	  };

	})


/***/ },
/* 7 */
/***/ function(module, exports) {

	// CONTROLLER USED TO HANDLE INVITE RESULTS PAGE
	angular.module('MeetlyApp.map', [])

	.controller('mapController', function($scope, httpRequestsFactory, storeData, citibikeFactory, $sce) {
	    // console.log('INIT RUNNING')
	    // httpRequestsFactory.getMap()
	    //   .then(function (searchResults) {
	    //     // $scope.data.results = searchResults;
	    //     // STORE DATA
	    //     storeData.set('apiResults', searchResults);
	    //     // REDIRECT TO RESULTS PAGE
	    //     // $location.path('/map-view');
	    //   })
	    //   .catch(function (error) {
	    //     console.error(error);
	    //   });



	  // GET DATA & SET VARIABLES
	  // var preParseData = storeData.get('apiResults');
	  // var geoLocation = storeData.get('geoLocation');

	  // PARSE OBJECT DATA FOR LOCATION DETAILS AREA
	  // $scope.locationDetails = preParseData.businesses[0];
	  // $scope.frameUrl = $scope.trustAsResourceUrl($scope.locationDetails.url)

	  // GOOGLE MAPS API  =============================================================================
	  // SET VARIABLES

	  // $scope.map = {};
	  // $scope.map.marker;
	  // $scope.map.markersArray = [];
	  // $scope.map.destinationLatLng;
	  // $scope.map.markerImg;

	var geoLocator = function() {
	  console.log('GEOLOCATOR RUNNING')
	  var options = {
	    enableHighAccuracy: true,
	    timeout: 5000,
	    maximumAge: 0
	  };

	  var geoLoc = {};

	  function success(pos) {
	    var crd = pos.coords;
	    geoLoc.lat = parseFloat(crd.latitude);
	    geoLoc.lng = parseFloat(crd.longitude);
	    geoLocation = geoLoc;
	    console.log(geoLocation)
	    makeRequest();
	  };

	  function error(err) {
	    console.warn('ERROR(' + err.code + '): ' + err.message);
	  };

	  navigator.geolocation.getCurrentPosition(success, error, options);  
	};

	var makeRequest = function(){
	  console.log("makeRequest running")
	  httpRequestsFactory.getMap()
	    .then (function(preParseData){
	      var preParseData = preParseData;
	      // geoLocator();
	      // var geoLocation = storeData.get('geoLocation');
	      console.log('GEOLOCATION')
	      console.log(storeData.get('geoLocation'))
	      $scope.locationDetails = preParseData.businesses[0];
	      $scope.frameUrl = $sce.trustAsResourceUrl($scope.locationDetails.url)
	      $scope.map = {};
	      $scope.map.marker;
	      $scope.map.markersArray = [];
	      $scope.map.markerImgArr = 
	      ['https://s3.amazonaws.com/fullstackacademy/img/marker_100.png',
	      "https://s3.amazonaws.com/fullstackacademy/img/marker_75.png", 
	      "https://s3.amazonaws.com/fullstackacademy/img/marker_50.png",
	      "https://s3.amazonaws.com/fullstackacademy/img/marker_0.png"];  
	      $scope.map.destinationLatLng;
	      $scope.map.markerImg;

	      initMap();
	    })
	}
	  // START: INIT MAP

	  var initMap = function() {
	    console.log('INITMAP RUNNING')
	    // GOOGLE MAPS API: AIzaSyDNIFVWOXNcqHxl_2bI8WHa9BbYReKdpCo
	    var directionsDisplay = new google.maps.DirectionsRenderer;
	    var directionsService = new google.maps.DirectionsService;

	    var map = new google.maps.Map(document.getElementById('map'), {
	      zoom: 15,
	      center: geoLocation
	    });
	    directionsDisplay.setMap(map);
	    calculateAndDisplayRoute(directionsService, directionsDisplay);

	    $scope.addMarkers = function() {

	      // GET CITIBANK LOCATIONS
	      citibikeFactory.getCitiBikeLocations()
	      .then(function(bikeRacks) {

	        bikeRacks.data.forEach(function(rack) {
	          //console.log('CITIBIKEDATA USED BIKES',rack.bikes);
	          var rackLoc = new google.maps.LatLng(rack.lat/1000000, rack.lng/1000000);
	          //console.log('RACKLOCK',rackLoc.lat(),rackLoc.lng())
	          var locM = new google.maps.LatLng(40.7465051, -73.9904466);
	          var geoLoc = new google.maps.LatLng(geoLocation.lat, geoLocation.lng);
	           //console.log('GEOLOC',geoLoc.lat(),geoLoc.lng())
	           //distance between each rack location and current geolocation of user
	          var distance = google.maps.geometry.spherical.computeDistanceBetween( geoLoc, rackLoc );
	          //console.log('distance',distance);

	          //setting CITIBIKE marker image
	          $scope.image = function () {
	            if (rack.free/(rack.bikes + rack.free) >=.90) {
	              $scope.map.markerImg = $scope.map.markerImgArr[0];
	            }
	            else if (rack.free/(rack.bikes + rack.free)>=.51 && rack.free/(rack.bikes + rack.free)<=.89) {
	              $scope.map.markerImg = $scope.map.markerImgArr[1];
	            }
	            else if (rack.free/(rack.bikes + rack.free)>=.20 && rack.free/(rack.bikes + rack.free)<=.50) {
	              $scope.map.markerImg = $scope.map.markerImgArr[2];
	            }
	            else {$scope.map.markerImg = $scope.map.markerImgArr[3]
	            }
	          }

	          $scope.image()
	           if (distance < 30000) {
	              marker = new google.maps.Marker({
	              position: rackLoc,
	              map: map,
	              icon: $scope.map.markerImg
	            });

	            $scope.map.markersArray.push(marker)

	            }
	        });

	      })
	      .catch(function (error) {
	        console.error(error);
	      });
	    }
	     // Removes the markers from the map, but keeps them in the array.
	      $scope.clearMarkers = function() {
	        $scope.setMapOnAll(null);
	        //console.log('inside clearMarkers',$scope.setMapOnAll(null));
	      }
	        //sets the markers onto the page
	      $scope.setMapOnAll= function(map) {
	        for (var i = 0; i < $scope.map.markersArray.length; i++) {
	          $scope.map.markersArray[i].setMap(map);
	          //(console.log('inside setMap', $scope.map.markersArray[i]))
	        }
	      }

	  };

	  geoLocator();

	  // END: INIT MAP

	  // START: CALCULATE AND DISPLAY ROUTE
	  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
	    $scope.map.destinationLatLng = new google.maps.LatLng($scope.locationDetails.location.coordinate.latitude, $scope.locationDetails.location.coordinate.longitude);

	    directionsService.route({
	      origin: geoLocation,
	      destination: $scope.map.destinationLatLng,
	      // Note that Javascript allows us to access the constant
	      // using square brackets and a string value as its
	      // "property."
	      travelMode: 'WALKING'//google.maps.TravelMode[selectedMode]
	      },
	      function(response, status) {
	        if (status == 'OK') {
	          directionsDisplay.setDirections(response);
	        } else {
	          window.alert('Directions request failed due to ' + status);
	        }
	      });
	  };
	  // END: CALCULATE AND DISPLAY ROUTE


	    // $scope.removeMarkers = function () {

	    //   if ($scope.flag) {
	    //     console.log('flag',$scope.flag)
	    //     console.log('marker in REMOVE MARKERS',$scope.map.markersArray)
	    //     $scope.map.markersArray.splice(0,$scope.map.markersArray.length)
	    //         console.log('removeMarkers', $scope.map.markersArray)
	    //   }
	    // }

	        // $scope.visible = true;
	        // $scope.addMarkers = function () {
	        //   console.log('testtest$$$')
	        //     $scope.visible = !$scope.visible;
	        // };
	  // $scope.map.toggleMarkers = true;

	  // // START: TOGGLE CITIBIKE MARKERS
	  // $scope.toggleCitiBikeMarkers = function() {
	  //   if (!$scope.map.toggleMarkers) {
	  //     alert('ADD MARKERS');
	  //     $scope.addMarkers();
	  //   } else {
	  //     alert('REMOVE MARKERS');
	  //   }
	  // };
	  // END: TOGGLE CITIBIKE MARKERS


	  // // GOOGLE MAPS API  =============================================================================
	  // var initMap = function() {
	  //   // GOOGLE MAPS API: AIzaSyDNIFVWOXNcqHxl_2bI8WHa9BbYReKdpCo
	  //   var directionsDisplay = new google.maps.DirectionsRenderer;
	  //   var directionsService = new google.maps.DirectionsService;

	  //   // MARKER ARRAY
	  //   var markers = [];

	  //   var map = new google.maps.Map(document.getElementById('map'), {
	  //     zoom: 15,
	  //     center: originLocation  //{ lat: 40.7465051, lng: -73.9904466 }
	  //   });
	  //   directionsDisplay.setMap(map);

	  //   calculateAndDisplayRoute(directionsService, directionsDisplay);

	  

	  //   // Adds a marker to the map and push to the array.
	  //   $scope.addMarker = function(location) {
	  //     var marker = new google.maps.Marker({
	  //       position: location,
	  //       map: map,
	  //       icon: markerImg
	  //     });
	  //     markers.push(marker);
	  //   }


	  //   // REMOVE CITIBIKE MARKERS
	  //   // Deletes all markers in the array by removing references to them.
	  //   $scope.deleteMarkers = function () {
	  //     clearMarkers();
	  //     markers = [];
	  //   };




	  //   // document.getElementById('mode').addEventListener('change', function() {
	  //   //   calculateAndDisplayRoute(directionsService, directionsDisplay);
	  //   // });



	  // };

	  // var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
	  //   // var selectedMode = document.getElementById('mode').value;
	  //   $scope.destinationLatLng = new google.maps.LatLng($scope.locationDetails.location.coordinate.latitude, $scope.locationDetails.location.coordinate.longitude);
	  //   directionsService.route({
	  //     // origin: {lat: 37.77, lng: -122.447},  // Haight.
	  //     // destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
	  //     origin: originLocation,
	  //     destination: $scope.destinationLatLng,
	  //     // Note that Javascript allows us to access the constant
	  //     // using square brackets and a string value as its
	  //     // "property."
	  //     travelMode: 'WALKING'//google.maps.TravelMode[selectedMode]
	  //   }, function(response, status) {
	  //     if (status == 'OK') {
	  //       directionsDisplay.setDirections(response);
	  //     } else {
	  //       window.alert('Directions request failed due to ' + status);
	  //     }
	  //   });
	  // };

	  // $scope.toggleCitiBikeMarkers = function() {
	  //   if (!$scope.toggleMarkers) {
	  //     alert('ADD MARKERS');
	  //     $scope.addMarkers();
	  //   } else {
	  //     alert('REMOVE MARKERS');
	  //   }
	  // };
	  // ====================================================================================

	  // INVOKE FUNCTIONS
	  // initMap();    // GOOGLE MAPS

	});


/***/ },
/* 8 */
/***/ function(module, exports) {

	angular.module('MeetlyApp.nav', [])

	.controller('Nav', function($scope, $location, Auth){

	    $scope.isLoggedIn = Auth.isLoggedIn();

	    $scope.currentUser = Auth.currentUser();

	    $scope.onSub = function () {
	        Auth
	          .logout()
	          .error(function(err){
	            alert(err);
	          })
	          .then(function(){
	            $location.path('login');
	          });
	  };

	})


/***/ },
/* 9 */
/***/ function(module, exports) {

	angular.module('MeetlyApp.register', [])
	.controller('Register', function($scope, $location, Auth ){
	  $scope.data = {};
	  $scope.credentials = {
	    name : "",
	    email : "",
	    password : ""
	  };

	  $scope.onSubmit = function () {
	    console.log('Submitting registration');
	    Auth
	      .register($scope.credentials)
	      .error(function(err){
	        alert(err);
	      })
	      .then(function(){
	        $location.path('profile');
	      });
	  };

	  

	})


/***/ },
/* 10 */
/***/ function(module, exports) {

	angular.module('MeetlyApp.signout', [])

	.controller('Signout', function($scope, $location, Auth){

	    (function() {
	      console.log('signing out');
	        Auth.logout();
	        $location.path('login');
	    })();

	})


/***/ },
/* 11 */
/***/ function(module, exports) {

	// AngularJS controller for yelp views

	angular.module('MeetlyApp.yelp', [])


	.controller('yelpController', function($scope, httpRequestsFactory){
	  $scope.data = {};
	  var getImages = function () {
	    httpRequestsFactory.postRequest($scope.postRequest)
	      .then(function (searchResults) {
	        $scope.data.results = searchResults;
	        console.log('$scope.data.results ===> ', $scope.data.results);

	        // STORE DATA
	        // storeData.set('apiResults', $scope.data.results);

	      })
	      .catch(function (error) {
	        console.error(error);
	      });
	  };

	})


/***/ },
/* 12 */
/***/ function(module, exports) {

	angular.module('MeetlyApp.yourInvites', [])
	.controller('yourInvites', function($scope, $location, Data, validateFormFactory, httpRequestsFactory, storeData){
	  $scope.invite = {};  
	  $scope.selectedCat = '-- Select Category --';   // DEFAULT CATEGORY

	//****** CHANGE below to get invite data *******//
	//probably very similar. difference is gonna be on 
	//server side
	 

	  $scope.submitForm = function(formSubmissionObj) {
	  	console.log('inside yourInvites')
	    console.log('submitFrom data:')
	    console.log(formSubmissionObj);

	    httpRequestsFactory.postReqEvent(formSubmissionObj) //should validate this info first
	  };



	 

	})


/***/ },
/* 13 */
/***/ function(module, exports) {

	angular.module('MeetlyApp.authServices', [])
	.factory('Auth', function($http, $window){


	    var saveToken = function (token) {
	      $window.localStorage['mean-token'] = token;
	    };

	    var getToken = function () {
	      return $window.localStorage['mean-token'];
	    };

	    var isLoggedIn = function() {
	      var token = getToken();
	      var payload;

	      if(token){
	        payload = token.split('.')[1];
	        payload = $window.atob(payload);
	        payload = JSON.parse(payload);

	        return payload.exp > Date.now() / 1000;
	      } else {
	        return false;
	      }
	    };

	    var currentUser = function() {
	      if(isLoggedIn()){
	        var token = getToken();
	        var payload = token.split('.')[1];
	        payload = $window.atob(payload);
	        payload = JSON.parse(payload);
	        return {
	          email : payload.email,
	          name : payload.name
	        };
	      }
	    };

	    var register = function(user) {
	      return $http.post('/api/register', user).success(function(data){
	        saveToken(data.token);
	      });
	    };

	    var login = function(user) {
	      return $http.post('/api/login', user).success(function(data) {
	        saveToken(data.token);
	      });
	    };

	    var logout = function() {
	      $window.localStorage.removeItem('mean-token');
	    };

	    return {
	      currentUser : currentUser,
	      saveToken : saveToken,
	      getToken : getToken,
	      isLoggedIn : isLoggedIn,
	      register : register,
	      login : login,
	      logout : logout
	    };

	})

/***/ },
/* 14 */
/***/ function(module, exports) {

	

/***/ },
/* 15 */
/***/ function(module, exports) {

	angular.module('MeetlyApp.dataServices',[])
	.factory('Data', function($http, Auth){

	    var getProfile = function () {
	      return $http.get('/api/dashboard', {
	        headers: {
	          Authorization: 'Bearer '+ Auth.getToken()
	        }
	      });
	    };

	    var getInvites = function(){
	      return $http.get('/api/invites', {
	        headers: {
	          Authorization: 'Bearer '+ Auth.getToken()
	        }
	      });      

	    }



	    return {
	      getProfile : getProfile,
	      getInvites: getInvites
	    };

	})


	//**** add function for getting Invite info *****///

/***/ },
/* 16 */
/***/ function(module, exports) {

	// APPLICATION FACTORY SERVICES
	angular.module('MeetlyApp.services', [])

	// FORM DATA VALIDATION ===========================================================================
	.factory('validateFormFactory', function() {
	    var toValidate = function(obj) {
	      if (obj.place.f_category !== 'Select Category' || obj.place.f_category !== null || obj.place.f_category !== undefined) {
	        // HANDLE OK
	      }

	      if (obj.place.f_type !== '' || obj.place.f_type !== null || obj.place.f_type !== undefined) {
	        // HANDLE OK
	      }

	      if (obj.place.f_location !== '' || obj.place.f_location !== null || obj.place.f_location !== undefined) {
	        // HANDLE OK
	      }

	      if (obj.dateTime.f_date !== '' || obj.dateTime.f_date !== null || obj.dateTime.f_date !== date) {
	        // HANDLE OK
	      }

	      if (obj.dateTime.f_time !== '' || date !== null || category !== date) {
	        // HANDLE OK
	      }

	      // RETURN VALID OBJECT
	      return {obj}
	    };
	  
	  return {
	    toValidate: toValidate
	  };
	})

	// HANDLE ALL HTTP REQUESTS =======================================================================
	.factory('httpRequestsFactory', function($location, $http, Auth) {

	  var postRequest = function(params) {
	    console.log('POSTREQparams ====> ', params)
	    return $http({
	      method: 'POST',
	      url: '/api/yelpAPI',
	      data: params,
	      headers: {
	          Authorization: 'Bearer '+ Auth.getToken()
	        }
	    })
	    .then(function (response) {
	      return response.data;
	      console.log('RESPONSE',response.data)
	    })
	    .catch(function (error) {
	      console.log('WE HAVE AN ERROR')
	      console.error(error);
	    });
	  };
	  
	  var postReqEvent = function(params) {
	    console.log('postReqEvent running')
	    console.log('params ====> ', params)
	    return $http({
	      method: 'POST',
	      url: '/api/results',
	      data: params,
	      headers: {
	        Authorization: 'Bearer '+ Auth.getToken()
	      }
	    })
	    .then(function (response) {
	      return response.data;
	    })
	    .catch(function (error) {
	      console.log('WE HAVE AN ERROR')
	      console.error(error);
	    });
	  };

	  var getMap = function() {
	    console.log('get map running')
	    return $http({
	      method: 'GET',
	      url: '/api/mapView',
	      headers: {
	          Authorization: 'Bearer '+ Auth.getToken()
	        }
	    })
	    .then(function (response) {
	      console.log('GET MAP RESPONSE')
	      console.log(response)    
	      return response.data;
	    })
	    .catch(function (error) {
	      console.error(error);
	    });
	    
	  };

	  // ======================================================
	  // TO DO: GET AND POST REQUEST FOR FRIENDS LIST
	  // ======================================================
	  var friendsList = function(friendsListObj) {
	    return $http({
	      method: 'GET',
	      url: '/api/friendsList',
	      headers: {
	          Authorization: 'Bearer '+ Auth.getToken()
	        }
	    })
	    .then(function (response) {
	      return response.data;
	    })
	    .catch(function (error) {
	      console.error(error);
	    });
	    
	  };

	  return {
	    postRequest: postRequest,
	    postReqEvent: postReqEvent,
	    getMap: getMap,
	    friendsList: friendsList
	  }
	})

	// SET AND GET DATA ===============================================================================
	.factory('storeData', function() {
	  var storedData = {};

	  function set(objName, data) {
	    storedData[objName] = data
	  };

	  function get(objName) {
	    return storedData[objName];
	  }

	  return {
	    set: set,
	    get: get
	  }
	})

	// CITIBIKE API ===================================================================================
	.factory('citibikeFactory', function ($http) {
	  var getCitiBikeLocations = function () {
	    return $http({
	      method: 'GET',
	      url: 'https://api.citybik.es/citi-bike-nyc.json'
	    });
	  };

	  return {
	    getCitiBikeLocations: getCitiBikeLocations
	  };
	});

	// params (in the URL) is for GET requests
	// body (in the HTML) is for POST requests



/***/ }
/******/ ]);