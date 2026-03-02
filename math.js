// This file is a module — it does one job
function add(a, b) {
  return a + b
}

function multiply(a, b) {
  return a * b
}

function greet(name) {
  return `Hello, ${name}! Welcome to the backend.`
}

// We CHOOSE what to share. Anything not here stays private to this file.
module.exports = { add, multiply, greet }