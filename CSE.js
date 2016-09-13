#!/usr/bin/env node
/**
 * get all objects
 */
var EVT = require('evrythng-extended');
var operator =  new EVT.Operator('VBz9tgBBztoODX1xMdx0oQXBfYcxqJlAI3RcIognk5c4Ey9KQmX5SxeClox18AIzzEPVXoaj0lkQjlf9');
 
 


var outputArray = [];
var num = 0;


function done(options,err) {
	
    console.log(JSON.stringify(outputArray));
}

function getItems() {

    var it = operator.action('scans').iterator({
      params: {
        perPage: 100,
        project: 'UVtBEErHsBKRNErsUnekradb',
        context: true,
        filter: 'timestamp>=1473552000000&timestamp<=1473638400000'
      }
    });

    return EVT.Utils.forEachAsync(it, function(page) {
      //console.log('Num', num+=100);
      page.forEach(function(action){
       outputArray.push(action);
      });

    });

}
//process.on('exit', done.bind(null,{cleanup:true}));


//getItems().then(done).catch(e => console.error(e));

getItems().then(done);

return;