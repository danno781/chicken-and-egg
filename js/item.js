var item = function(ko, startName) {
	
	//********** Private methods
	
	//********** Private variables
	
	//********** Public methods
	
	function increment() {
		number(number() + 1)
	}
	
	function decrement() {
		number(number() - 1)
	}
	
	//********** Public variables
	
	// The name of the item
	var name = ko.observable(startName);
	
	// The count of the item in the basket
	var number = ko.observable(1);
	
	// Reference to the search result row
	var searchResultRow = ko.observable(false);
	
	return {
		name: name,
		number: number,
		increment: increment,
		decrement: decrement,
		searchResultRow: searchResultRow
	}
	
};