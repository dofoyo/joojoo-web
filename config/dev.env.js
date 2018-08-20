'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //API_ROOT: '"http://localhost:8081/"'
  API_ROOT: '"http://118.24.162.174/"'
})
