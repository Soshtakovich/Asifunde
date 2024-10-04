const app = require('./app'); // Import the app object from app.js
const PORT = process.env.PORT || 4000; // Define the port

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
