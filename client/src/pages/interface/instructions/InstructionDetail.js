import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Api_Address from '../../../env';
import img_1 from '../../../assets/cards/blog/1.jpg'
import img_2 from '../../../assets/cards/blog/2.jpg'

const InstructionDetail = () => {

    const { intId } = useParams();
    const [blog, setBlogs] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}api/v1/instruction/${intId}`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then((res) => {
                setBlogs(res.data.instruction)
            })
        }
        fetchData()
    }, [intId])

    const [instructions, setInstructions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}api/v1/instruction`).then((res) => {
                setInstructions(res.data.instruction);
            });
        };
        fetchData();
    }, []);

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-9 col-12 my-5 py-5'>
                        <div className='small'>
                        </div>
                        <div className='h1'>
                            {blog.title_tm}
                        </div>
                        <div className='d-flex'>
                            <div className='fw-bold text-muted'>Kemal Hojayew -</div>
                            <div className=''>
                                {new Date(blog.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", })}
                            </div>
                        </div>
                        <div className='mt-5 me-5 text-center'>
                            <img src={`${Api_Address}img/instruction/${blog.instruction_img}`} alt={blog.title_tm} className="img-fluid" />
                        </div>
                        <div className='mt-3 me-5' style={{ lineHeight: "30px", fontSize: "18px", wordSpacing: "2px", textAlign: "justify" }}>
                            {blog.description_tm}
                        </div>
                    </div>
                    <div className='col-lg-3 pt-5 px-4 d-xl-block d-lg-block d-md-block d-none' style={{ backgroundColor: "#ededed " }}>
                        <div className='fw-bold'>Top Stories</div>
                        <div className='row mt-5'>
                            <div className='col-lg-12'>
                                {
                                    instructions.slice(0, 4).map((instruction, index) => (
                                        <div key={index} className="card mb-4 border-0" style={{ background: "transparent" }}>
                                            <div className="row g-0 align-items-center justify-content-center">
                                                <div className="col-md-4">
                                                    <img src={`${Api_Address}/img/instruction/${instruction?.instruction_img}`} className="img-fluid rounded-circle w-75" alt="card" />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body p-0">
                                                        <div className="card-title small fw-bold">{instruction.title_en}</div>
                                                        <div style={{ fontSize: "13px" }}><Link to="/" className='text-decoration-none text-dark'>Admin </Link><span>&#9679; Sep 29</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='d-flex justify-content-start my-5 position-relative'>
                            <img src={img_1} alt="ads" className='img-fluid w-75' />
                            <div className="position-absolute bottom-0 w-75 text-white p-4">
                                <div className='small text-warning mb-3 fw-bold'>-32%</div>
                                <div className="card-title h5">Just there have Lorem Ipsum</div>
                            </div>
                        </div>
                        <div className='fw-bold'>Newest Videos</div>
                        <div className='row mt-5'>
                            <div className='col-lg-12'>
                                {
                                    instructions.slice(0, 4).map((instruction, index) => (
                                        <div key={index} className="card mb-4 border-0" style={{ background: "transparent" }}>
                                            <div className="row g-0 align-items-center justify-content-center">
                                                <div className="col-md-4">
                                                    <img src={`${Api_Address}/img/instruction/${instruction?.instruction_img}`} className="img-fluid rounded-circle w-75" alt="card" />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body p-0">
                                                        <div className="card-title small fw-bold">{instruction.title_en}</div>
                                                        <div style={{ fontSize: "13px" }}><Link to="/" className='text-decoration-none text-dark'>Admin </Link><span>&#9679; Sep 29</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='d-flex justify-content-start my-5 position-relative'>
                            <img src={img_2} alt="ads" className='img-fluid w-75' />
                            <div className="position-absolute mt-4 w-75 text-white p-4">
                                <div className="card-title h5">Lorem Ipsum</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InstructionDetail