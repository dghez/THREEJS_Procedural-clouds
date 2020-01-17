import React from 'react'
import {map} from 'lodash'

const positions = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
]

const Sphere = ({position}) => {
  return (
    <mesh
      position={position}
    >
      <sphereBufferGeometry
        attach="geometry"
        args={[0.05, 20, 20]}
      />
      <meshLambertMaterial
        attach="material"
        color={0xfcba03}
      />
    </mesh>
  )
}

export default () => {
  const sphereMeshes = map(positions, (el, i) => {
    return <Sphere
      position={el}
      key={i} />
  })

  return (
    <>
      {sphereMeshes}

      <directionalLight
        position={[0, 2, 3]}
        intensity={0.2}
      />
      <ambientLight />
    </>
  )
}
