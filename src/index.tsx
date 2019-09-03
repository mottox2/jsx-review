import testRenderer, { ReactTestRendererJSON } from 'react-test-renderer'
import * as React from 'react'

const Image: React.FC<{
  src: string
  alt: string
  scale?: number
}> = props => {
  return <img {...props} />
}

const ImageRef: React.FC<{
  id: string
}> = props => {
  return <imageRef {...props} />
}

const Paragraph: React.FC = ({ children }) => {
  return <paragraph>{children}</paragraph>
}

const tree = (
  <document>
    <h1>Hello World</h1>
    <Paragraph>
      こんにちは
      <b>太字にも対応しています。</b>
      画像の注釈もこのとおり　
      <ImageRef id="image1" />
    </Paragraph>
    <Image src="image1" alt="画像の説明" />
    <h2>aaaa</h2>
    <Paragraph>
      こんにちは
      <b>太字にも対応しています。</b>
      画像の注釈もこのとおり　
      <ImageRef id="image1" />
    </Paragraph>
  </document>
)
const json = testRenderer.create(tree).toJSON()

console.log(JSON.stringify(json, null, 2))

const render = (tree: ReactTestRendererJSON): string => {
  const { type, props, children } = tree
  switch (type) {
    // blocks
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
      if (!children) {
        return ''
      }
      const level = Number(type.replace('h', ''))
      const innerText = children
        .map(child => (typeof child === 'string' ? child : render(child)))
        .join('')
      return `${'='.repeat(level)} ${innerText}` + '\n'
    case 'document':
      return children
        ? children.map(child => (typeof child === 'string' ? child : render(child))).join('\n') +
            '\n'
        : ''
    case 'paragraph':
      return children
        ? children.map(child => (typeof child === 'string' ? child : render(child))).join('') + '\n'
        : ''
    case 'img':
      if (children) {
        throw 'image has invalid children'
      }
      const { src, alt, scale } = props
      return (
        ['//image', `[${src}]`, `[${alt}]`, scale && `[scale=${scale}]`].filter(a => a).join('') +
        '\n'
      )
    // inline
    case 'b':
      return `@<b>{${children!.join('')}}`
    case 'imageRef':
      return `@<img>{${props.id}}`
    default:
      return ''
  }
}

console.log(render(json!))
