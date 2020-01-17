import {useMemo} from 'react'
import data from '~data'
import {get} from 'lodash'

export default function useRawData(key) {
  const response = useMemo(() => {
    return key ? get(data, key, '') : data
  }, [key])

  return response
}
