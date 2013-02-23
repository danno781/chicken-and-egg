var searchresult = function(n) {
	
	// Name of the item
	var name = n;
	
	// Reference to the item in the list
	var itemInList = ko.observable(false);
	
	return {
		name: name,
		itemInList: itemInList
	}
	
};

var searchprovider = (function(searchresult) {
	
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
				results.push(new searchresult(eligibleItems[item]));
			}
		}
		return results;
	}
	
	//********** Public variables
	
	return {
		search: search
	}
	
})(searchresult)