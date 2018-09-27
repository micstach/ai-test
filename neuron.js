function Neuron(connections) {
  this._typeName = "Neuron";
  this._connections = connections;
  this._weights = [];
  this._bias = 0.0;
} 

Neuron.prototype.getWeights = function() {
  return this._weights;
}

Neuron.prototype.clearWeights = function() {
  this._weights = [];
}

Neuron.prototype.setBias = function setBias(bias) {

  this._bias = bias;
  return this;
}

Neuron.prototype.getTypeName = function getTypeName() {
  return this._typeName;
}

Neuron.prototype.getName = function getName() {
  return this._name;
}

Neuron.prototype.getConnectionsCount = function() {
  return this._connections;
};

Neuron.prototype.getWeights = function getWeights() {
  return this._weights;
}

Neuron.prototype.getBias = function getBias() {
  return this._bias;
}

Neuron.prototype.eval = function(input) {
  if (typeof input === "number") {
    input = [input];
  }

  var sum = 0.0;
  for (var i=0; i<input.length; i++) {
    sum += this._weights[i] * input[i];
  }
  sum += this._bias;
  return 1.0 / (1.0 + Math.exp(-sum));
  //return sum > 0 ? 1.0 : 0.0;
}

module.exports = Neuron;
