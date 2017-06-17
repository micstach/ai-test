var Neuron = require('./neuron');

var trainData = [
  {input: [0, 0], output: 0},
  {input: [0, 1], output: 1},
  {input: [1, 0], output: 1},
  {input: [1, 1], output: 0}
];

var inputLayer = [];
inputLayer.push(new Neuron());
inputLayer.push(new Neuron());

var hiddenLayer = [];
hiddenLayer.push(new Neuron());
hiddenLayer.push(new Neuron());
hiddenLayer.push(new Neuron());
hiddenLayer.push(new Neuron());

var outputLayer = [];
outputLayer.push(new Neuron());

var error = 1.0;
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

function evaluate(input) {
  var inputLayerEval = [];

  for (var i=0; i<inputLayer.length; i++) {
    inputLayerEval.push(inputLayer[i].eval(input[i]));
  }

  var hiddenLayerEval = [];
  for (var i=0; i<hiddenLayer.length; i++) {
    hiddenLayerEval.push(hiddenLayer[i].eval(inputLayerEval));
  }
  
  return outputLayer[0].eval(hiddenLayerEval);
}

for (var k=0; k<100; k++) {
  
  var setup = [];

  for (var n=0; n<neurons.length; n++){
    setup.push({weight: Math.random(), bias: Math.random()});
  }

  for (var n=0; n<neurons.length; n++){
    neurons[n].setWeight(setup[n].weight).setBias(setup[n].bias);
  }

  var setupError = 0;

  for (var s=0; s<trainData.length; s++) {
    var sample = trainData[s];    
    var output = evaluate(sample.input);
    
    setupError += output;
  }
  setupError *= 1.0/trainData.length;

  setupError = Math.pow(sample.output - setupError, 2.0) ;

  if (setupError < error) {
    error = setupError;
    minSetup = setup.slice();
  }
}

console.log('Least error: ' + error + ", setup: " + JSON.stringify(minSetup));

for (var n=0; n<neurons.length; n++){
  neurons[n].setWeight(minSetup[n].weight).setBias(minSetup[n].bias);
}

console.log(evaluate([0,0]));
console.log(evaluate([1,0]));
console.log(evaluate([0,1]));
console.log(evaluate([1,1]));
