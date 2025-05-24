app.service('FirebaseService',function($rootScope){
  var vm = this;
	
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
	
	vm.save=function(refEntity, entity){
		return database.ref(refEntity)
              .push(entity);
	}
	
	
	vm.getArray = function(refEntity, entity) {
		
        return database.ref(refEntity).once('value').then(function(snapshot) {
        const data = snapshot.val();
		
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					let item = data[key];
					item.Id = key;
					entity.push(item);

				}
			}
			
			$rootScope.$applyAsync();
			return entity;
		});

		
    };
	
	vm.update=function(refEntity, entity){
		
		var refEntityStr=refEntity+'/'
		const ref = database.ref(refEntityStr + entity.Id);
        delete entity.$$hashKey;
		
		return ref.set(entity);
	}
	
	
	vm.remove=function(refEntity, id){
		var refEntityStr=refEntity+'/'
		return database.ref(refEntityStr + id).remove()
	}

	
})