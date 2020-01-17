import React, {useRef, useEffect} from 'react'
import {useThree} from 'react-three-fiber'

import {useDebugMode} from '~js/hooks'

import Controls from './Controls'

export default () => {
  const camera = useRef()
  const {size, setDefaultCamera} = useThree()
  const {width, height} = size
  const debugMode = useDebugMode()

  useEffect( () => {
    setDefaultCamera(camera.current)
  }, [])

  return (
    <>
    <perspectiveCamera
      ref={camera}
      position={[0, 0, 2]}
      args={[75, width / height, 0.1, 10]}
    />
    {debugMode && <Controls />}
    </>
  )
}
