app.controller('ItinerariesListController', function($scope,$window,FirebaseService) {
  var vm=this;
  function initializeLookUps(){
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
    
  }
  
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
	
    initializeLookUps();
	
    vm.showSpinner=true;
	
	FirebaseService.getArray('Itineraries',[])
				   .then(function(result){
					   vm.Itineraries=result.reverse();
					   vm.showSpinner=false;
				   });
	
	FirebaseService.getArray('Drivers',[])
				   .then(function(result){
					   vm.Drivers=result;
					   vm.showSpinner=false;
				   });
  };
  initializeData();

  vm.updateItinerary=function(entity){
      if(vm.hasEmptyField(entity)){
        alert('Παρακαλω συμπληρώστε όλα τα πεδία')
        return;
      }

      if(entity.Id != null)
	  {
        FirebaseService.update('Itineraries',entity).then(success,failure)
		
		function success(){
			alert('Η επεξεργασία ήταν επιτυχής!');
			initializeData();
		}
		function failure(){
			alert('Η επεξεργασία απέτυχε' + err.message)
			console.log(err)
		}
        return;
      }
	  else
	  {
		return alert('Δεν υπαρχει το Δρομολόγιο')
	  }
      
  }

  vm.removeItinerary = function (id) {
    if (!confirm('Έιστε σίγουρος οτι θέλετε να διαγράψετε το δρομολόγιο;')) return;

    FirebaseService.remove('Itineraries',id).then(success,failure);
	  
	function success()
	{
	  alert('Επιτυχής διαγραφή');
      initializeData()
	}
	function failure(err)
	{
	  alert('Η διαγραφή απέτυχε!: ' + err.message);
	  console.log(err)
	}
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
