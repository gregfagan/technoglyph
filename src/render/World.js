import React from 'react'
import ReactDOM from 'react-dom'
import React3 from 'react-three-renderer'
import * as three from 'three'

import { rotations, updateUVs } from './dodecahedron'

function createCanvas(resolution) {
  const canvas = document.createElement('canvas')
  canvas.width = resolution
  canvas.height = resolution
  return canvas
}

export default class World extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.cameraPosition = new three.Vector3(0, 0, 5)
    this.lightPosition = new three.Vector3(0, 0, 15)
    this.lightLookAt = new three.Vector3(0, 0, 0)

    this.canvases = [...Array(12).keys()].map(i => createCanvas(512))
    this.textures = this.canvases.map(c => new three.CanvasTexture(c))
    this.materials = this.textures.map(t => new three.MeshPhongMaterial({
      map: t,
      shading: three.FlatShading,
    }))

    this.handleCanvasRender = this.handleCanvasRender.bind(this)

    window.addEventListener('resize', () => this.forceUpdate())
  }

  componentDidMount() {
    const geometry = new three.DodecahedronGeometry()
    updateUVs(geometry)

    const mesh = new three.Mesh(geometry, this.materials)
    this.refs.mount.add(mesh)
  }

  handleCanvasRender(index) {
    this.textures[index].needsUpdate = true
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight

    const {
      currentSector = 0,
      children,
    } = this.props

    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={20}
            aspect={width/height}
            near={0.1}
            far={1000}
            position={this.cameraPosition}
          />
          <ambientLight intensity={0.2} />
          <directionalLight
            position={this.lightPosition}
            lookAt={this.lightLookAt}
          />
          <group quaternion={rotations[currentSector]} ref='mount' />
          { React.Children.map(children, (child, i) => (
            React.cloneElement(child, {
              key: i,
              id: i,
              canvas: this.canvases[i],
              didRender: this.handleCanvasRender
            })
          ))}
        </scene>
      </React3>
    )
  }
}
