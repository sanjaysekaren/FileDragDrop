const path = require('path')
const resolveFrom = require('resolve-from')

const fixLinkedDependencies = config => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      react$: resolveFrom(path.resolve('node_modules'), 'react'),
      'react-dom$': resolveFrom(path.resolve('node_modules'), 'react-dom'),
    },
  }
  return config
}

const includeSrcDirectory = config => {
  const scopePluginIndex = config.resolve.plugins.findIndex(
    ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
  )

  config.resolve.plugins.splice(scopePluginIndex, 1)
  return config
}

module.exports = [
  ['use-babel-config', '.babelrc'],
  ['use-eslint-config', '.eslintrc'],
  fixLinkedDependencies,
  includeSrcDirectory,
]
