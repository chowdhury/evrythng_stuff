#!/usr/bin/env node
/**
 * get all objects
 */
var EVT = require('evrythng-extended');


var operator =  new EVT.Operator('jf9RIAtKe2vAnx6cw0mnceIJPis20GfkND8KCoiluQn5dxFeOhN3X6C8s2ooapC6J5rVDinaiXUFnvFP');
 
 


var outputArray = [];


function done(options,err) {
	
    console.log(JSON.stringify(outputArray));
}

function getItems() {

    var it = operator.action('scans').iterator({
      params: {
        perPage: 100,
        project: 'UXt4e7yEMmAKm2bdfaytCs2a',
        context: true,
        filter: 'timestamp>=1473033600000&timestamp<=1473638400000'
      }
    });

    return EVT.Utils.forEachAsync(it, function(page){
      page.forEach(function(action){
       outputArray.push(action);
      });



    });

}
//process.on('exit', done.bind(null,{cleanup:true}));


getItems().then(done);

return;