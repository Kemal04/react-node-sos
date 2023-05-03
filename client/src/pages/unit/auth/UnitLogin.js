import React, { useContext, useState } from 'react'
import styles from './login.module.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AuthContext } from '../../../context/AuthContext'
import Api_Address from '../../../env'
const UnitLogin = () => {

    const [phone_num, setPhoneNum] = useState("")
    const [password, setPassword] = useState("")
    const { setAuthState } = useContext(AuthContext);

    const navigate = useNavigate();

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
            await axios.post(`${Api_Address}api/v1/auth/unit_login`, data).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.error)
                } else {
                    toast.success(res.data.success)
                    localStorage.setItem("accessToken", res.data.token)
                    setAuthState({
                        name_tm: res.data.name_tm,
                        phone_num: res.data.phone_num,
                        latitude: res.data.latitude,
                        longitude: res.data.longitude,
                        soId: res.data.soId,
                        id: res.data.id,
                        status: true,
                        role: res.data.role,
                    });
                    navigate("/unit")
                    window.location.reload()
                }

            })
        }
    }

    return (
        <>
            <div style={{ backgroundColor: '#080710', zIndex: "-1", padding: "50vh" }}>
                <div className={styles.background}>
                    <div className={styles.shape}></div>
                    <div className={styles.shape}></div>
                </div>
                <form className={styles.login_form} onSubmit={loginUser}>
                    <h3>Unit Login Page</h3>

                    <label className={styles.login_label} htmlFor="phone_num">Phone Number</label>
                    <input name='phone_num' value={phone_num} onChange={(e) => setPhoneNum(e.target.value)} className={styles.login_input} type="number" min="60000000" max="65999999" placeholder="Phone Number" id="phone_num" autoComplete='off' required />

                    <label className={styles.login_label} htmlFor="password">Password</label>
                    <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} className={styles.login_input} type="password" placeholder="Password" id="password" autoComplete='off' required />

                    <button className={styles.login_button} type='submit'>Log In</button>
                </form>
            </div>
        </>
    )
}

export default UnitLogin