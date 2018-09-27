var Neuron = require('./neuron');
var Layer = require('./layer');
var Brain = require('./brain');
var Individual = require('./individual');
var Crossover = require('./crossover');
var crossover = new Crossover();

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

let individualsCount = 100;
let individuals = new Array(individualsCount);
for (let i=0; i<individualsCount; i++) {
  individuals[i] = new Individual(null, brain.getNeurons().length * 2);
}

let individualsRatio = new Array(individualsCount);

while(error > errorThreshold && iteration < 1000) {

  for (let i=0; i<individualsCount; i++) {
    var individual = individuals[i];

    // setup NN with individual DNA
    for (let n=0; n<brain.getNeurons().length; n++) {
      let weight = individual.getDna()[2*n + 0];
      let bias = individual.getDna()[2*n + 1];
      brain.getNeurons()[n].setWeight(weight).setBias(bias);
    }

    // calculate error on traingData
    error = 0.0;
    for (let s=0; s<trainData.length; s++) {
      var sample = trainData[s];    
      var output = brain.evaluate(sample.input);
      
      for (let j=0; j<output.length; j++) {
        error += Math.pow(sample.output[j] - output[j], 2.0);
      }
    }
    //error = (1.0/(trainData.length)) * Math.sqrt(error);
  
    individualsRatio[i] = error;
  }

  // peak most valuable individuals
  for (let x=0; x<individualsRatio.length; x++) {
    for (let y=0; y<individualsRatio.length; y++) {
      if (x < y && individualsRatio[x] > individualsRatio[y]) {
        let r = individualsRatio[x];
        individualsRatio[x] = individualsRatio[y];
        individualsRatio[y] = r;

        let individual = individuals[x];
        individuals[x] = individuals[y];
        individuals[y] = individual;  
      }
    }
  }

  console.log(`Error [${iteration}]: ${individualsRatio[0]}`);

  if (error > errorThreshold) {
    let childs = [];
    let crossoverRange = Math.floor(Math.sqrt(individualsCount)) + 1;
    for (let x=0; x<crossoverRange; x++) {
      for (let y=0; y<crossoverRange; y++) {
        if (x != y) {
          let child = crossover.create(individuals[x], individuals[y]);
          childs.push(child);
          if (childs.length == individualsCount)
            break;
        }
      }
    }

    for (let i=0; i<individuals.length; i++) {
      delete individuals[i];
      individuals[i] = childs[i];
    }
  }


  iteration ++;
}

if (error > errorThreshold) {
  console.log('does not converge: ' + error);
} else {
  console.log('converged: ' + error);
}

var individual = individuals[0];

// setup NN with individual DNA
for (let n=0; n<brain.getNeurons().length; n++) {
  let weight = individual.getDna()[2*n + 0];
  let bias = individual.getDna()[2*n + 1];
  brain.getNeurons()[n].setWeight(weight).setBias(bias);
}

console.log(parseFloat(brain.evaluate([0, 0])).toFixed(2));
console.log(parseFloat(brain.evaluate([1, 0])).toFixed(2));
console.log(parseFloat(brain.evaluate([0, 1])).toFixed(2));
console.log(parseFloat(brain.evaluate([1, 1])).toFixed(2));


// calculate error on traingData
error = 0.0;
for (let s=0; s<trainData.length; s++) {
  var sample = trainData[s];    
  var output = brain.evaluate(sample.input);
  
  for (let j=0; j<output.length; j++) {
    error += Math.pow(sample.output[j] - output[j], 2.0);
  }
}
console.log('Result error: ' + error);
  