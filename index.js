if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/file-drag-drop.production.min.js')
  } else {
    module.exports = require('./dist/file-drag-drop.development.js')
  }
  