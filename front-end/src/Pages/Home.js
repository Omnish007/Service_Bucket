import React, { useEffect, useState } from 'react'
import "../CSS/Home.css"
import Navbar from "../components/Navbar"
import Card from "../components/home/Card"
import { useSelector, useDispatch } from "react-redux"
import LoadIcon from "../images/loading.gif"
import { getServices } from '../redux/actions/serviceActions'

const Home = () => {

    const { auth, service } = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(null)


    useEffect(() => {
        dispatch(getServices(auth.token))
        if (auth.token) {
            setLoad(true)
            setLoad(false)
        }
    }, [dispatch, auth.token])

    return (
        <div className='home_container'>
            <Navbar />
            <div className='home_service'>
                <div className="home_header">
                    <h1>SERVICES</h1>
                    <h3>Best SERVICES You Want</h3>

                </div>

                <div className="home_cards">
                    {

                        load ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                            : service.length > 0
                                ? service.map((element) => (
                                    <Card key={element._id} src="/img/service.png" />
                                ))
                                : ""


                    }
                    {/* <Card src="/img/service.png" />
                    <Card src="/img/service.png" />
                    <Card src="/img/service.png" />
                    <Card src="/img/service.png" />
                    <Card src="/img/service.png" />
                    <Card src="/img/service.png" /> */}
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


            <footer>
                <div className="footer">
                    <div className="footer_box">
                        <h3>About Us</h3>
                        <div>
                            <p>D.C. Tower, Morbi, Gujarat</p>
                            <p>+91 9999999999</p>
                            <p>service.bucket@sb.com</p>
                            <p>Choose me</p>
                        </div>
                    </div>
                    <div className="footer_box">
                        <h3>Quick Links</h3>
                    </div>
                    <div className="footer_box">
                        <h3>Contact Us</h3>
                        <div>
                            <form>
                                <div>
                                    <input type="text" placeholder="Name" />
                                </div>
                                <div>
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div>
                                    <textarea placeholder="Comment" />
                                </div>
                                <button className="btn btn-danger">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <hr />

                <div className="footer2">
                    <div className="copy">
                        <h3>SB</h3>
                        <p>&copy;Copyrights 2022 All Right Reserved</p>
                    </div>
                    <div>
                    </div>
                    <div className="follow">
                        <h3>Follow us</h3>
                        <div className="icon_box">
                            <i className="icon fab fa-instagram"></i>
                            <i className="icon fab fa-twitter"></i>
                            <i className="icon fab fa-linkedin-in"></i>
                            <i className="icon fab fa-facebook-f"></i>
                            <i className="icon fab fa-pinterest-p"></i>
                        </div>
                    </div>
                </div>

            </footer>
        </div>
    )
}

export default Home
