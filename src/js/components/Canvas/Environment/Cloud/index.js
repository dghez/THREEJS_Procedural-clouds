import React, {useRef, useEffect, useMemo} from 'react'
import {useFrame} from 'react-three-fiber'
import {ShaderMaterial, UniformsUtils, ShaderLib} from 'three'

import {useAssets, useTexture} from '~js/hooks'
import gui from '~js/helpers/gui'
import fragment from '~shaders/cloud.frag'
import vertex from '~shaders/cloud.vert'


export default ({size}) => {
  const group = useRef()
  const mesh = useRef()
  const [width, height] = size

  const src1 = useAssets('images/clouds/1.jpg')
  const t1 = useTexture(src1)

  const src2 = useAssets('images/clouds/2.jpg')
  const t2 = useTexture(src2)

  const myUniforms = useMemo(() => ({
    uTime: {value: 0},
    uTxtShape: {value: t1},
    uTxtCloudNoise: {value: t2},
    uFac1: {value: 17.8},
    uFac2: {value: 2.7},
    uTimeFactor1: {value: 0.002},
    uTimeFactor2: {value: 0.0015},
    uDisplStrenght1: {value: 0.04},
    uDisplStrenght2: {value: 0.08},
  }), [t1])

  const material = useMemo(() => {
    const mat = new ShaderMaterial({
      uniforms: {...UniformsUtils.clone(ShaderLib.sprite.uniforms), ...myUniforms},
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
    })

    return mat
  }, [])

  useEffect( () => {
    if (material) {
      material.uniforms.uTxtShape.value = t1
    }
  }, [t1])

  useEffect( () => {
    if (material) {
      material.uniforms.uTxtCloudNoise.value = t2
    }
  }, [t2])

  useFrame(()=> {
    if (material) {
      material.uniforms.uTime.value += 1
    }
  })

  /**
   * DAT GUI
   */
  useEffect(() => {
    if (material) {
      gui.get((gui) => {
        gui.add(material.uniforms.uFac1, 'value', 0.00001, 30).step(0.1).name('1-ScaleFactor')
        gui.add(material.uniforms.uTimeFactor1, 'value', 0.00001, 0.009).step(0.0001).name('1-TimeFactor')
        gui.add(material.uniforms.uDisplStrenght1, 'value', 0.00001, 0.3).step(0.01).name('1-Strength')
        gui.add(material.uniforms.uTimeFactor2, 'value', 0.00001, 0.009).step(0.0001).name('2-TimeFactor')
        gui.add(material.uniforms.uFac2, 'value', 0.00001, 100).name('2-ScaleFactor')
        gui.add(material.uniforms.uDisplStrenght2, 'value', 0.00001, 0.3).step(0.01).name('2-Strength')
      })
    }
  }, [material])


  return (
    <group ref={group}>
      <mesh
        ref={mesh}
        position={[0, 0.3, 0]}
        scale={[width, height, 1]}
      >
        <planeBufferGeometry
          args={[1.0, 1.0, 5, 5]}
          attach="geometry" />
        <primitive
          object={material}
          attach="material"
        />
      </mesh>
    </group>
  )
}
