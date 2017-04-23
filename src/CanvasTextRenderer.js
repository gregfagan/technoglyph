import React from 'react'
import CanvasRenderer from './CanvasRenderer'

export default class CanvasTextRenderer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.text !== this.props.text
  }
  
  render() {
    const { text, ...props } = this.props

    return (
      <CanvasRenderer onRender={canvas => {
        const { width, height } = canvas
        const ctx = canvas.getContext('2d')

        ctx.font = '13pt monospace'
        const textWidth = ctx.measureText(text).width
        const lineLength = Math.trunc(canvas.width / textWidth)
        const lineHeight = 17

        ctx.fillStyle = '#112211'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#44aa44'
        for (let j = 0; j < canvas.height / lineHeight; ++j) {
          for (let i = 0; i < lineLength; ++i) {
            ctx.fillText(text, textWidth * i, lineHeight * j)
          }
        }

      }} {...props} />
    )
  }
}
