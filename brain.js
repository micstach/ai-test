var Layer = require('./layer');

function Brain(inputSize, hiddenSize, outputSize) {
  this._inputLayer = new Layer(inputSize);
  this._hiddenLayer = new Layer(hiddenSize);
  this._outputLayer = new Layer(outputSize);
  this._neurons = [];

  this._inputLayer.getNeurons().forEach(function(neuron) {
    this._neurons.push(neuron);
  }, this);

  this._hiddenLayer.getNeurons().forEach(function(neuron) {
    this._neurons.push(neuron);
  }, this);

  this._outputLayer.getNeurons().forEach(function(neuron) {
    this._neurons.push(neuron);
  }, this);
};

Brain.prototype.evaluate = function(input) {
  var output = input.slice();

  output = this._inputLayer.evaluate(output);
  output = this._hiddenLayer.evaluate(output);
  output = this._outputLayer.evaluate(output);

  return output;
};

Brain.prototype.getNeurons = function() {
  return this._neurons;
};

module.exports = Brain;
