var resultsprovider = function($, importio) {
	
	//********** Private methods

	//********** Private variables
	
	var connectorGuids = [];
	
	//********** Public methods
	
	// Gets the connectors in the mix and returns them all
	function getConnectors() {
		var tag = window.location.hash.replace("#", "");
		if (!tag.length) {
			tag = "cande";
		}
		return importio.bucket("connector").search(false, { "tags": tag.toUpperCase() });
	}
	
	// Does a query on the mix for the specific terms
	function query(value, okcallback, errorcallback, progresscallback) {
		getConnectors().done(function(data) {
			var connectorGuids = [];
			data.hits.hits.map(function(hit) {
				connectorGuids.push(hit._id);
			});
			var q = {
				"input": {
			        "product": value.toLowerCase()
			    },
			    "connectorGuids": connectorGuids
			};
			importio.query(q).done(okcallback).fail(errorcallback).progress(progresscallback);
		}).fail(errorcallback);
	}
	
	//********** Public variables
	
	return {
		getConnectors: getConnectors,
		query: query
	}
}