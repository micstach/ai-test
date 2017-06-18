var Neuron = require('./neuron');
var Layer = require('./layer');
var Brain = require('./brain');

var trainData = [
  {input: [0, 0], output: [0]},
  {input: [1, 0], output: [1]},
  {input: [0, 1], output: [1]},
  {input: [1, 1], output: [0]}
];

var brain = new Brain(trainData[0].input.length, 2, trainData[0].output.length);

var error = 1.0;
var errorThreshold = 0.0001;
var iteration = 0 ;
var setupMin = null;
var setupGradient = null;
var learningRate = 0.0001;

while(error > errorThreshold && iteration < 1000000) {
  
  var setup = Array(brain.getNeurons().length);
  if (setupMin === null || setupGradient === null || error > learningRate ) {
    var scaleWeight = Math.random() * 100.0;
    var scaleBias = Math.random() * 100.0;
    for (var n=0; n<setup.length; n++) {
      setup.push({
        weight: scaleWeight * (Math.random() * 2.0 - 1.0), 
        bias: scaleBias * (Math.random() * 2.0 - 1.0)
      });
    }
  } else {
    for (var n=0; n<brain.getNeurons().length; n++) {
      setup[n] = {
        weight: setupMin[n].weight - setupGradient[n].weight,
        bias: setupMin[n].bias - setupGradient[n].bias
      };
    }
  }

  for (var n=0; n<brain.getNeurons().length; n++){
    brain.getNeurons()[n].setWeight(setup[n].weight).setBias(setup[n].bias);
  }

  var setupError = .0;

  for (var s=0; s<trainData.length; s++) {
    var sample = trainData[s];    
    var output = brain.evaluate(sample.input);
    
    for (var j=0; j<output.length; j++) {
      setupError += Math.pow(sample.output[j] - output[j], 2.0);
    }
  }

  setupError *= 1.0/(1.0 * brain.getNeurons().length);

  if (setupError < error) {
    var valueError = error - setupError;
    error = setupError;

    if (setupMin) {
      setupGradient = [];
      var length = 0.0;
      for (var g=0; g<setup.length; g++) {
        var d = {
          weight: setupMin[g].weight - setup[g].weight,
          bias: setupMin[g].bias - setup[g].bias,        
        };
        setupGradient.push(d);

        length += Math.pow(d.weight, 2.0) + Math.pow(d.bias, 2.0);

      }
      length = Math.sqrt(length);

      for (var g=0; g<setupGradient.length; g++) {
        setupGradient[g].weight *= 1.0 / length;
        setupGradient[g].bias *= 1.0 / length;
      }

      console.log('gradient length: ' + length);
    }

    setupMin = Array(setup.length);
    for (var c=0; c<setup.length; c++){
      setupMin[c] = {
        weight: setup[c].weight,
        bias: setup[c].bias
      };
    }
    console.log('error: ' + error + ", iteration: " + iteration);
  }

  iteration ++;
}

if (error > errorThreshold) {
  console.log('does not converge: ' + error);
} else {
  console.log('converge: ' + error);
}

if (setupMin) {
  console.log('Setup: ' + JSON.stringify(setupMin));
  for (var n=0; n<brain.getNeurons().length; n++){
    brain.getNeurons()[n].setWeight(setupMin[n].weight).setBias(setupMin[n].bias);
  }

  console.log(brain.evaluate([0, 0]));
  console.log(brain.evaluate([1, 0]));
  console.log(brain.evaluate([0, 1]));
  console.log(brain.evaluate([1, 1]));
}
