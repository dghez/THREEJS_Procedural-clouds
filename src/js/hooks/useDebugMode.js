import {useState, useEffect} from 'react'
import {get} from 'lodash'

function parseQueryString(url) {
  const vars = {}

  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value
  })

  return vars
}

export default function useDebugMode() {
  const [debugMode, setDebugMode] = useState(false)
  const {search} = window.location

  useEffect(() => {
    const parsed = parseQueryString(search)

    setDebugMode(get(parsed, 'debug') === 'true')
  }, [location])

  return debugMode
}
