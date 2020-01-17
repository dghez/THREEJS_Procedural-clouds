import React, {useRef, useEffect} from 'react'
import {extend, useFrame, useThree} from 'react-three-fiber'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
extend({OrbitControls})

export default () => {
  const ref = useRef()
  const {gl, camera} = useThree()

  useFrame(() => ref.current.update())

  useEffect(()=>{
    ref.current.object = camera
  }, [camera])

  return (
    <orbitControls
      ref={ref}
      args={[camera, gl.domElement]}
      enableZoom={false}
      enableDamping
      enablePan={false}
      center={[0, 0, 0]}
      dampingFactor={0.1}
      rotateSpeed={0.1}
    />
  )
}
