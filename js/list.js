var list = function(ko, item, searchprovider) {
	
	//********** Private methods
	
	function createItem(searchresult) {
		var i = new item(ko, searchresult.name);
		// Set behaviour when it goes below zero
		i.number.subscribe(function(v) {
			if (v < 1) {
				items.remove(i);
				searchresult.itemInList(false);
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
				}
			}
		}
		results(res);
	}
	
	// Adds a search result to the current list
	function addToList(searchresult) {
		var item = createItem(searchresult);
		items.push(item);
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
	
	return {
		name: name,
		editingName: editingName,
		items: items,
		query: query,
		search: search,
		results: results,
		addToList: addToList,
		removeFromList: removeFromList
	}
	
};