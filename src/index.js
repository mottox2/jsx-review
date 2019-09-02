const testRenderer = require('react-test-renderer')
const React = require('react')

const tree = (
  <div>
    Hello <b>World</b>
  </div>
)
const json = testRenderer.create(tree).toJSON()

console.log(JSON.stringify(json, null, 2))
