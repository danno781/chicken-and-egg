var list = function(ko, item, searchprovider, resultsprovider) {
	
	//********** Private methods
	
	function createItem(searchresult) {
		var i = new item(ko, searchresult.name);
		// Set behaviour when it goes below zero
		i.number.subscribe(function(v) {
			if (v < 1) {
				items.remove(i);
				i.searchResultRow().itemInList(false);
			}
		});
		return i;
	}
	
	//********** Private variables
	
	//********** Public methods
	
	// Execute a search
	function search() {
		var res = searchprovider.search(query())
		for (var i in res) {
			for (var j in items()) {
				if (res[i].name == items()[j].name()) {
					res[i].itemInList(items()[j]);
					items()[j].searchResultRow(res[i]);
				}
			}
		}
		results(res);
	}
	
	// Adds a search result to the current list
	function addToList(searchresult) {
		var item = createItem(searchresult);
		items.push(item);
		item.searchResultRow(searchresult);
		searchresult.itemInList(item);
	}
	
	// Removes a search result from the current list
	function removeFromList(searchresult) {
		for (var i in items()) {
			if (items()[i].name() == searchresult.name) {
				items.remove(items()[i]);
				searchresult.itemInList(false);
			}
		}
	}
	
	// Gets data from the resultsprovider
	function getData() {
		loading(true);
		loadingMsg("Getting available stores...")
		stores([]); // Temporarily blank the stores until we get new ones
		resultsprovider.getConnectors(function(connectors) {
			loadingPercent(10);
			loadingMsg("Got stores, getting their prices...");
			stores(connectors);
		}, function() {
			loadingPercent(100);
			loadingColour("red");
			loadingMsg("Unable to connect to import.io, do you have an internet connection?");
		});
	}
	
	//********** Public variables
	
	// The name of this list
	var name = ko.observable("Untitled List");
	
	// Whether or not this list's name is being edited
	var editingName = ko.observable(false);
	
	// List of items in the list
	var items = ko.observableArray([]);
	
	// A search query string
	var query = ko.observable("")
	
	// Search results
	var results = ko.observableArray([]);
	
	// Whether or not we are loading
	var loading = ko.observable(false);
	
	// The loading message
	var loadingMsg = ko.observable("Starting...");
	
	// What colour the loading bar should be
	var loadingColour = ko.observable("blue");
	
	// How far loaded we are
	var loadingPercent = ko.observable(0);
	
	// Which stores we are using
	var stores = ko.observableArray([]);
	
	return {
		name: name,
		editingName: editingName,
		items: items,
		query: query,
		search: search,
		results: results,
		addToList: addToList,
		removeFromList: removeFromList,
		getData: getData,
		loading: loading,
		loadingMsg: loadingMsg,
		loadingPercent: loadingPercent,
		loadingColour: loadingColour,
		stores: stores
	}
	
};