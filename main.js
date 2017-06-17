var Neuron = require('./neuron');

var trainData = [
  {input: [0, 0], output: 0},
  {input: [1, 0], output: 1},
  {input: [0, 1], output: 1},
  {input: [1, 1], output: 0}
];

var inputLayer = [];
inputLayer.push(new Neuron());
inputLayer.push(new Neuron());

var hiddenLayer = [];
hiddenLayer.push(new Neuron());
hiddenLayer.push(new Neuron());
//hiddenLayer.push(new Neuron());
//hiddenLayer.push(new Neuron());
//hiddenLayer.push(new Neuron());

var outputLayer = [];
outputLayer.push(new Neuron());

var error = 100.0;
var minSetup = [];
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

  for (var i=0; i<layer.length; i++) {
    var neuron = layer[i];
    var value = neuron.eval(input);
    layerOutput.push(value);
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


for (var k=0; k<1000; k++) {
  
  var setup = [];
  for (var n=0; n<neurons.length; n++){
    setup.push({weight: (Math.random() * 100.0 - 50.0), bias: Math.random() * 100.0  - 50.0});
  }

  for (var n=0; n<neurons.length; n++){
    neurons[n].setWeight(setup[n].weight).setBias(setup[n].bias);
  }

  var setupError = .0;

  for (var s=0; s<trainData.length; s++) {
    var sample = trainData[s];    
    var output = evaluate(sample.input);
    
    for (var j=0; j<output.length; j++) {
      setupError += Math.pow(sample.output - output[j], 2.0);
    }
  }
  //console.log('iteration: ' + k + ", error: " + setupError);
  //console.log('setup: ' + JSON.stringify(setup));

  if (setupError < error) {
    error = setupError;
    minSetup = setup.slice();
  }
}

console.log('Least error: ' + error);
console.log('Setup: ' + JSON.stringify(minSetup));

for (var n=0; n<neurons.length; n++){
  neurons[n].setWeight(minSetup[n].weight).setBias(minSetup[n].bias);
}

console.log(evaluate([0, 0]));
console.log(evaluate([1, 0]));
console.log(evaluate([0, 1]));
console.log(evaluate([1, 1]));
