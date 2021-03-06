import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar"
import Footer from "../../components/footer"
import LoadIcon from "../../images/loading.gif"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getServices } from '../../redux/actions/serviceActions';
import { getSubService } from '../../redux/actions/subServiceAction';
import { createOrder, getOrders } from "../../redux/actions/orderAction"

const ServiceForm = () => {

  const { auth, alert, service, subService, serviceForm } = useSelector(state => state)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [load, setLoad] = useState(false)
  const initialState = { sname: "", sName: "", price: "", date: "", state: "", dist: "", pinCode: "", address: "", cardNo: "", cvv: "", expiryDate: "" }
  const [formData, setFormData] = useState(initialState)
  const navigate = useNavigate()


  useEffect(() => {
    setLoad(true)
    dispatch(getServices())
    dispatch(getSubService({ id, auth }))
    setLoad(false)
  }, []);

  useEffect(async () => {
    setFormData({
      sname: subService[0].sname,
      price: subService[0].price,
      sName: subService.sName
    })
  }, [subService, setFormData]);


  const handlePay = async (e) => {
    e.preventDefault()
    if(alert == "")
      navigate("/")
    dispatch(createOrder(formData, auth))
    setFormData({
      ...initialState,
      sname: subService[0].sname,
      price: subService[0].price,
      sName: subService.sName
    })
  }

  return (<>
    <Navbar />
    <div className="service_form_container">

      <form>
        <input type="text" readOnly placeholder="Service name" disabled value={formData.sName} />
        <input type="text" readOnly placeholder="Sub service name" disabled value={formData.sname} />
        <input type="text" readOnly placeholder="Price" disabled value={`$${formData.price}`} />

        <input type="text" required placeholder="State" onChange={(e) => setFormData({ ...formData, state: e.target.value })} value={formData.state} />
        <small className="form-text text-danger">{alert.state ? alert.state : ''}</small>

        <input type="text" required placeholder="District" onChange={(e) => setFormData({ ...formData, dist: e.target.value })} value={formData.dist} />
        <small className="form-text text-danger">{alert.dist ? alert.dist : ''}</small>

        <input type="text" required placeholder="Pincode" onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })} value={formData.pinCode} />
        <small className="form-text text-danger">{alert.pinCode ? alert.pinCode : ''}</small>

        <input type="date" required id="date" placeholder="Date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} value={formData.date} />
        <small className="form-text text-danger">{alert.date ? alert.date : ''}</small>

        <textarea type="text" required placeholder="Address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} value={formData.address} />
        <small className="form-text text-danger">{alert.address ? alert.address : ''}</small>

        <input type="text" placeholder="Card No." onChange={(e) => setFormData({ ...formData, cardNo: e.target.value })} value={formData.cardNo} />
        <small className="form-text text-danger">{alert.cardNo ? alert.cardNo : ''}</small>

        <input type="text" placeholder="CVV" onChange={(e) => setFormData({ ...formData, cvv: e.target.value })} value={formData.cvv} />
        <small className="form-text text-danger">{alert.cvv ? alert.cvv : ''}</small>

        <input type="TEXT" placeholder="Expiry Date" onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} value={formData.expiryDate} />
        <small className="form-text text-danger">{alert.expiryDate ? alert.expiryDate : ''}</small>

        <button className="btn btn-success btn-lg" onClick={handlePay}>Pay</button>
      </form>





    </div>
    <Footer />

  </>)
};

export default ServiceForm;
