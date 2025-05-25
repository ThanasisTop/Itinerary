app.controller('DriverController', function($scope, $location, FirebaseService, ReusableService) {
  var vm=this;

	function initializeData(){
		
		vm.Entity={
			FirstName:null,
			LastName:null
		};
		
		vm.currentPage=0;
		vm.pageSize=5;
		
		vm.showSpinner=true;
		FirebaseService.getArray('Drivers',[])
					   .then(function(result){
							vm.Drivers=result;
							vm.numberOfPages=ReusableService.initializePaging(vm.Drivers,vm.currentPage,vm.pageSize);
							vm.showSpinner=false;
						});
	}
	initializeData();

	vm.editDriver=function(entity){
		vm.Entity=entity;
	}
	
	vm.removeDriver=function(id){
		if (!confirm('Έιστε σίγουρος οτι θέλετε να διαγράψετε τον Οδηγό;')) return;

        FirebaseService.remove('Drivers',id).then(success,failure);
		
		function success(){
			alert('Επιτυχής διαγραφή');
	     	initializeData()
		}
		function failure(err){
			alert('Η διαγραφή απέτυχε!: ' + err.message);
			console.log(err)
		}
	}

	vm.cancel=function() {
    vm.Entity={
			FirstName:null,
			LastName:null
		};
  }
	
	vm.save=function(entity){
	  if(vm.hasEmptyField(entity))
	  {
	  	return alert('Παρακαλω συμπληρώστε όλα τα πεδία');
	  }

      if(entity.Id !=null)
	  {
		FirebaseService.update('Drivers',entity)
		.then(success,failure)
		
		function success(){
		  alert('Η επεξεργασία ήταν επιτυχής')
		  initializeData()
		}
		function failure(err){
		  alert('Αποτυχία επεξεργασίας')
		  console.log(err)
		}
		return;
	  }
	  
      FirebaseService.save('Drivers',entity).then(success,failure)
	  
	  function success()
	  {
		alert('Επιτυχής αποθήκευση')
		initializeData()
	  }
	  function failure(err)
	  {
		alert('Αποτυχία αποθήκευσης')
		console.log(err)
	  }
	}
	
	vm.hasEmptyField=function (entity) {
      return entity.FirstName == null ||
            entity.LastName == null;
  }
})
    