var Neuron = require('./neuron');

var trainData = [
  {input: [0, 0], output: [0]},
  {input: [1, 0], output: [1]},
  {input: [0, 1], output: [1]},
  {input: [1, 1], output: [0]}
];

var inputLayer = [];
inputLayer.push(new Neuron());
inputLayer.push(new Neuron());

var hiddenLayer = [];
hiddenLayer.push(new Neuron());
hiddenLayer.push(new Neuron());
hiddenLayer.push(new Neuron());
hiddenLayer.push(new Neuron());
hiddenLayer.push(new Neuron());

var outputLayer = [];
for (var i=0; i<trainData[0].output.length; i++) {
  outputLayer.push(new Neuron());
}

var neurons = [];

inputLayer.forEach(function(neuron) {
  neurons.push(neuron);
}, this);

hiddenLayer.forEach(function(neuron) {
  neurons.push(neuron);
}, this);

outputLayer.forEach(function(neuron) {
  neurons.push(neuron);
}, this);

function evaluateLayer(layer, input) {
  var layerOutput = [];

  if (layer.length > 0) {
    for (var i=0; i<layer.length; i++) {
      var neuron = layer[i];
      var value = neuron.eval(input);
      layerOutput.push(value);
    }
  } else {
    layerOutput = Array(input.length);
    for (var i=0; i<input.length; i++){
      layerOutput[i] = input[i];
    }
  }
  return layerOutput  
}

function evaluate(input) {
  var output = input.slice();

  output = evaluateLayer(inputLayer, output);
  output = evaluateLayer(hiddenLayer, output);
  output = evaluateLayer(outputLayer, output);

  return output;
}

var error = 1.0;
var errorThreshold = 0.0001;
var iteration = 0 ;
var setupMin = null;
var setupGradient = null;
var learningRate = 0.01;

while(error > errorThreshold && iteration < 100000) {
  
  var setup = [];
  if (setupMin === null || setupGradient === null || error > learningRate ) {
    var scaleWeight = Math.random() * 10.0;
    var scaleBias = Math.random() * 10.0;
    for (var n=0; n<neurons.length; n++) {
      setup.push({weight: scaleWeight * (Math.random() * 2.0 - 1.0), bias: scaleBias * (Math.random() * 2.0 - 1.0)});
    }
  } else {
    setup = Array(neurons.length);

    for (var n=0; n<neurons.length; n++) {
      setup[n] = {
        weight: setupMin[n].weight - setupGradient[n].weight,
        bias: setupMin[n].bias - setupGradient[n].bias
      };
    }
  }

  for (var n=0; n<neurons.length; n++){
    neurons[n].setWeight(setup[n].weight).setBias(setup[n].bias);
  }

  var setupError = .0;

  for (var s=0; s<trainData.length; s++) {
    var sample = trainData[s];    
    var output = evaluate(sample.input);
    
    for (var j=0; j<output.length; j++) {
      setupError += Math.pow(sample.output[j] - output[j], 2.0);
    }
  }

  setupError *= 1.0/(2.0 * neurons.length);

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
  for (var n=0; n<neurons.length; n++){
    neurons[n].setWeight(setupMin[n].weight).setBias(setupMin[n].bias);
  }

  console.log(evaluate([0, 0]));
  console.log(evaluate([1, 0]));
  console.log(evaluate([0, 1]));
  console.log(evaluate([1, 1]));
}
