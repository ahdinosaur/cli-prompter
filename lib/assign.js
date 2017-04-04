const { assign } = Object
module.exports = (values, name, value) => {
  return assign({}, values, { [name]: value })
}
