import React from 'react'
import {Canvas} from 'react-three-fiber'

import {useDebugMode} from '~js/hooks'

export default ({children}) => {
  return (
    <div className="root">
      <Canvas
        camera={{position: [0, 1, 3]}}
      >
        {children}
      </Canvas>

      <style jsx>{`
        .root {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}
