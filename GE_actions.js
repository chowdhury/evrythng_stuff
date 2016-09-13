#!/usr/bin/env node
/**
 * get all objects
 */
var EVT = require('evrythng-extended');


var operator =  new EVT.Operator('oCufhXdvVEvgNyqdDi7QLryktFIFyxHAd9vZZlplVQy9idtAeOVsMOVXhOwdoKXGU6s4p0cxKC5VR8cM');
 
 


var outputArray = [];


function done(options,err) {
	
    console.log(JSON.stringify(outputArray));
}

function getItems() {

    var it = operator.action('scans').iterator({
      params: {
        perPage: 100,
        project: 'UgRsBfMp8BKayk9pB3txDn4f',
        context: true,
        filter: 'timestamp>=1471219200000&timestamp<=1471737600000'
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