import React from 'react'
import "../CSS/Home.css"
import Navbar from "../components/Navbar"
import Card from "../components/home/Card"

const Home = () => {
    return (
        <div className='home_container'>
            <Navbar />
            <div className='home_service'>
                <div className="home_header">
                    <h1>SERVICES</h1>
                    <h3>Best SERVICES You Want</h3>

                </div>

                <div className="home_cards">
                    <Card src="/img/service.png" />
                    <Card src="/img/service.png" />
                    <Card src="/img/service.png" />
                    <Card src="/img/service.png" />
                    <Card src="/img/service.png" />
                    <Card src="/img/service.png" />
                </div>
            </div>

            <div className="home_safe_service">
                <div className='home_safe_text'>
                    <h1>Safe Services At Home</h1>
                    <h2>Safe Service Safe Home.</h2>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal_container">
                            <div class="modal-content ">
                                <div>
                                    trgr

                                </div>
                                <div>
                                    fefefe
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
        </div>
    )
}

export default Home
