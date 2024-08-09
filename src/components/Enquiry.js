

import React, { useEffect } from 'react';
import {useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Enquiry = () => {


    let navigate = useNavigate();
    const [contactInfo,setContactInfo]= useState( {
        name: "",
        email:"",
        query:""
    }
    );
    const [enquiryStatus,setEnquiryStatus] = useState('');


    useEffect( () =>{
        setContactInfo({name:localStorage.getItem('name'),
        email:localStorage.getItem('email'),
        query:''})
    },[])


    const onChange = (e) => {
        setContactInfo( {...contactInfo,[e.target.id]:e.target.value});
    };


    let submitHandler = (e) =>{
        e.preventDefault();
        console.log("submitted enquiry");


        //need to talk to back end to check if a user exists
        const submitEnquiry = async () => {
        try {
            console.log({...contactInfo});
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'enquiry',{...contactInfo});
            console.log(response);
            let data = response.data;
            console.log(data);        
            console.log("from response ");  
            setEnquiryStatus("Thanks for enquiring!");  
            // navigate('/');
        }
        catch (error) {
            console.error('Updating Enquiry failed:', error);
        }
    };
    submitEnquiry();
}


if(enquiryStatus == '') {
    return (
        <form className="mt-2" action="" onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="name"> Name  </label>
                <input  id="name" type="text"
                placeholder="Name"
                value={contactInfo.name}
                onChange={onChange}
                className="form-control" readOnly
                name="name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">  Email </label>
                <input id="email" type="email"
                value={contactInfo.email}
                placeholder="Email"
                className="form-control"
                name="email" readOnly
                onChange={onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="enquiry"> Remarks  </label>
                <input id="query" type="text"
                value={contactInfo.query}
                className="form-control"
                placeholder="Remarks"
                name="query"
                onChange={onChange}/>
            </div>
            {/* <button type="submit" className="btn btn-primary mt-2"
            disabled={ !contactInfo.name || !contactInfo.email }
            value="submit" onClick={handleOnSubmit}>  Submit </button> */}


            <button type="submit" className="btn btn-primary mt-2"
           
            value="submit" >  Submit </button>
           
        </form>
    );
        }
        else {
            return (
                <h4 className='text-primary'> {enquiryStatus}</h4>
            );
        }
};


export default Enquiry;