app.controller('DriverController', function($scope,$location) {
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

	function initializeData(){
		
		vm.Entity={
			FirstName:null,
			LastName:null
		};

		vm.Drivers=[];

		vm.showSpinner=true;
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
	}
	initializeData();

	vm.editDriver=function(entity){
		vm.Entity=entity;
	}
	
	vm.removeDriver=function(id){
		if (!confirm('Έιστε σίγουρος οτι θέλετε να διαγράψετε τον Οδηγό;')) return;

    firebase.database().ref('Drivers/' + id).remove()
      .then(() => {
        alert('Επιτυχής διαγραφή');
        initializeData()
      })
      .catch(err => {
        alert('Η διαγραφή απέτυχε!: ' + err.message);
      });
	}

	vm.cancel=function() {
    vm.Entity={
			FirstName:null,
			LastName:null
		};
  }
	
	vm.save=function(entity){
		if(vm.hasEmptyField(entity)){
			alert('Παρακαλω συμπληρώστε όλα τα πεδία')
			return;
		}

      if(entity.Id != null){
        const ref = firebase.database().ref('Drivers/' + entity.Id);
        delete entity.$$hashKey;

        ref.set(entity)
        .then(() => {
          alert('Η επεξεργασία ήταν επιτυχής!');
          initializeData();
        })
        .catch(err => alert('Η επεξεργασία απέτυχε' + err.message));
        return;
      }

      database.ref('Drivers')
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
      return entity.FirstName == null ||
            entity.LastName == null;
  }
})
    