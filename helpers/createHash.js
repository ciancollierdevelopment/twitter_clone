const crypto = require('crypto');

const createHash = (data) => {
  let hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
};

module.exports = createHash;
