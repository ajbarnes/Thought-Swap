module.exports = {
  // Uniform distribution selector
  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  }
}
