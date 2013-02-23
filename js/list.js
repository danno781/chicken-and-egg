var list = function(ko) {
	
	//********** Private methods
	
	//********** Private variables
	
	//********** Public methods
	
	//********** Public variables
	
	// The name of this list
	var name = ko.observable("Untitled List");
	
	// Whether or not this list's name is being edited
	var editingName = ko.observable(false);
	
	return {
		name: name,
		editingName: editingName
	}
	
};