var Neuron = require('./neuron');

function Layer(size, connectionsCount) {
  this._neurons = [];

  for (var i=0; i<size; i++) {
    this._neurons.push(new Neuron(connectionsCount));
  }
}

Layer.prototype.getNeurons = function() {
  return this._neurons;
}

Layer.prototype.evaluate = function(input, firstLayer) {
  var output = [];

  if (firstLayer) {
    for (var i=0; i<this._neurons.length; i++) {
      var neuron = this._neurons[i];
      var value = neuron.eval(input[i]);
      output.push(value);
    }
  } else {
    for (var i=0; i<this._neurons.length; i++) {
      var neuron = this._neurons[i];
      var value = neuron.eval(input);
      output.push(value);
    }
  }
  return output;
}

module.exports = Layer;