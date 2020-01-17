import React, {useRef, useMemo} from 'react'
import {BackSide, Color} from 'three'
import {useRawData} from '~js/hooks'

import vertex from '~shaders/default.vert'
import fragment from '~shaders/environment.frag'

export default () => {
  const mesh = useRef()
  const colorSteps = useRawData('colors.gradients')
  const radius = 8

  const uniforms = useMemo(() => {
    return {
      uTopColor: {value: new Color(colorSteps[0].top)},
      uBottomColor: {value: new Color(colorSteps[0].bottom)},
      uSpot1Color: {value: new Color(colorSteps[0].spot1)},
      uSpot1Position: {value: [0.4, 0.7]},
      uSpot2Color: {value: new Color(colorSteps[0].spot2)},
      uSpot2Position: {value: [0.6, 0.4]},
    }
  }, [])

  return (
    <>
    <mesh
      ref={mesh}
      rotation={[0, 0, 0.12]}
    >
      <sphereBufferGeometry
        attach="geometry"
        args={[radius, 30, 30]} />
      <shaderMaterial
        args={[{
          uniforms: uniforms,
          vertexShader: vertex,
          fragmentShader: fragment,
        }]}
        side={BackSide}
        attach="material"
      />
    </mesh>
    </>
  )
}
