import React, { useContext, useState } from 'react'
import login_img from '../../../assets/cards/auth/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Api_Address from '../../../env'

const Register = () => {

    const { setAuthState } = useContext(AuthContext);

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [phone_num, setPhoneNum] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")

    const navigate = useNavigate()

    const registerUser = async (e) => {
        e.preventDefault();

        const data = { name: name, surname: surname, phone_num: phone_num, password: password }

        if (!name) {
            toast.error("Adyňyzy ýazyň!")
        }
        else if (!surname) {
            toast.error("Familýaňyzy ýazyň!")
        }
        else if (!phone_num) {
            toast.error("Telefon belginizi ýazyň!")
        }
        else if (!password) {
            toast.error("Açar sözüňizi ýazyň!")
        }
        else if (!cPassword) {
            toast.error("Açar sözüňizi gaýtadan ýazyň!")
        }
        else if (cPassword !== password) {
            toast.error("Açar sözüňiz gabat gelenok !")
        }
        else if (password.length < 8) {
            toast.error("Açar sözüňiz 8-den uly bolmaly")
        }
        else {
            await axios.post(`${Api_Address}api/v1/auth/register`, data).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.error)
                } else {
                    localStorage.setItem("accessToken", res.data.token)
                    setAuthState({
                        name: res.data.name,
                        surname: res.data.surname,
                        phone_num: res.data.phone_num,
                        id: res.data.id,
                        status: true,
                        role: res.data.role,
                    });
                    toast.success(res.data.success)
                    navigate("/")
                    window.location.reload()
                }
            })
        }
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-xl-6'>
                        <img src={login_img} alt="" className='img-fluid' style={{ objectFit: "cover", height: "100vh" }} />
                    </div>
                    <div className="col-xl-6">
                        <div className="half row justify-content-center align-items-center">
                            <div className="contents col-xl-5">
                                <h3>Register <span className='text-danger fw-bold h2'>Sos</span></h3>
                                <p className="my-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
                                <form onSubmit={registerUser}>

                                    <div className="form-group first">
                                        <label htmlFor="name">Name</label>
                                        <input value={name} onChange={(e) => setName(e.target.value)} name='name' type="text" className="form-control" placeholder="Name" id="name" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="surname">Surname</label>
                                        <input value={surname} onChange={(e) => setSurname(e.target.value)} name='surname' type="text" className="form-control" placeholder="Surname" id="surname" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone_num">Phone Number</label>
                                        <div className="input-group d-flex align-items-center">
                                            <span className="" id="basic-addon1" style={{ fontSize: "20px" }}>+993 </span>
                                            <input value={phone_num} onChange={(e) => setPhoneNum(e.target.value)} type="number" min="60000000" max="65999999" name='phone_num' className="form-control ms-2" placeholder="Phone Number" id="phone_num" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} name='password' type="password" className="form-control" placeholder="Password" id="password" />
                                    </div>

                                    <div className="form-group last">
                                        <label htmlFor="confirm_password">Confirm Password</label>
                                        <input value={cPassword} onChange={(e) => setCPassword(e.target.value)} name='confirm_password' type="password" className="form-control" placeholder="Confirm Password" id="confirm_password" />
                                    </div>

                                    <div className='my-4 h6'>
                                        I'm <Link to="/login" className='text-danger'> Login In</Link> before
                                    </div>

                                    <div className='d-grid'>
                                        <button type="submit" value="Log In" className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register