function Neuron(name) {
  this._name = name
  this._typeName = "Neuron";
  this._weight = 0.0;
  this._bias = Math.random() * 0.2 - 0.1;
} 

Neuron.prototype.setWeight = function setWeight(weight) {
  this._weight = weight;
  return this;
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

Neuron.prototype.getWeight = function getWeight() {
  return this._weight;
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
    sum += this._weight * input[i] + this._bias;
  }
  
  sum *= (1.0 / input.length);

  return sum;
}

module.exports = Neuron;
