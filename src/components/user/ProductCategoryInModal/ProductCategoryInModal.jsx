import React, { useEffect, useState } from 'react'
import ErrorsPage from '../../../pages/user/errorsPage/ErrorsPage';
import axios from 'axios';

export default function ProductCategoryInModal({categoryId}) {
    const [categoryName, setCategoryName] = useState("");
    const [isLaoding, setIsLaoding] = useState(true);
    const [error, setError] = useState(null);
    
   
    
    const getCategoryName = async() =>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_BURL}/Customer/categories/${categoryId}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                }
            })
            if(response.status === 200){
                setError(null);
                setCategoryName(response.data.category.name);

            }
        }catch(err){
            console.log(err);
            setError(err);
        }finally{
            setIsLaoding(false);
        }
  }
  useEffect(()=>{
    getCategoryName();
  },[])


  if(isLaoding) {
    return <span>&nbsp;	Loading...</span>
    
}

if(error) {
    return <ErrorsPage errorMessage={error.message}/>;
}
    return categoryName;
}
