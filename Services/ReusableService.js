app.service('ReusableService',function(){
	var vm= this;
	
	vm.initializePaging=function(entityList, currentPage, pageSize){
	  return numberOfPages=Math.ceil(entityList.length / pageSize);
	}
})