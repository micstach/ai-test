var Layer = require('./layer');

function Brain(inputSize, hiddenSize, outputSize) {
  this._inputLayer = new Layer(inputSize, 1);
  this._hiddenLayer = new Layer(hiddenSize, inputSize);
  this._hiddenLayer2 = new Layer(hiddenSize, inputSize);
  this._outputLayer = new Layer(outputSize, hiddenSize);
  this._neurons = [];

  this._inputLayer.getNeurons().forEach(function(neuron) {
    this._neurons.push(neuron);
  }, this);

  this._hiddenLayer.getNeurons().forEach(function(neuron) {
    this._neurons.push(neuron);
  }, this);

  this._hiddenLayer2.getNeurons().forEach(function(neuron) {
    this._neurons.push(neuron);
  }, this);

  this._outputLayer.getNeurons().forEach(function(neuron) {
    this._neurons.push(neuron);
  }, this);
};

Brain.prototype.evaluate = function(input) {
  var output = input.slice();

  output = this._inputLayer.evaluate(output, true);
  output = this._hiddenLayer.evaluate(output, false);
  output = this._hiddenLayer2.evaluate(output, false);
  output = this._outputLayer.evaluate(output, false);

  return output;
};

Brain.prototype.getNeurons = function() {
  return this._neurons;
};

Brain.prototype.getWeightsCount = function() {
  let count = 0;
  for (let i=0; i<this._neurons.length; i++) {
    count += this._neurons[i].getConnectionsCount();
  }
  return count;
}

Brain.prototype.getBiasesCount = function() {
  return this._neurons.length;
};

module.exports = Brain;
