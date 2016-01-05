onmessage = function(e) {
  console.log('Message received from main script');

  var normal = function(mu, sigma, nsamples){
    if(!nsamples) nsamples = 6;
    if(!sigma) sigma = 1;
    if(!mu) mu=0;

    var run_total = 0;
    for(var i=0 ; i<nsamples ; i++){
       run_total += Math.random();
    }

    return sigma*(run_total - nsamples/2)/(nsamples/2) + mu;
  };

  for (var i = 0; i < 100; i++) {
    // var batch = [];
    // // batching 
    // if ( i > 0 && i % 10 === 0 ) {
    //   postMessage(batch);
    //   batch = [];
    // }
    // batch.push( normal(e.data.mean, e.data.variance, 100) );
    postMessage(normal(e.data.mean, e.data.variance, 100))
  }

  

  //var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Done posting data back to main script');
  // postMessage(e.data);
};