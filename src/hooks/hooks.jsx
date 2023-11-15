import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const fetchData = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
        console.log('fetch info',response.data)
    }
    
  console.log('in resources',resources)
  useEffect(() => {
    fetchData()
  },[baseUrl])

  const create = (resource) => {
    console.log('in create',resource)
    axios.post(baseUrl,resource).then(response=>setResources([...resources, response.data]))
    
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}