import React from 'react';
import Card from '../components/home/Card';
import "../CSS/Service.css"
import Footer from "../components/footer"
import Navbar from '../components/Navbar';

const Service = () => {
    return (
        <div className>
            <Navbar/>
            <div className="service_container bg-1">
                <h1>Home</h1>
                <div className="service_subService">
                    <Card className="service_card" src="/img/service.png" name="kitchen" />
                    <Card className="service_card" src="/img/service.png" name="bathroom" />
                    <Card className="service_card" src="/img/service.png" name="bedroom" />
                </div>
            </div>
            <div className="service_container bg-2">
                <h1>Home</h1>
                <div className="service_subService">
                    <Card className="service_card" src="/img/service.png" name="kitchen" />
                    <Card className="service_card" src="/img/service.png" name="bathroom" />
                    <Card className="service_card" src="/img/service.png" name="bedroom" />
                </div>
            </div>
            <div className="service_container bg-1">
                <h1>Home</h1>
                <div className="service_subService">
                    <Card className="service_card" src="/img/service.png" name="kitchen" />
                    <Card className="service_card" src="/img/service.png" name="bathroom" />
                    <Card className="service_card" src="/img/service.png" name="bedroom" />
                </div>
            </div>
            <div className="service_container bg-2">
                <h1>Home</h1>
                <div className="service_subService">
                    <Card className="service_card" src="/img/service.png" name="kitchen" />
                    <Card className="service_card" src="/img/service.png" name="bathroom" />
                    <Card className="service_card" src="/img/service.png" name="bedroom" />
                </div>
            </div>
            <div className="service_container bg-1">
                <h1>Home</h1>
                <div className="service_subService">
                    <Card className="service_card" src="/img/service.png" name="kitchen" />
                    <Card className="service_card" src="/img/service.png" name="bathroom" />
                    <Card className="service_card" src="/img/service.png" name="bedroom" />
                </div>
            </div>
            <div className="service_container bg-2">
                <h1>Home</h1>
                <div className="service_subService">
                    <Card className="service_card" src="/img/service.png" name="kitchen" />
                    <Card className="service_card" src="/img/service.png" name="bathroom" />
                    <Card className="service_card" src="/img/service.png" name="bedroom" />
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export default Service;
