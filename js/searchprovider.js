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
	                     "12 Free range eggs",
	                     "6 Free range eggs",
	                     "Brown bread 800g",
	                     "White bread 800g",
	                     "PG Tips 80 bags",
	                     "Starbucks VIA",
	                     "McVities biscuits 500g",
	                     "Spam 200g",
	                     "Fresh whole chicken",
	                     "Orange juice",
	                     "Apple juice",
	                     "Pineapple juice",
	                     "Frosties",
	                     "Rice Krispies",
	                     "Semi skimmed milk",
	                     "Skimmed milk",
	                     "Whole milk"
	                     ];
	
	//********** Public methods
	
	function search(query) {
		query = query.toLowerCase();
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