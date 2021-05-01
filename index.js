if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/react-drag-drop-hook.production.min.js')
  } else {
    module.exports = require('./dist/react-drag-drop-hook.development.js')
  }
  