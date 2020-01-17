import {LoadingManager, TextureLoader, RepeatWrapping} from 'three'

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'

const loadingManager = new LoadingManager()
const textureLoader = new TextureLoader(loadingManager)

const gltfLoader = new GLTFLoader(loadingManager)
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/static-threejs/draco/')
gltfLoader.setDRACOLoader(dracoLoader)

const onLoadCallbacks = []
const onProgressCallbacks = []

loadingManager.onLoad = () => {
  while (onLoadCallbacks.length) {
    onLoadCallbacks.shift().call()
  }
}

loadingManager.onProgress = (item, loaded, total) => {
  const _onProgressCallbacks = [...onProgressCallbacks]

  while (_onProgressCallbacks.length) {
    _onProgressCallbacks.shift()(loaded / total)
  }
}

const loadTexture = (src, callback) => {
  const texture = textureLoader.load(src, () => {
    typeof callback === 'function' && callback(texture)
  })

  texture.wrapS = texture.wrapT = RepeatWrapping

  return texture
}

const loadModelGLTF = (src) => {
  return new Promise((resolve, reject) => {
    gltfLoader.load(src, (resources) => {
      resolve(resources.scene)
    })
  })
}

const loadGLTF = async (modelSrc, diffuseSrc, normalSrc, aoSrc) => {
  const mesh = await loadModelGLTF(modelSrc)
  const diffuseMap = loadTexture(diffuseSrc)
  const normalMap = loadTexture(normalSrc)
  const aoMap = loadTexture(aoSrc)

  return {mesh, diffuseMap, normalMap, aoMap}
}

const onLoad = (callback) => {
  onLoadCallbacks.push(callback)

  window.aa = loadingManager
}

const onProgress = (callback) => {
  onProgressCallbacks.push(callback)
}

export {loadGLTF, loadTexture, onLoad, onProgress}
