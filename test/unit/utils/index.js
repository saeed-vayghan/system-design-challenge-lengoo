'use strict';

const { expect } = require('chai');

const hash          = require('../../../app/plugins/utils/hash');
const sanitize      = require('../../../app/plugins/utils/sanitizer');
const levenshtein   = require('../../../app/plugins/utils/levenshtein');
const validateEmail = require('../../../app/plugins/utils/validateEmail');
const { alphaGen, tokenGen } = require('../../../app/plugins/utils/randomString');


describe('#Testing Utilities', function() {
  it('should return a correct hash for a specific input', async function() {
    const hashedData = hash('input');

    expect(hashedData).to.not.equal(null);
    expect(hashedData.length).to.be.gt(0);
  });

  it('should return a sanitized query', async function() {
    const query = { $gt: 25 };
    const sanitized = sanitize(query);

    expect(sanitized).to.be.deep.equal({});

    expect(Object.keys(sanitize({ $gt: 5 })).length).to.be.equal(0);
    expect(Object.keys(sanitize({ $gt: 5, a: 1 })).length).to.be.equal(1);
  });

  it('should test the implementation of Levenshtein Distance', async function() {
    expect(levenshtein('', '').distance).to.be.equal(0);
    expect(levenshtein('fast', '').distance).to.be.equal(4);
    expect(levenshtein('', 'faster').distance).to.be.equal(6);
    expect(levenshtein('fast', 'faster').distance).to.be.equal(2);
    expect(levenshtein('meilenstein', 'levenshtein').distance).to.be.equal(4);

    const a = 'In the modern era, software is commonly delivered as a service: called web apps, or software-as-a-service. The twelve-factor app is a methodology for building software-as-a-service apps that:';
    const b = 'The contributors to this document have been directly involved in the development and deployment of hundreds of apps, and indirectly witnessed the development, operation, and scaling of hundreds of thousands of apps via our work on the Heroku platform.';
    
    expect(levenshtein(a, b).distance).to.be.equal(189);
  });

  it('should check the correctness of an email address', async function() {
    const isValid    = validateEmail('saeed@domain.com');
    const isNotValid = validateEmail('saeed@domain');

    expect(isValid).to.be.equal(true);
    expect(isNotValid).to.be.equal(false);
  });

  it('should check the functionality of alphaGen and tokenGen utilities', async function() {
    const salt  = alphaGen.generate(8);
    const token = tokenGen.generate(24);

    expect(salt).to.not.equal(null);
    expect(salt.length).to.equal(8);

    expect(token).to.not.equal(null);
    expect(token.length).to.equal(24);
  });
});