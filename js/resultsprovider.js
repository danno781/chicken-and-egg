var resultsprovider = function($, importio) {
	
	//********** Private methods
		
	// Gets the data for a single connector
	function getConnector(connector) {
		var url = "http://api.import.io/store/connector/" + connector;
		return $.ajax(url, {"dataType": "json"});
	}
	
	function getMix() {
		var mix = window.location.hash.replace("#", "");
		if (mix.length != 36) {
			mix = "666feabe-e08c-495b-9326-300e7a20a034";
		}
		return mix;
	}
	
	//********** Private variables
	
	var connectorGuids = [];
	
	//********** Public methods
	
	// Gets the connectors in the mix and returns them all
	function getConnectors(okcallback, errorcallback) {
		var url = "http://api.import.io/store/mix/" + getMix() + "/_connector";
		$.ajax(url, {"dataType": "json"}).done(function(connectors) {
			var getConnectors = [];
			for (var i in connectors) {
				getConnectors.push(getConnector(connectors[i].connectorGuid));
			}
			connectorGuids = [];
			$.when.apply(this, getConnectors).done(function() {
				var connectors = [];
				if (getConnectors.length == 1) {
					arguments = [arguments];
				}
				for (var i in arguments) {
					connectors.push(arguments[i][0]);
					connectorGuids.push(arguments[i][0]["guid"]);
				}
				okcallback(connectors);
			}).fail(errorcallback);
		}).fail(errorcallback);
	}
	
	// Does a query on the mix for the specific terms
	function query(value, okcallback, errorcallback, progresscallback) {
		var q = {
			"input": {
		        "consumer_product/topic:name": value.toLowerCase()
		    },
		    "mixGuids": [getMix()]
		};
		importio.query(q).done(okcallback).fail(errorcallback).progress(progresscallback);
	}
	
	//********** Public variables
	
	return {
		getConnectors: getConnectors,
		query: query
	}
}