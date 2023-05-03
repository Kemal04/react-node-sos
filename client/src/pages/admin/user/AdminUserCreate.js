import React from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { useContext } from 'react'

const AdminUserCreate = () => {
    const { darkMode } = useContext(ThemeContext)
    return (
        <>
            <div className='card border-0 shadow my-5'>
                <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                    <div className='h5'>
                        <div>Users Create</div>
                    </div>
                </div>
                <div className={`card-body d-flex justify-content-center align-items-center ${darkMode ? "bg-dark-blue text-white" : ""}`} style={{ height: "711px" }}>
                    <div className='row justify-content-center'>
                        <div className='col-xl-8'>
                            <div className='row'>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Ady</label>
                                    <input name='name' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">E-mail Adresi</label>
                                    <input name='email' type="email" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">Açar sözi</label>
                                    <input name='password' type="password" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">Açar sözini gaytala</label>
                                    <input name='password' type="password" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className='d-grid mt-3'>
                                    <button type="submit" className={`btn ${darkMode ? "btn-outline-light" : "btn-primary"}`}>Goşmak</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default AdminUserCreate