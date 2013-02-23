var lists = (function(ko, list) {
	
	//********** Private methods
	
	// Helper to create a new list with the correct dependencies
	function getNewList(name) {
		var l = new list(ko);
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
	
	// Blank the current list on going home
	view.subscribe(function(v) {
		if (v == "home") {
			currentListId(-1);
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
	
})(ko, list)

$(function() {
	ko.applyBindings(lists);
});