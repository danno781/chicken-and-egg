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
	
	//********** Private variables
	
	var eligibleItems = [
	                     "12 free range eggs",
	                     "6 free range eggs",
	                     "brown bread 800g",
	                     "white bread 800g",
	                     "pg tips 80 bags",
	                     "starbucks via",
	                     "mcvities digestive biscuits 500g",
	                     "spam 200g",
	                     "fresh whole chicken",
	                     "orange juice",
	                     "apple juice",
	                     "pineapple juice",
	                     "frosties",
	                     "rice krispies",
	                     "semi skimmed milk",
	                     "skimmed milk",
	                     "whole milk"
	                     ];
	
	//********** Public methods
	
	function search(query) {
		var results = [];
		for (var item in eligibleItems) {
			if (eligibleItems[item].indexOf(query) >= 0) {
				results.push(new searchresult(eligibleItems[item]));
			}
		}
		if (query == "") {
			results.sort(function() {
				return Math.round(Math.random() * 2 - 1)
			})
			results = results.slice(0, 6);
		}
		return results;
	}
	
	//********** Public variables
	
	return {
		search: search
	}
	
})(searchresult)