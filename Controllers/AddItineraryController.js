app.controller('AddItineraryController', function($scope,$window) {
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
      AmountIsPaid:null,
      Driver:null
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

    console.log(vm.Drivers)
  };
  initializeData();

  vm.addItinerary=function(entity){
      if(vm.hasEmptyField(entity)){
        alert('Παρακαλω συμπληρώστε όλα τα πεδία')
        return;
      }
      console.log(entity)
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

      database.ref('Itineraries')
              .push(entity)
              .then(() => {
                alert('Επιτυχής αποθήκευση')
        initializeData()
      },err => {
                alert('Αποτυχία αποθήκευσης')
                console.log(err)
      })
      return;
      
  }

  vm.hasEmptyField=function (entity) {
      return entity.Amount == null ||
            entity.TripNumber == null ||
            entity.TripDate == null ||
            entity.CarTypeCode == null ||
            entity.ItineraryTypeCode ==null||
            entity.Driver==null;
  }
});
