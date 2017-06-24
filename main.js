var Neuron = require('./neuron');
var Layer = require('./layer');
var Brain = require('./brain');

var trainData = [
  {
    input: [0, 1, 1, 1, 0,
            1, 1, 0, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 0, 1, 1,
            0, 1, 1, 1, 0,
    ], output: [1]
  },
  {
    input: [1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
    ], output: [1]
  },
  {
    input: [1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
    ], output: [1]
  },
  {
    input: [1, 0, 1, 0, 1,
            0, 1, 0, 1, 0,
            1, 0, 1, 0, 1,
            0, 1, 0, 1, 0,
            1, 0, 1, 0, 1,
            0, 1, 0, 1, 0,
            1, 0, 1, 0, 1,
    ], output: [0]
  },
  {
    input: [0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
    ], output: [0]}
];

var brain = new Brain(trainData[0].input.length, 4, trainData[0].output.length);

var error = 1.0;
var errorThreshold = 0.0001;
var iteration = 0 ;
var setupMin = null;//[{"weight":-16.862421175102533,"bias":-40.00156570922802},{"weight":0.5005439001594865,"bias":18.567070118969195},{"weight":-24.254949212032535,"bias":31.70850605126473},{"weight":28.059125583411113,"bias":-36.89327746821889},{"weight":21.433543515772747,"bias":35.328439733329624},{"weight":-10.688032266341283,"bias":39.5555376968145},{"weight":-1.495689408095728,"bias":-33.06095218054161},{"weight":24.866521668124935,"bias":-0.44458814539315294},{"weight":-25.918070774810975,"bias":14.058712013927828},{"weight":26.589558735505257,"bias":35.267980238854214},{"weight":16.37508174391805,"bias":10.657868139445501},{"weight":-2.3715282448788098,"bias":-28.094235450861966},{"weight":-15.279812199196481,"bias":25.70637604362232},{"weight":-0.7818339982422234,"bias":-1.3735486248054267},{"weight":-19.020204565952465,"bias":30.753854589425355},{"weight":6.586014782378352,"bias":-41.16092743266415},{"weight":-5.673035002335849,"bias":40.30703138542095},{"weight":-4.17347864061922,"bias":-0.24627926949293086},{"weight":15.673589055313691,"bias":-3.146809874698262},{"weight":19.053430757831162,"bias":-27.895242627602205},{"weight":0.14133864689214323,"bias":25.103825704416536},{"weight":-15.355365622495105,"bias":6.556100311454805},{"weight":16.905702687087317,"bias":-35.38220089199871},{"weight":-18.952242275511313,"bias":14.938520534632818},{"weight":-12.387488497872928,"bias":-2.9935270397712355},{"weight":16.88796721786722,"bias":-23.264839448517783},{"weight":23.11691821477544,"bias":7.297304954833327},{"weight":-8.022912439247666,"bias":-20.101888800878253},{"weight":26.820813287396977,"bias":-4.805981320681301},{"weight":-4.976047201514132,"bias":-23.90017976177155},{"weight":25.511989620227094,"bias":36.17262465764098},{"weight":-15.581576639193624,"bias":37.417738693276725},{"weight":25.392422503703422,"bias":-21.777757629547022},{"weight":-26.589270028365114,"bias":31.420399224651433},{"weight":8.744719138202962,"bias":-32.12976647253334},{"weight":-3.6000891797964067,"bias":-21.708511566187056},{"weight":0.08170229049892137,"bias":-34.73400128651094},{"weight":-6.462472445171774,"bias":39.670060280909226},{"weight":-5.747599705804627,"bias":23.617794622141528},{"weight":-22.073732441871478,"bias":19.531544275860128},{"weight":20.966921157266064,"bias":-40.29921419056325},{"weight":-2.374223950133052,"bias":-21.429749511146625},{"weight":-10.665927821918027,"bias":-41.24052784577856},{"weight":1.6438878423367427,"bias":-29.014885449586},{"weight":-18.693005851882347,"bias":29.139348288154533}]
var setupGradient = null;
var learningRate = 0.0001;

if (!setupMin) {
  while(error > errorThreshold && iteration < 1000000) {
    
    var setup = [];

    if (setupMin === null || setupGradient === null || error > learningRate ) {
      var scaleWeight = Math.random() * 50.0;
      var scaleBias = Math.random() * 50.0;
      for (var n=0; n<brain.getNeurons().length; n++) {
        setup.push({
          weight: scaleWeight * (Math.random() * 2.0 - 1.0), 
          bias: scaleBias * (Math.random() * 2.0 - 1.0)
        });
      }
    } else {
      for (var n=0; n<brain.getNeurons().length; n++) {
        setup.push({
          weight: setupMin[n].weight - setupGradient[n].weight,
          bias: setupMin[n].bias - setupGradient[n].bias
        });
      }
    }

    for (var n=0; n<brain.getNeurons().length; n++){
      brain.getNeurons()[n].setWeight(setup[n].weight).setBias(setup[n].bias);
    }

    var setupError = .0;

    for (var s=0; s<trainData.length; s++) {
      var sample = trainData[s];    
      var output = brain.evaluate(sample.input);
      
      for (var j=0; j<output.length; j++) {
        setupError += Math.pow(sample.output[j] - output[j], 2.0);
      }
    }

    setupError *= 1.0/(1.0 * brain.getNeurons().length);

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
}

if (error > errorThreshold) {
  console.log('does not converge: ' + error);
} else {
  console.log('converge: ' + error);
}

if (setupMin) {
  console.log('Setup: ' + JSON.stringify(setupMin));
  for (var n=0; n<brain.getNeurons().length; n++){
    brain.getNeurons()[n].setWeight(setupMin[n].weight).setBias(setupMin[n].bias);
  }

  console.log(brain.evaluate([
    1, 0, 1, 0, 1,
    0, 0, 0, 0, 0,
    1, 0, 1, 0, 1,
    0, 0, 0, 0, 0,
    1, 0, 1, 0, 1,
    0, 0, 0, 0, 0,
    1, 0, 1, 0, 1,
    ]));
}
