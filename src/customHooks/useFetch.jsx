import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async() => {
    try{
        const data = await axios.get(url);
        setData(data);
        setError(null);
        
    } catch(error){
        setError(error)
       

    }finally{
        setIsLoading(false)
    }   

  }

  useEffect(() => {
    getData();
  }, [])

  return {error,data,isLoading};
}
