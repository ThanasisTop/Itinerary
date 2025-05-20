app.controller('DriverController', function($scope,$location) {


	var vm=this;
	
	vm.Entity={
		FirstName:null,
		LastName:null
	};
	
	vm.Drivers=[
	{
		FirstName:"Θανάσης",
		LastName:"Τόπτσιος"
	},
	{
		FirstName:"Βασίλης",
		LastName:"Πατελάρος"
	}];
	
	vm.editDriver=function(entity){
		
	}
	
	vm.removeDriver=function(entity){
		
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
    