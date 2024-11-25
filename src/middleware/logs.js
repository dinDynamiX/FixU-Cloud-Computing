const logRequest = (req, res, next) => {
  console.log('Request ke Path : ', req.path);
  next();
};

module.exports = logRequest;
