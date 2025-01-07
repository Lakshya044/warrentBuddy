const bcrypt = require('bcryptjs');

const plainPassword = "dont_look_here_you_get_nothing"; 
const saltRounds = 10; //KAKALI MAP OP in the database

bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed Password:", hashedPassword);
  }
});
