import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const User = () => {
    const { id } = useParams();

    const [user, SetUser] = useState({})

    const fetchUser = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            console.log(response.data);
            SetUser(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        fetchUser()

    }, [])

    return (
        <div className='flex flex-wrap-reverse gap-8 my-20 justify-center mx-10'>
            <div className="flex flex-col gap-4 max-w-sm">
                <h2 className='text-3xl'>User Details</h2>
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
                <p>Phone: {user?.phone?.split('x')?.shift()}</p>
            </div>
            <div>
                <img src="https://source.unsplash.com/random/300x300/?profile" className='h-[180px] w-[180px] object-cover rounded-full shadow-md' alt="image" />
            </div>

        </div>
    )
}

export default User
