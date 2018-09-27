function Individual(dna, dnaLength) {
    if (dna) {
        this._dna = dna;
    } else {
        this.create(dnaLength);
    }
};

Individual.prototype.create = function(dnaLength) {
    this._dna = new Array(dnaLength);
    for (let i=0; i<dnaLength; i++) {
        this._dna[i] = 50.0 * (Math.random() - 0.5); // [-50.0; 50.0]
    }
};

Individual.prototype.getDna = function() {
    return this._dna;
};

module.exports = Individual;