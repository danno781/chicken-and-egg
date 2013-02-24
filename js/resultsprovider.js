var resultsprovider = function($) {
	
	//********** Private methods
	var mix = "666feabe-e08c-495b-9326-300e7a20a034"
	
	//********** Private variables
	
	//********** Public methods
	
	// Gets the connectors in the mix and returns them all
	function getConnectors(okcallback, errorcallback) {
		var url = "http://api.import.io/store/mix/" + mix + "/_connector";
		$.get(url).done(okcallback).fail(errorcallback);
	}
	
	//********** Public variables
	
	return {
		getConnectors: getConnectors
	}
}