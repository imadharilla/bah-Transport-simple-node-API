exports.catchAsync = handler => (...args) => handler(...args).catch(args[2])

exports.genericErrorHandler = (err, req, res, next) => {
  const { status, message, ...others } = err
  // if(irr instanceof Yser)
}
