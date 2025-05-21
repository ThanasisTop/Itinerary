app.controller('ItinerariesListController', function($scope,$window) {
    var vm=this;
    

  const firebaseConfig = {
    apiKey: "AIzaSyBltVRsaUfSqZgvzN9IBUwiaBwRSPhv1Ho",
    authDomain: "creteairporttaxiitineraries.firebaseapp.com",
    databaseURL: "https://creteairporttaxiitineraries-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "creteairporttaxiitineraries",
    storageBucket: "creteairporttaxiitineraries.firebasestorage.app",
    messagingSenderId: "98532459774",
    appId: "1:98532459774:web:73158b15a36531a97791af",
    measurementId: "G-ZQFXH48XCW"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Initialize Realtime Database
  const database = firebase.database();
  
  function initializeData() {
    vm.Entity = {
      Amount: null,
      Comments: null,
      TripNumber: null,
      TripDate: null,
      CarTypeCode:null,
      ItineraryTypeCode:null,
      AmountIsPaid:null
    };
    vm.Itineraries = [];
    
    vm.CarTypes=[
    {
      Code: "1",
      Description: "Limo"
    },
    {
      Code: "2",
      Description: "Van"
    }];

    vm.YesNo=[
    {
      Code: "1",
      Description: "Ναι"
    },
    {
      Code: "2",
      Description: "Όχι"
    }];

    vm.ItineraryTypes=[
    {
      Code: "1",
      Description: "Ανάθεση απο Συνεργάτη"
    },
    {
      Code: "2",
      Description: "Παραχώρηση σε Συνεργάτη"
    },
    {
      Code: "3",
      Description: "Απευθείας Κράτηση"
    },];
    vm.showSpinner=true;

    database.ref('Itineraries').once('value').then(function(snapshot) {
        const data = snapshot.val();
        vm.Itineraries = [];

        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            let item = data[key];
            item.Id = key;
            vm.Itineraries.push(item);

          }
        }
        vm.Itineraries.reverse();
        vm.showSpinner=false;
        $scope.$apply();
    });

    vm.Drivers=[];

    database.ref('Drivers').once('value').then(function(snapshot) {
        const data = snapshot.val();

        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            let item = data[key];
            item.Id = key;
            vm.Drivers.push(item);

          }
        }
        vm.showSpinner=false;
        $scope.$apply();
    });
  };
  initializeData();

  vm.updateItinerary=function(entity){
      if(vm.hasEmptyField(entity)){
        alert('Παρακαλω συμπληρώστε όλα τα πεδία')
        return;
      }

      if(entity.Id != null){
        const ref = firebase.database().ref('Itineraries/' + entity.Id);
        delete entity.$$hashKey;

        ref.set(entity)
        .then(() => {
          alert('Η επεξεργασία ήταν επιτυχής!');
          initializeData();
        })
        .catch(err => alert('Η επεξεργασία απέτυχε' + err.message));
        return;
      }
	    else{
		    return alert('Δεν υπαρχει το Δρομολόγιο')
	    }
      
  }

  vm.removeItinerary = function (id) {
    if (!confirm('Έιστε σίγουρος οτι θέλετε να διαγράψετε το δρομολόγιο;')) return;

    firebase.database().ref('Itineraries/' + id).remove()
      .then(() => {
        alert('Επιτυχής διαγραφή');
        initializeData()
      })
      .catch(err => {
        alert('Η διαγραφή απέτυχε!: ' + err.message);
      });
  };


  vm.editItinerary=function(itinerary){
      $window.scrollTo(0, 0);
      vm.Entity=itinerary;
  }


  vm.hasEmptyField=function (entity) {
      return entity.Amount == null ||
            entity.TripNumber == null ||
            entity.TripDate == null ||
            entity.CarTypeCode == null ||
            entity.ItineraryTypeCode ==null ||
            entity.Driver==null;
  }

  vm.getTotal=function(filteredItineraries){
    var totalAmount=0.0;

    angular.forEach(filteredItineraries, function(itinerary) {
      totalAmount += itinerary.Amount;
    });

    return totalAmount;
  }
  vm.clearFilter=function(search){
    search.ItineraryTypeCode="";
    search.AmountIsPaid="";
    search.TripNumber="";
    search.Driver="";
  }

  vm.cancel=function() {
    vm.Entity = {
      Amount: null,
      Comments: null,
      TripNumber: null,
      TripDate: null,
      CarTypeCode:null,
      ItineraryTypeCode:null,
      AmountIsPaid:null,
      Driver:null
    };
  }

});
