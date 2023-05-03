import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Api_Address from '../../../env'
import axios from 'axios'
import { toast } from 'react-toastify'


const AdminComments = () => {

    const { darkMode } = useContext(ThemeContext)

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}api/v1/contact`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then((res) => {
                setContacts(res.data.contacts)
            })
        }
        fetchData()
    }, [])

    const handleDelete = async (id) => {
        await axios.delete(`${Api_Address}api/v1/contact/delete/` + id, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((res) => {
                toast.success(res.data.success)
                const del = contacts.filter(contacts => id !== contacts.id)
                setContacts(del)
            }).catch((error) => {
                toast.error(error.message)
            });
    }

    return (
        <div style={{ height: "88.7vh" }}>
            <div className='card border-0 shadow my-5'>
                <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                    <div className='row align-items-center'>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                            <div className={`h5 d-flex align-items-center text-decoration-none ${darkMode ? "text-white" : "text-dark"}`}>
                                <div>Comments ({contacts.length})</div>
                            </div>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-6 d-flex justify-content-end'>
                            <input className="form-control form-control-sm" type="text" placeholder="Search..." />
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-6 d-flex justify-content-end'>
                            <select className={`form-select form-select-sm select-month me-2 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                                <option defaultValue>All followers</option>
                                <option>Concert Choir</option>
                                <option>Clubchem</option>
                                <option>Chamber Music Society</option>
                                <option>Alpha Chi Omega</option>
                                <option>Alpine Ski Club</option>
                                <option>Career Club</option>
                                <option>Musical Club</option>
                                <option>Asymptones</option>
                                <option>Clubchem</option>
                                <option>Brain Trust</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`card-body p-3 ${darkMode ? "bg-dark-blue text-white" : ""}`}>
                    <div className='row justify-content-center aling-items-center'>
                        <div className='col-xl-12'>
                            <table className="table table-striped">
                                <thead>
                                    <tr className={`${darkMode ? "text-white" : null}`}>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Comment</th>
                                        <th scope="col">Setting</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contacts.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((contact, index) => (
                                            <tr key={index}>
                                                <th className={`${darkMode ? "text-white" : null}`} scope="row">{index + 1}</th>
                                                <td className={`${darkMode ? "text-white" : null}`}>{contact.name}</td>
                                                <td className={`${darkMode ? "text-white" : null}`}>{contact.email}</td>
                                                <td className={`${darkMode ? "text-white" : null}`}>{contact.subject}</td>
                                                <td className={`${darkMode ? "text-white" : null}`}>{contact.comment}</td>
                                                <td className='d-flex justify-content-around align-items-center py-5'>
                                                    <button className='btn btn-outline-danger' onClick={() => handleDelete(contact.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminComments