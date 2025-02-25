import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
// import Loader from '../../components/user/Loader/Loader';
import ErrorsPage from '../../pages/user/errorsPage/ErrorsPage';
import Spinner from 'react-bootstrap/Spinner';



export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUser();
    }, [])
    const getUser = async () => {

        setIsLoading(true);
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            setUser(null);
            setIsLoading(false);
            return;
        }
        try {
            const data = await axios.get(`${import.meta.env.VITE_BURL}/user/profile`, {
                headers: {
                    Authorization: `Tariq__${userToken}`
                }
            });
            setError(null);
            setUser(data.data.user);
        } catch (error) {
            setError(error)
            setUser(null)


        } finally {
            setIsLoading(false)
        }

    }

    if(isLoading) {
        return (<section className="loader d-flex align-items-center justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            </section>)
    }
    if(error) {
        return <ErrorsPage errorMessage={error.message}/>
    }


    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
};

export default UserContextProvider;