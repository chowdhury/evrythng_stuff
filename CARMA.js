#!/usr/bin/env node
/**
 * get all objects
 */
var EVT = require('evrythng-extended');


var operator =  new EVT.Operator('JlIiDCAGYiTbxufFzbomGBR7xczFomPBHc96UEv6X5S7e3KaEHgSGPyPeXcR1YUiEi0LasIJqLu6Vgsz');
 
 


var outputArray = [];


function done(options,err) {
  
    console.log(JSON.stringify(outputArray));
}

function getItems() {

    var it = operator.action('scans').iterator({
      params: {
        perPage: 100,
        project: 'UDNhbERNfHPdAWa6kt7HPtPn',
        context: true,
          filter: 'timestamp>=1473552000000&timestamp<=1473638400000'
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