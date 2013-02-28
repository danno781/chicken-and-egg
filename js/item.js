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
		editing(true);
		number(number() + 1);
	}
	
	// Decrements the number
	function decrement() {
		editing(true);
		number(number() - 1);
	}
	
	// Mapper for the cost by connector
	function cost(connector, cost, n) {
		if (cost && !(connector in links)) {
			console.log(name(), n, cost.money());
			links[connector] = { "cost": cost, "name": n };
			updateCosts();
		}
		if (!cost && connector in links) {
			return links[connector].cost * number();
		}
		return 0;
	}
	
	// Unit price of item for a connector
	function each(connector) {
		if (connector in links) {
			return links[connector].cost;
		}
		return 0;
	}
	
	// Name from the store
	function storeName(connector) {
		if (connector in links) {
			return links[connector].name;
		}
		return "";
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
	
	// Whether or not we are editing this property
	var editing = ko.observable(false);
	
	// Whether or not to show the editing
	var showEditor = ko.observable(false);
	var timeout = false;
	editing.subscribe(function(e) {
		if (e) {
			if (timeout) {
				clearTimeout(timeout);
			}
			showEditor(true);
			editing(false);
			timeout = setTimeout(function() {
				showEditor(false);
			}, 3000);
		}
	});
	
	return {
		name: name,
		number: number,
		increment: increment,
		decrement: decrement,
		searchResultRow: searchResultRow,
		cost: cost,
		costs: costs,
		process: process,
		reset: reset,
		each: each,
		storeName: storeName,
		editing: editing,
		showEditor: showEditor
	}
	
};