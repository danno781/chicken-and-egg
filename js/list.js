var list = function(ko, item, searchprovider) {
	
	//********** Private methods
	
	//********** Private variables
	
	//********** Public methods
	
	// Execute a search
	function search() {
		results(searchprovider.search(query()))
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
		results: results
	}
	
};