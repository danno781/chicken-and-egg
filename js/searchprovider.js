var searchprovider = (function() {
	
	//********** Private methods
	var eligibleItems = [
	                     "egg",
	                     "doughnut",
	                     "milk",
	                     "yoghurt",
	                     "coffee",
	                     "tea"
	                     ];
	
	//********** Private variables
	
	//********** Public methods
	
	function search(query) {
		var results = [];
		for (var item in eligibleItems) {
			if (eligibleItems[item].indexOf(query) >= 0) {
				results.push(eligibleItems[item]);
			}
		}
		return results;
	}
	
	//********** Public variables
	
	return {
		search: search
	}
	
})()