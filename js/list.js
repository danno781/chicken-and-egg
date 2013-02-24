var list = function(ko, item, searchprovider, resultsprovider) {
	
	//********** Private methods
	
	// Helper to create a new item
	function createItem(searchresult) {
		var i = new item(ko, searchresult.name);
		// Set behaviour when it goes below zero
		i.number.subscribe(function(v) {
			if (v < 1) {
				items.remove(i);
				i.searchResultRow().itemInList(false);
			}
		});
		i.costs.subscribe(updateTotals)
		return i;
	}
	
	// Updates totals on connectors when individual prices are changed
	function updateTotals() {
		var lowest = {
			store: -1,
			value: 100000000000
		};
		var highest = {
			store: -1,
			value: 0
		};
		for (var s in stores()) {
			var total = stores()[s].price; // This is function, observable
			total(0);
			for (var i in items()) {
				var cost = items()[i].cost(stores()[s].guid);
				// Was there a cost found
				if (cost) {
					// Increase the total
					total(Math.round((total() + cost)*100)/100);
				}
			}
			if (total() < lowest.value) {
				lowest.value = total();
				lowest.store = s;
			}
			if (total() > highest.value) {
				highest.value = total();
				highest.store = s;
			}
		}
		for (var s in stores()) {
			stores()[s].lowest(s == lowest.store);
			stores()[s].highest(s == highest.store);
		}
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
		loadingColour('blue');
		stores([]); // Temporarily blank the stores until we get new ones
		resultsprovider.getConnectors(function(connectors) {
			var initial = 10;
			loadingPercent(initial);
			loadingMsg("Getting prices...");
			for (var i in connectors) {
				connectors[i].price = ko.observable(0);
				connectors[i].lowest = ko.observable(false);
				connectors[i].highest = ko.observable(false);
			}
			stores(connectors);
			for (var i in items()) {
				resultsprovider.query(items()[i].name(), items()[i].process, function() {
					loadingPercent(100);
					loadingColour("red");
					active(false);
					loadingMsg("Unable to query import.io");
				}, function(total) {
					var change = ((100 - initial) / items().length) * (total/100);
					loadingPercent(loadingPercent() + change);
				});
			}
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
	
	// Whether or not loading is currently active
	var active = ko.observable(false);
	
	// Update active when loading is set
	loading.subscribe(active);
	loadingPercent.subscribe(function(percent) {
		if (percent >= 100) {
			loadingColour('green');
			active(false);
			loadingMsg("Pricing completed");
			setTimeout(function() {
				loading(false);
			}, 3000);
		}
	});
	
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
		stores: stores,
		active: active
	}
	
};