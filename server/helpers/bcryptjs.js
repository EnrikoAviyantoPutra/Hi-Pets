const bcrypt = require('bcryptjs')

function hashPassword(userPassword){
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(userPassword, salt)
  return hash
}

function comparePassword(userPassword, hashedPassword){
  const isMatch = bcrypt.compareSync(userPassword, hashedPassword)
  return isMatch
}



module.exports = {
  hashPassword,
  comparePassword
}