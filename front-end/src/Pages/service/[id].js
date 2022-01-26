import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar"
import Footer from "../../components/footer"
import LoadIcon from "../../images/loading.gif"
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getServices } from '../../redux/actions/serviceActions';
import { getSubService } from '../../redux/actions/subServiceAction';

const ServiceForm = () => {


  const { auth, service, subService } = useSelector(state => state)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [load, setLoad] = useState(false)
  const initialState = { sname: "", sName: "", price: "", date: "", state: "", dist: "", pinCode: "", address: "" }
  const [formData, setFormData] = useState(initialState)


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
  }, [subService]);

  const formSubmitBtn = (e) => {
    e.preventDefault()
    const check = valid(data)
  }


  return (<>
    <Navbar />
    <div className="service_form_container">

      <form>
        <input type="text" placeholder="Service name" disabled value={formData.sName} />
        <input type="text" placeholder="Sub service name" disabled value={formData.sname} />
        <input type="text" placeholder="Price" disabled value={`$${formData.price}`} />
        <input type="text" placeholder="State" onChange={(e) => setFormData({ ...formData, state: e.target.value })} value={formData.state} />
        <input type="text" placeholder="District" onChange={(e) => setFormData({ ...formData, dist: e.target.value })} value={formData.dist} />
        <input type="number" placeholder="Pincode" onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })} value={formData.pinCode} />
        <input type="datetime-local" placeholder="Date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} value={formData.date} />
        <textarea type="text" placeholder="Address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} value={formData.address} />

        <button className="btn btn-success btn-lg" onClick={formSubmitBtn}>Submit</button>

      </form>


    </div>
    <Footer />

  </>)
};

export default ServiceForm;
