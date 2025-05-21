app.controller('DashboardController', function($scope,$location) {


	var vm=this;
	
	vm.toggleSidebar=function(collapse) {
		
        const sidebar = document.querySelector('.sidebar');
		
		if(collapse)
			sidebar.classList.toggle('collapsed');
        
    }
	vm.toggleSidebar(true);
	
	vm.Menu=[
		{
			Title:"Main Dashboard",
			IsActive:true,
			Icon:"fa-home",
			Path:"dashboard"
		},
		{
			Title:"Προσθήκη Δρομολογίου",
			IsActive:true,
			Icon:"fa-plus",
			Path:"add-itinerary"
		},
		{
			Title:"Τα Δρομολόγιά μου",
			IsActive:true,
			Icon:"fa-car",
			Path:"my-itineraries"
		},
		{
			Title:"Ημερολόγιο",
			IsActive:false,
			Icon:"fa-calendar",
			Path:"calendar"
		},
		{
			Title:"Οδηγοί",
			IsActive:true,
			Icon:"fa-users",
			Path:"drivers"
		},
		{
			Title:"Το Προφίλ μου",
			IsActive:false,
			Icon:"fa-user",
			Path:"profile"
		}]

	vm.Menu=vm.Menu.filter(function(item){
		return item.IsActive==true;
	})

	vm.currentPage='dashboard';
	vm.setPage=function(page){
		vm.currentPage = page;
	}
	
	
})
    