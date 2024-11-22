const {createHmac, randomBytes} = require('crypto')
const jwt = require('jsonwebtoken')
function isStrongPassword(password) {

    const minLength = 8; 
    const minUppercase = 1; 
    const minLowercase = 1; 
    const minNumbers = 1; 
    const minSpecialChars = 1; 
  
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[^A-Za-z0-9]/;
    if (password.length < minLength) {
      return false;
    }
    if (
      password.match(uppercaseRegex).length < minUppercase ||
      password.match(lowercaseRegex).length < minLowercase ||
      password.match(numberRegex).length < minNumbers ||
      password.match(specialCharRegex).length < minSpecialChars
    ) {
      return false;
    }
    return true;
  }

async function createJwtToken(user){
    const payload = {
      _id: user._id,
      name:user.name,
      email:user.email,
      role:user.role,
      premium:user.premium,
    }
    const token = jwt.sign(payload, process.env.SECRETE_KEY)
    
    return token

}
async function verifyJwt(token){
     const payload = jwt.verify(token, process.env.SECRETE_KEY)
     return payload
}

module.exports = {isStrongPassword,createJwtToken, verifyJwt}

