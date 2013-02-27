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
		},
		"connectionCallback": function(msg) {
			if (msg.channel == "/meta" && msg.data.type == "CONNECTION_CLOSED" && msg.data.reason == "MULTIPLE_CLIENTS") {
				alert("You have multiple Chicken and Egg windows open. Please close this window.");
			}
		}
	});
	
	// Create the lists binding
	var lists = new listObj($, ko, list, item, searchprovider, resultsprovider, importio);
	
	// Apply the list binding
	ko.applyBindings(lists);
	
});