import React, { Component } from 'react'
import Annotation, { compose, withAnnotationEditor } from '../lib'
import { withRectangleSelector } from '../lib/selectors'

import Root from './components/Root'
import { Content, Editor, FancyRect, Rect, Point } from './components/Annotation'

import img from './img.jpeg'

export default compose (
  withAnnotationEditor(),
  withRectangleSelector()
)(class App extends Component {
  state = {
    annotations: [
      {
        geometry:
          {
            x: 25,
            y: 31,
            width: 21,
            height: 35
          },
          data: {
            text: 'Red',
            id: 1
          }
      }
    ]
  }

  onSubmit = () => {
    const { geometry, data } = this.props.annotation

    this.setState({
      annotations: this.state.annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      })
    })

    this.props.annotation.clearState()
  }

  render () {
    const { props } = this

    return (
      <Root>
        <h1>React Annotation</h1>
        <Annotation
          src={img}
          alt='Two pebbles anthropomorphized holding hands'
          containerRef={props.annotation.containerRef}

          annotations={this.state.annotations}

          selectorHandlers={props.selector}

          showSelector={!!props.annotation.geometry}
          renderSelector={() => (
            <FancyRect
              geometry={props.annotation.geometry}
            />
          )}

          showEditor={!!props.annotation.showEditor}
          renderEditor={() => (
            <Editor
              data={props.annotation.data}
              geometry={props.annotation.geometry}

              onChange={props.annotation.setData}
              onSubmit={this.onSubmit}
            />
          )}

          renderHighlight={Rect}
          renderContent={Content}
        />
      </Root>
    )
  }
})
