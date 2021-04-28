function errorHandler(err, req, res, next){
  console.log('masuk error handler')
  console.log(err.name)
  console.log(err)
  switch (err.name) {
    case 'SequelizeValidationError':
      let response = []
      err.errors.forEach(el => {
        response.push(el.message)
      })
      res.status(400).json({ msg: response })
      break;
    case 'SequelizeDatabaseError':
      res.status(400).json(err.message)
      break;
    case 'BadRequest':
      res.status(err.status).json({ msg: err.msg })
      break;
    case 'Unauthorized':
      res.status(err.status).json({ msg: err.msg })
      break;
    case 'NotFound':
      res.status(err.status).json({ msg: err.msg })
      break;
    default: 
      res.status(500).json({msg: 'Internal Server Error'})
      break;
  }
}

module.exports = { errorHandler }