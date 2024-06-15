import { useEffect } from 'react'
import axios from "axios"

export default function P2() {
    const getUser = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/auth/login/success`, {
                withCredentials: true
            })
        } catch (error) {
        }
    }
    const logout = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/auth/logout`, {
                withCredentials: true
            })
        } catch (error) {
        }
    }
    useEffect(() => {
        getUser()
    }, [])

    
    return (
        <>
            
                    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                        kkkl
                    </div>
                    <button onClick={logout}>logout</button>
                    <div className='flex justify-center mt-12'>
                    </div>
        </>
    )
}