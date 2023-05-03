import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Api_Address from '../../../env'
import { useEffect } from 'react'

const SosCenterBlogCreate = () => {

    const { darkMode } = useContext(ThemeContext)

    const navigate = useNavigate()

    const [blogs, setBlogs] = useState({
        title_tm: "",
        title_en: "",
        title_ru: "",
        description_tm: "",
        description_en: "",
        description_ru: "",
        disasterId: "",
    })
    const [img, setImg] = useState('')

    const handleChange = (e) => {
        setBlogs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title_tm', blogs.title_tm)
        formData.append('title_en', blogs.title_en)
        formData.append('title_ru', blogs.title_ru)
        formData.append('description_tm', blogs.description_tm)
        formData.append('description_en', blogs.description_en)
        formData.append('description_ru', blogs.description_ru)
        formData.append('disasterId', blogs.disasterId)
        formData.append('instruction_img', img)

        if (!blogs.title_tm) {
            toast.error("Adyny (tm) ýazyň")
        }
        else if (!blogs.title_en) {
            toast.error("Adyny (en) ýazyň")
        }
        else if (!blogs.title_ru) {
            toast.error("Adyny (ru) ýazyň")
        }
        else if (!blogs.description_tm) {
            toast.error("Mazmuny (tm) ýazyň")
        }
        else if (!blogs.description_en) {
            toast.error("Mazmuny (en) ýazyň")
        }
        else if (!blogs.description_ru) {
            toast.error("Mazmuny (ru) ýazyň")
        }
        else if (!blogs.disasterId) {
            toast.error("Category saylan")
        }
        else if (!img) {
            toast.error("Surat saylan")
        }
        else {
            await axios.post(`${Api_Address}api/v1/instruction/create`, formData, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate('/sos/blogs ')
                }).catch((res) => {
                    toast.error(res.response.data.error)
                });
        }
    }

    const [disasters, setDisasters] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}api/v1/disaster`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then((res) => {
                setDisasters(res.data.disaster)
            })
        }
        fetchData()
    }, [])

    return (
        <>
            <div className='card border-0 shadow my-5'>
                <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                    <div className='h5'>
                        <div>Blog Create</div>
                    </div>
                </div>
                <div className={`card-body d-flex justify-content-center align-items-center ${darkMode ? "bg-dark-blue text-white" : ""}`} style={{ height: "711px" }}>
                    <div className='row justify-content-center'>
                        <div className='col-xl-8'>
                            <div className='row'>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-3">
                                    <label className="form-label fw-bold">Name (tm)</label>
                                    <input onChange={handleChange} name='title_tm' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-3">
                                    <label className="form-label fw-bold">Name (en)</label>
                                    <input onChange={handleChange} name='title_en' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-3">
                                    <label className="form-label fw-bold">Name (ru)</label>
                                    <input onChange={handleChange} name='title_ru' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">Description (tm)</label>
                                    <input onChange={handleChange} name='description_tm' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">Description (en)</label>
                                    <input onChange={handleChange} name='description_en' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">Description (ru)</label>
                                    <input onChange={handleChange} name='description_ru' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Category</label>
                                    <select name='disasterId' className="form-select" onChange={handleChange}>
                                        <option defaultValue>Select</option>
                                        {disasters.map(disaster => (
                                            <option key={disaster.id} value={disaster.id}>{disaster.name_tm}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <div className="input-group mb-3">
                                        <input name='instruction_img' onChange={(e) => setImg(e.target.files[0])} type="file" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className='d-grid mt-3'>
                                    <button onClick={handleClick} className={`btn ${darkMode ? "btn-outline-light" : "btn-primary"}`}>Goşmak</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SosCenterBlogCreate