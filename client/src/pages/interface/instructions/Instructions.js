import axios from "axios";
import React, { useEffect, useState } from "react";
import Api_Address from "../../../env";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import img_1 from '../../../assets/cards/blog/1.jpg'
import img_2 from '../../../assets/cards/blog/2.jpg'

const Instructions = () => {

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
                    <div className='col-lg-9 mt-5'>
                        <div className='row align-items-center me-4 mb-5'>
                            <div className='col-lg-3'>
                                <div className='fw-bold h5'>Instructions</div>
                            </div>
                        </div>

                        <div className='row mb-5 pb-5'>
                            {
                                instructions.sort((a, b) => a.id > b.id ? -1 : 1).map((instruction, index) => (
                                    index % 2 === 0
                                        ?
                                        <Link key={index} to={`/instruction/${instruction.id}`} className='col-lg-4 mb-4 text-decoration-none text-dark d-flex align-items-stretchk'>
                                            <div className="card border-0 rounded-3 me-4 shadow">
                                                <img src={`${Api_Address}/img/instruction/${instruction?.instruction_img}`} className="card-img-top rounded-0" alt="card" />
                                                <div className="card-body">
                                                    <div className="card-title fw-bold">{instruction.title_tm}</div>
                                                    <div style={{ fontSize: "13px" }} className="mt-3"><span className='fw-bold'>Admin </span><span>{moment(instruction.createdAt).format('DD-MM-YYYY')}</span></div>
                                                </div>
                                            </div>
                                        </Link>
                                        :
                                        <Link key={index} to={`/instruction/${instruction.id}`} className='col-lg-4 mb-4 text-decoration-none text-dark d-flex align-items-stretch'>
                                            <div className="card border-0 rounded-3 me-4 shadow">
                                                <div className="card-body">
                                                    <div className="card-title fw-bold">{instruction.title_tm}</div>
                                                    <div style={{ fontSize: "13px" }} className="mt-3"><span className='fw-bold'>Admin </span><span>{moment(instruction.createdAt).format('DD-MM-YYYY')}</span></div>
                                                </div>
                                                <img src={`${Api_Address}/img/instruction/${instruction?.instruction_img}`} className="card-img-top rounded-0" alt="card" />
                                            </div>
                                        </Link>
                                ))
                            }
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
    );
};

export default Instructions;
