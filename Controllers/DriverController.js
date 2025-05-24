app.controller('DriverController', function($scope, $location, FirebaseService) {
  var vm=this;

	function initializeData(){
		
		vm.Entity={
			FirstName:null,
			LastName:null
		};

		vm.showSpinner=true;
		FirebaseService.getArray('Drivers',[])
					   .then(function(result){
							vm.Drivers=result;
							vm.showSpinner=false;
						});
	}
	initializeData();

	vm.editDriver=function(entity){
		vm.Entity=entity;
	}
	
	vm.removeDriver=function(id){
		if (!confirm('Έιστε σίγουρος οτι θέλετε να διαγράψετε τον Οδηγό;')) return;

        FirebaseService.remove('Drivers',id)
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

      if(entity.Id !=null){
		  FirebaseService.update('Drivers',entity)
		  .then(() => {
					alert('Η επεξεργασία ήταν επιτυχής')
					initializeData()
		  },err => {
					alert('Αποτυχία αποθήκευσης')
					console.log(err)
		  })
		  return;
	  }
	  
      FirebaseService.save('Drivers',entity)
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
    