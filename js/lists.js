var lists = (function(ko, list) {
	
	//********** Private methods
	
	//********** Private variables
	
	var currentList = ko.observable(-1)
	
	//********** Public methods
	
	// Shortcut to go edit a list
	function editList(id) {
		view("edit");
		currentList(id);
	}
	
	// Shortut to create a list
	function newList() {
		lists.push(new list(ko));
		view("edit")
		currentList(lists.length)
	}
	
	//********** Public variables
	
	// Which view is currently active
	var view = ko.observable("home");
	
	// The list of shopping lists
	var lists = ko.observableArray([{"name": "derp"}]);
	
	return {
		view: view,
		lists: lists,
		editList: editList,
		newList: newList
	}
	
})(ko, list)

$(function() {
	ko.applyBindings(lists);
});