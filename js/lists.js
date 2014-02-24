var listObj = function($, ko, list, item, searchprovider, resultsprovider, importio) {
	
	//********** Private methods
	
	// Helper to create a new list with the correct dependencies
	function getNewList(name) {
		var l = new list(ko, item, searchprovider, new resultsprovider($, importio));
		if (name) {
			l.name(name);
		}
		return l;
	}
	
	//********** Private variables
	
	// The currently viewing list ID
	var currentListId = ko.observable(-1);
	
	// Subscribe to the ID to set the correct context
	currentListId.subscribe(function(id) {
		if (id < 0) {
			currentList(false);
		} else {
			currentList(lists()[id]);
		}
	});
	
	//********** Public methods
	
	// Shortcut to go edit a list
	function editList(id) {
		currentListId(id);
		view("edit");
	}
	
	// Shortut to create a list
	function newList() {
		lists.push(getNewList());
		currentListId(lists().length-1);
		view("edit");
	}
	
	//********** Public variables
	
	// Which view is currently active
	var view = ko.observable("home");
	
	// Actions when changing screen
	view.subscribe(function(v) {
		// Unset the current list when going home
		if (v == "home") {
			currentListId(-1);
		}
		// When returning to edit, blank the search results
		if (v == 'edit') {
			currentList().search('');
		}
		// When going to checkout, kick off getting the connectors
		if (v == 'checkout') {
			currentList().getData();
		}
	})
	
	// The list of shopping lists
	var lists = ko.observableArray([getNewList("My First List")]);
	
	// The current list we are editing
	var currentList = ko.observable(false);
	
	return {
		view: view,
		lists: lists,
		editList: editList,
		newList: newList,
		currentList: currentList
	}
	
}

$(function() {
	
	// Init importio
	importio.init({
		"auth": {
			"userGuid": IMPORTIO_USER_GUID,
			"apiKey": IMPORTIO_API_KEY 
		}
	});
	
	// Create the lists binding
	var lists = new listObj($, ko, list, item, searchprovider, resultsprovider, importio);
	
	// Apply the list binding
	ko.applyBindings(lists);
	
	// Because JS doesn't support this by default...
	Number.prototype.money = function() {
        var n = this, decPlaces = 2, decSeparator = ".", thouSeparator = ",", currencySymbol = "£";
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + currencySymbol + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
    };
	
});