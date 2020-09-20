'use strict';

const { expect } = require('chai')

const hash     = require('../../../app/plugins/utils/hash')
const sanitize = require('../../../app/plugins/utils/sanitizer')



describe('#Testing Utilities', function() {
  it('should return a correct hash for a specific input', async function() {
    const hashedData = hash('input')

    expect(hashedData).to.not.equal(null)
    expect(hashedData.length).to.be.gt(0)
  });

  it('should return a sanitized query', async function() {
    const query = { $gt: 25 }
    const sanitized = sanitize(query)

    expect(sanitized).to.be.deep.equal({})

    expect(Object.keys(sanitize({ $gt: 5 })).length).to.be.equal(0);
    expect(Object.keys(sanitize({ $gt: 5, a: 1 })).length).to.be.equal(1);
  });
});