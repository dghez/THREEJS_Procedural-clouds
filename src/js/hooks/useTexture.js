import {useState, useEffect} from 'react'
import {Texture} from 'three'

import {loadTexture} from '~js/helpers/loadingManager'

export default function useTexture(src) {
  const [texture, setTexture] = useState(new Texture())

  useEffect(()=> {
    loadTexture(src, setTexture)
  }, [])

  return texture
}
