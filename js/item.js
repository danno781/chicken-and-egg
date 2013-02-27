var item = function(ko, startName) {
	
	//********** Private methods
	
	// Updates the costs on the observable
	function updateCosts() {
		costs(links);
	}
	
	//********** Private variables
	
	// Stores the connector -> unit cost / name relationship
	var links = {};
	
	//********** Public methods
	
	// Increments the number
	function increment() {
		number(number() + 1)
	}
	
	// Decrements the number
	function decrement() {
		number(number() - 1)
	}
	
	// Mapper for the cost by connector
	function cost(connector, cost, name) {
		if (cost && !(connector in links)) {
			links[connector] = { "cost": cost, "name": name };
			updateCosts();
		}
		if (!cost && connector in links) {
			return links[connector].cost * number();
		}
		return 0;
	}
	
	// Process response data from connector
	function process(data) {
		for (var j in data) {
			cost(data[j].connectorGuid, data[j].data["consumer_product/msrp/amount"], data[j].data["consumer_product/topic:name"]);
		}
	}
	
	// Reset the costs for another go
	function reset() {
		links = {};
	}
	
	//********** Public variables
	
	// The name of the item
	var name = ko.observable(startName);
	
	// The count of the item in the basket
	var number = ko.observable(1);
	
	// Reference to the search result row
	var searchResultRow = ko.observable(false);
	
	// Costs linked to this item
	var costs = ko.observable({});
	
	return {
		name: name,
		number: number,
		increment: increment,
		decrement: decrement,
		searchResultRow: searchResultRow,
		cost: cost,
		costs: costs,
		process: process,
		reset: reset
	}
	
};