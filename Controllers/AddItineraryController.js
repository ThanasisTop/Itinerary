app.controller('AddItineraryController', function($scope, $window, FirebaseService) {
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
    }];
  }
  
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
    
    initializeLookUps();
   
    
	FirebaseService.getArray('Drivers',[])
				   .then(function(result){
					   vm.Drivers=result;
				   });
    

  };
  initializeData();

  vm.addItinerary=function(entity){
      if(vm.hasEmptyField(entity)){
        alert('Παρακαλω συμπληρώστε όλα τα πεδία')
        return;
      }
      
	  FirebaseService.save('Itineraries',entity).then(success,failure);
	  
	  function success(){
		  alert('Επιτυχής αποθήκευση')
		  initializeData()
	  }
	  function failure(err){
		  alert('Αποτυχία αποθήκευσης')
          console.log(err)
	  }
	  
      return;
  }
  
  vm.dateFormat=function(date){
	  
	  if(date.length>=2 && date.length<=3){
		  const day = date.substring(0, 2);
		  vm.Entity.TripDate = `${day}/`;
	  }
	  else if(date.length>4 && date.length<=5){
		  const day = date.substring(0, 2);
	      const month = date.substring(3, 5);
		  vm.Entity.TripDate = `${day}/${month}/`;
	  }
	  else if(date.length>5 && date.length<=10){
		  const day = date.substring(0, 2);
	      const month = date.substring(3, 5);
		  const year = date.substring(6, 10);
		  vm.Entity.TripDate = `${day}/${month}/${year}`;
	  }
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
