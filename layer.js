var Neuron = require('./neuron');

function Layer(size) {
  this._neurons = [];

  for (var i=0; i<size; i++) {
    this._neurons.push(new Neuron());
  }
}

Layer.prototype.getNeurons = function() {
  return this._neurons;
}

Layer.prototype.evaluate = function(input) {
  var output = [];

  if (this._neurons.length > 0) {
    for (var i=0; i<this._neurons.length; i++) {
      var neuron = this._neurons[i];
      var value = neuron.eval(input);
      output.push(value);
    }
  } else {
    output = Array(input.length);
    for (var i=0; i<input.length; i++){
      output[i] = input[i];
    }
  }
  return output;
}

module.exports = Layer;