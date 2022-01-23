import React from 'react';

const footer = () => {

    const clickEvent = (e) => {
        e.preventDefault()
        alert("Submmited")
    }

    return (
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
                            <button className="btn btn-danger" onClick={(e) =>clickEvent(e)}>Submit</button>
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
    );
};

export default footer;
