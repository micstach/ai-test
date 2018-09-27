var Individual = require('./individual');

function Crossover() {
};

// a, b - individuals (parents)
Crossover.prototype.create = function(a, b) {
    if (a.getDna().length === b.getDna().length) {
        // crossover
        let crossoverIdx = Math.floor(a.getDna().length / 2.0);
        let childDna = new Array(a.getDna().length);
        for (let i=0; i<childDna.length; i++) {
            if (i < crossoverIdx) {
                childDna[i] = a.getDna()[i];
            } else {
                childDna[i] = b.getDna()[i];
            }
        }
        // mutation
        let mutationIdx = Math.floor(Math.random() * childDna.length);
        childDna[mutationIdx] = 50.0 * (Math.random() - 0.5); // [-50.0; 50.0]

        return new Individual(childDna);
    } else {
        return null;
    }
};

module.exports = Crossover;