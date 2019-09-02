import testRenderer from 'react-test-renderer'
import * as React from 'react'
import Text from './text'

const tree = (
  <div>
    Hello <b>World</b>
    <Text text="hello" isActive={true} />
  </div>
)
const json = testRenderer.create(tree).toJSON()

console.log(JSON.stringify(json, null, 2))
