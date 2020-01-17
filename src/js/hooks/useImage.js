import {useState, useEffect} from 'react'

export default (src) => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    const image = new Image()

    image.src = src

    image.onload = () => setImage(image)
  }, [src])

  return image
}
