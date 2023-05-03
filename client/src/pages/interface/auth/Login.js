import React, { useContext, useState } from 'react'
import login_img from '../../../assets/cards/auth/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Api_Address from '../../../env'

const Login = () => {

    const { setAuthState } = useContext(AuthContext);

    const [phone_num, setPhoneNum] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault();

        const data = { phone_num: phone_num, password: password }

        if (!phone_num) {
            toast.error("Telefon belginizi ýazyň!")
        }
        else if (!password) {
            toast.error("Açar sözüňizi ýazyň!")
        }
        else if (password.length < 8) {
            toast.error("Açar sözüňiz 8-den uly bolmaly")
        }
        else {
            await axios.post(`${Api_Address}api/v1/auth/login`, data).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.error)
                } else {
                    localStorage.setItem("accessToken", res.data.token)
                    setAuthState({
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
                    <div className="col-xl-6">
                        <div className="half row justify-content-center align-items-center">
                            <div className="contents col-xl-5">

                                <h3>Login <span className='text-danger fw-bold h2'>Sos</span></h3>
                                <p className="my-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>

                                <form onSubmit={loginUser}>
                                    <div className="form-group first">
                                        <label htmlFor="phone_num">Phone Number</label>
                                        <div className="input-group d-flex align-items-center">
                                            <span className="" id="basic-addon1" style={{ fontSize: "20px" }}>+993 </span>
                                            <input value={phone_num} onChange={(e) => setPhoneNum(e.target.value)} type="number" min="60000000" max="65999999" name='phone_num' className="form-control ms-2" placeholder="Phone Number" id="phone_num" />
                                        </div>
                                    </div>

                                    <div className="form-group last">
                                        <label htmlFor="password">Password</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} name='password' type="password" className="form-control" placeholder="Password" id="password" />
                                    </div>

                                    <div className='my-4 h6'>
                                        I have not <Link to="/register" className='text-danger'> Registered</Link> in before
                                    </div>

                                    <div className='d-grid'>
                                        <button type="submit" value="Log In" className="btn btn-primary">Login In</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-6'>
                        <img src={login_img} alt="" className='img-fluid' style={{ objectFit: "cover", height: "100vh" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login