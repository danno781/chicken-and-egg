var resultsprovider = function($) {
	
	//********** Private methods
		
	// Gets the data for a single connector
	function getConnector(connector) {
		var url = "http://api.import.io/store/connector/" + connector;
		return $.ajax(url);
	}
	
	//********** Private variables
	
	var mix = "666feabe-e08c-495b-9326-300e7a20a034";
	
	//********** Public methods
	
	// Gets the connectors in the mix and returns them all
	function getConnectors(okcallback, errorcallback) {
		var url = "http://api.import.io/store/mix/" + mix + "/_connector";
		$.ajax(url).done(function(connectors) {
			var getConnectors = [];
			for (var i in connectors) {
				getConnectors.push(getConnector(connectors[i].connectorGuid));
			}
			$.when.apply(this, getConnectors).done(function() {
				var connectors = [];
				for (var i in arguments) {
					connectors.push(arguments[i][0]);
				}
				okcallback(connectors);
			}).fail(errorcallback);
		}).fail(errorcallback);
	}
	
	//********** Public variables
	
	return {
		getConnectors: getConnectors
	}
}