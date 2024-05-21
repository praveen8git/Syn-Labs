import axios from 'axios';
import { Eye, Pencil, Trash2, UserRoundPlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Modal } from 'react-responsive-modal';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  // create and edit user modal
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editUser, setEditUser] = useState({});

  const onOpenCreateModal = () => setOpenCreate(true);
  const onOpenEditModal = (userObj) => {
    setEditUser(userObj)
    setOpenEdit(true)
  };
  const onCloseModal = () => {
    setOpenCreate(false)
    setOpenEdit(false)
  };

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {
      name,
      phone,
      email
    }

    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", formData)
      
        console.log(response.data, "Added");
        onCloseModal()
        toast('User Added!', {
          style: {
            color: 'green',
          },
        })

    } catch (error) {
      console.error(error)
    }

  }
  // handle edit
  const handleEdit = async (e) => {
    e.preventDefault();

    let formData = {
      name: editUser.name,
      phone: editUser.phone,
      email: editUser.email
    }

    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, formData)
      
        console.log(response.data, "Edited");
        onCloseModal()
        toast('User Edited!', {
          style: {
            color: 'green',
          },
        })

    } catch (error) {
      console.error(error)
    }

  }


  // fetch and display data
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      console.log(response.data, "fetchUsers");
      // toast('User Loaded!')
      setUsers(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      console.log(response.data, "deleteUser");
      setUsers((prevUsers => prevUsers.filter((prevUser) => prevUser.id !== id)))
      toast('User Delete!', {
        style: {
          color: 'red',
        },
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <>
      <div className='flex justify-center w-full min-h-svh bg-neutral-100 py-8'>
        <div className="flex flex-col w-full mx-8 lg:max-w-2xl">
          <div className="flex gap-4 items-center justify-end w-full mb-4 px-4">
            <h1 className='text-lg'>Add User</h1>
            <div
              onClick={onOpenCreateModal}
              className='p-4 rounded-full shadow bg-white text-blue-500 cursor-pointer'>
              <UserRoundPlus absoluteStrokeWidth />
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}  className="bg-white border-b  hover:bg-gray-50">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                          {user.name}
                        </th>
                        <td className="px-6 py-4">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          {user.phone.split('x').shift()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-2">
                            <Eye 
                              onClick={()=> navigate(`/user/${user.id}`)}
                              absoluteStrokeWidth strokeWidth={1.25} size={18} 
                              className='hover:text-blue-500 cursor-pointer' />
                            <Pencil
                              onClick={() => onOpenEditModal({...user})}
                              absoluteStrokeWidth strokeWidth={1.25} size={18}
                              className='hover:text-green-500 cursor-pointer' />
                            <Trash2
                              onClick={() => deleteUser(user.id)}
                              absoluteStrokeWidth strokeWidth={1.25} size={18}
                              className='hover:text-rose-500 cursor-pointer' />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No Users</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>
      {/* create new user modal */}
      <Modal open={openCreate} onClose={onCloseModal} center>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-auto my-10 p-4 shadow-sm md:w-[500px]'>
          <h1 className="text-center text-2xl">Add new user</h1>

          {/* <div className='flex flex-wrap'> */}
          <label htmlFor="firstName">Name:</label>
          <input className="p-2 w-full bg-neutral-100 border rounded"
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setName(e.target.value)}
            required />

          {/* </div> */}

          <label htmlFor="phone">Phone:</label>
          <input className="p-2 w-full bg-neutral-100 border rounded"
            type="tel"
            name="phone"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            required />

          <label htmlFor="email">Email:</label>
          <input className="p-2 w-full bg-neutral-100 border rounded"
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required />

          <button className='p-2 w-full rounded bg-black text-white hover:bg-black/80' type="submit">Add</button>

        </form>
      </Modal>
      {/* create new user modal */}
      <Modal open={openEdit} onClose={onCloseModal} center>
        <form onSubmit={handleEdit} className='flex flex-col gap-4 mx-auto my-10 p-4 shadow-sm md:w-[500px]'>
          <h1 className="text-center text-2xl">Edit user</h1>

          {/* <div className='flex flex-wrap'> */}
          <label htmlFor="firstName">Name:</label>
          <input className="p-2 w-full bg-neutral-100 border rounded"
            type="text"
            name="firstName"
            id="firstName"
            value={editUser?.name}
            onChange={(e) => setEditUser(prev => {
              return {...prev, name: e.target.value}
            })}
            required />

          {/* </div> */}

          <label htmlFor="phone">Phone:</label>
          <input className="p-2 w-full bg-neutral-100 border rounded"
            type="tel"
            name="phone"
            id="phone"
            value={editUser?.phone?.split('x').shift()}
            onChange={(e) => setEditUser(prev => {
              return {...prev, phone: e.target.value}
            })}
            required />

          <label htmlFor="email">Email:</label>
          <input className="p-2 w-full bg-neutral-100 border rounded"
            type="email"
            name="email"
            id="email"
            value={editUser?.email}
            onChange={(e) => setEditUser(prev => {
              return {...prev, email: e.target.value}
            })}
            required />

          <button className='p-2 w-full rounded bg-black text-white hover:bg-black/80' type="submit">Edit</button>

        </form>
      </Modal>
    </>
  )
}

export default Home
