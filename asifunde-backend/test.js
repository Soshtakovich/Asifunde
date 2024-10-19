const bcrypt = require('bcrypt');

const inputPassword = '5169357e';  // Password to test
let storedHash = '$2y$10$Xq/nlHgcenOQuwAaFFrnG.0iMcZ1a9bvjRyqlXEPzAz6PzkKGYG0O';  // From database

// Replace $2y$ with $2b$ for compatibility
storedHash = storedHash.replace('$2y$', '$2b$');

bcrypt.compare(inputPassword, storedHash, (err, isMatch) => {
  if (err) {
    console.error('Error during comparison:', err);
  } else if (isMatch) {
    console.log('Password matches!');
  } else {
    console.log('Password does not match.');
  }
});
