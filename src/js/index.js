import 'normalize.css'
import '~css/fonts.css'
import '~css/main.css'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React, {useEffect} from 'react'
import {render} from 'react-dom'

import gui from '~js/helpers/gui'
import {useDebugMode} from '~js/hooks'

import Canvas from '~js/components/Canvas'
import Camera from '~js/components/Canvas/Camera'
import Sphere from '~js/components/Canvas/Sphere'
import Environment from '~js/components/Canvas/Environment'
import Credits from '~js/components/UI/Credits'

/**
 * app
 */
const App = () => {
  const debugMode = useDebugMode()

  useEffect(() => {
    gui.init()
  }, [])

  return (
    <>
      <Credits />
      <Canvas>
        <Camera />
        <Environment />
        {debugMode && <Sphere />}
      </Canvas>
    </>
  )
}

/**
 * render app
 */
render(
  <App />,
  document.getElementById('app')
)
