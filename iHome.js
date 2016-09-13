#!/usr/bin/env node
/**
 * get all objects
 */
var EVT = require('evrythng-extended');
 
var operator =  new EVT.Operator('lfnxPNyoQQ4P4mE4ESHPC2BxJia3AvUsOuU3KZcwxBu4n1TksKByiKnJOXDIzFlLK9bkxieb4m4oO0iP');



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
	    project: 'UWCC5rmCsVpwPsCnWeSsDrMe',
	  }
	});

	EVT.Utils.forEachAsync(it, function(page){
	  page.forEach(function(thng){
	    outputArray.push(thng)
	  });
	});

}
 