import React, { useEffect, useState } from "react";
import Card from "../components/Home/Card";
import "../CSS/Service.css";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getServices } from "../redux/actions/serviceActions";
import LoadIcon from "../images/loading.gif";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const Service = () => {
    const { auth, service } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 300, easing: "ease-in-out-cubic" });
    }, []);

    useEffect(() => {
        setLoad(true);
        dispatch(getServices());
        setLoad(false);
    }, [dispatch]);

    return (
        <div className>
            <Navbar />
            <div className="service_main_container">
                {load ? (
                    <img
                        src={LoadIcon}
                        alt="loading"
                        className="d-block mx-auto"
                    />
                ) : service.length > 0 ? (
                    service.map((ele) => (
                        <div
                            id={ele.name}
                            key={ele._id}
                            className="service_container"
                        >
                            <h1>{ele.name}</h1>
                            <div className="service_subService">
                                {ele.subService.map((element) => (
                                    <Link
                                        data-aos="fade-up"
                                        key={element._id}
                                        to={
                                            auth.token
                                                ? `/service/${element._id}`
                                                : "/login"
                                        }
                                    >
                                        <Card
                                            className="service_card"
                                            src={element.simage}
                                            name={element.sname}
                                            price={element.price}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    ""
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Service;
