app.controller('DashboardController', function($scope,$location) {


	var vm=this;

	vm.Menu=[
		{
			Title:"Main Dashboard",
			Url:"./dashboard.html",
			Icon:"fa-home",
			Path:"dashboard"
		},
		{
			Title:"Τα Δρομολόγιά μου",
			Url:"./itineraries.html",
			Icon:"fa-car",
			Path:"my-itineraries"
		},
		{
			Title:"Προσθήκη Δρομολογίου",
			Url:"./add-itinerary.html",
			Icon:"fa-plus",
			Path:"add-itinerary"
		},
		{
			Title:"Ημερολόγιο",
			Url:"./calendar.html",
			Icon:"fa-calendar",
			Path:"calendar"
		},
		{
			Title:"Οδηγοί",
			Url:"./drivers.html",
			Icon:"fa-users",
			Path:"drivers"
		},
		{
			Title:"Το Προφίλ μου",
			Url:"./profile.html",
			Icon:"fa-user",
			Path:"profile"
		}
	
	]
	vm.currentPage=null;
	vm.setPage=function(page){
		vm.currentPage = page;
	}
})
    