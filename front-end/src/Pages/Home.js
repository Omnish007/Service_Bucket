import React, { useEffect, useState } from 'react'
import "../CSS/Home.css"
import Navbar from "../components/Navbar"
import Footer from "../components/footer"
import Card from "../components/home/Card"

import { useSelector, useDispatch } from "react-redux"
import LoadIcon from "../images/loading.gif"
import { getServices } from '../redux/actions/serviceActions'
import { Link } from 'react-router-dom'

const Home = () => {

    const { auth, service } = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(null)


    useEffect(() => {
        dispatch(getServices())
    }, [dispatch])

    return (
        <div className='home_container'>
            <Navbar />
            <div className='home_service'>
                <div className="home_header">
                    <h1 className="home_service_link"><Link to="/service">SERVICES</Link></h1>
                    <h3>Best SERVICES You Want</h3>

                </div>

                <div className="home_cards">
                    {

                        load ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                            : service.length > 0
                                ? service.map((element) => (
                                    <Card key={element._id} name={element.name} src={element.image}
                                    />
                                ))
                                : ""


                    }
                   
                </div>
            </div>

            <div className="home_safe_service">
                <div className='home_safe_text'>
                    <h1>Safe Services At Home</h1>
                    <h2>Safe Service Safe Home.</h2>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</button>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal_container">
                            <div className="modal-content ">
                                <div>
                                    trgr

                                </div>
                                <div>
                                    fefefe
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    < img className='image-responsive' src="/img/safe_service.png" />
                </div>
            </div>

            <div className="home_best_offers">

                <div className="home_offer_header">
                    <h1>BEST OFFERS</h1>
                </div>

                <div className="home_cards">
                    <Card src="/img/service.png" />
                    <Card src="/img/service.png" />
                    <Card src="/img/service.png" />
                    <Card src="/img/service.png" />

                </div>

            </div>


            <div className="home_info_container">
                <div className="home_info">
                    <div className="home_info_card">
                        <div className="home_info_text">
                            <h2>Home Service</h2>
                            <h4>reach in 2 hours</h4>
                        </div>
                        <div className="home_info_image">
                            <img src="https://us.123rf.com/450wm/denphumi/denphumi1406/denphumi140600247/29264335-selection-of-tools-in-the-shape-of-a-house-home-improvement-concept.jpg?ver=6" />
                        </div>
                    </div>
                    <div className="home_info_card">
                        <div className="home_info_text">
                            <h2>Home Service</h2>
                            <h4>reach in 2 hours</h4>
                        </div>
                        <div className="home_info_image">
                            <img src="https://us.123rf.com/450wm/denphumi/denphumi1406/denphumi140600247/29264335-selection-of-tools-in-the-shape-of-a-house-home-improvement-concept.jpg?ver=6" />
                        </div>
                    </div>
                    <div className="home_info_card">
                        <div className="home_info_text">
                            <h2>Home Service</h2>
                            <h4>reach in 2 hours</h4>
                        </div>
                        <div className="home_info_image">
                            <img src="https://us.123rf.com/450wm/denphumi/denphumi1406/denphumi140600247/29264335-selection-of-tools-in-the-shape-of-a-house-home-improvement-concept.jpg?ver=6" />
                        </div>
                    </div>
                </div>

                <div className="home_achivment">
                    <div className="achinment_box">
                        <h2>3000+</h2>
                        <p>CITIES</p>
                    </div>
                    <div className="achinment_box">
                        <h2>1000+</h2>
                        <p>SERVICES</p>
                    </div>
                    <div className="achinment_box">
                        <h2>10M+</h2>
                        <p>CUSTOMERS</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home
