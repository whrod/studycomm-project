const asyncWrap = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

const globalErrorHandler = (error, req, res, next) => {
  console.error(error.stack);
  error.statusCode || 500;
  res.status(error.statusCode).json({ message: error.message });
};

module.exports = {
  asyncWrap,
  globalErrorHandler,
};
