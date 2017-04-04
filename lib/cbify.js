module.exports = function cbify (promise) {
  return cb => {
    promise
    .then(value => cb(null, value))
    .catch(cb)
  }
}
