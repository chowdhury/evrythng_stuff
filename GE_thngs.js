#!/usr/bin/env node
/**
 * get all objects
 */
var EVT = require('evrythng-extended');
 
var operator =  new EVT.Operator('oCufhXdvVEvgNyqdDi7QLryktFIFyxHAd9vZZlplVQy9idtAeOVsMOVXhOwdoKXGU6s4p0cxKC5VR8cM');



var outputArray = [];

process.on('exit', done.bind(null,{cleanup:true}));

getItems();

return;

function done(options,err) {
    console.log(JSON.stringify(outputArray));
}

function getItems() {

	var it = operator.thng().iterator({
	  params: {
	    perPage: 100,
	    sortOrder: 'DESCENDING',
	    project: 'UDhhT9HENFNQ2hxStFBPewme',
	    context: true
	  }
	});

	EVT.Utils.forEachAsync(it, function(page){
	  page.forEach(function(thng){
	    outputArray.push(thng)
	  });
	});

}
 