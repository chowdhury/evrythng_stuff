#!/usr/bin/env node
/**
 * get all objects
 */
var EVT = require('evrythng-extended');
var operator =  new EVT.Operator('1yNodX5iKWM7BORhrXa4EkW87TQ9xRivkaD28Pa1i59Hn7ekmivfiNsGxueyxwXQtRpTmtDvyej8cG2J');
 
//var num = 0;


var outputArray = [];


function done(options,err) {
	
    console.log(JSON.stringify(outputArray));
}

function getItems() {

    var it = operator.action('scans').iterator({
      params: {
        perPage: 10,
        project: 'UXqeUP6cDMkEGwCD2P5d4Dec',
        context: true,
        filter: 'timestamp>=1473033600000&timestamp<=1473638400000'
      }
    });

    return EVT.Utils.forEachAsync(it, function(page){
      //console.log('Num', num+=10);
      page.forEach(function(action){
       outputArray.push(action);
      });



    });

}
//process.on('exit', done.bind(null,{cleanup:true}));


getItems().then(done);

return;