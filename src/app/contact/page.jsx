"use client";
import React from 'react';
import Link from 'next/link';
import "./contact.css"; // Assuming you have additional styles in a CSS file
import { usePathname } from 'next/navigation'
import {useState,useEffect} from 'react'
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
  const pathname = usePathname()
 // console.log(router.pathname);
    useEffect(() => {
    // Check if the current route matches "/contact"
    if (pathname == "/contact") {
        console.log(2);
      document.body.classList.add("contact-page"); // Add your class here
    } else {
      document.body.classList.remove("contact-page"); // Remove the class if not on "/contact"
    }

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("contact-page");
    };
  }, []);
      const [formData, setFormData] = useState({ name: '', email: '' ,msg:''});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.msg)   newErrors.msg = 'Message is required';
    if (!formData.email) newErrors.email = 'Email is required';
     else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }else if (formData.msg.length < 10) {
        newErrors.msg = 'Message must be at least 20 characters';
      }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      // Send form data via EmailJS
      toast.loading('Please wait, we are sending your message',{
        duration: 2000, 
      });

      try {
        await emailjs.send('service_2nyjtqx', 'template_3vyedct', {
            to_name: "Ahmed Gawish",
            from_name: formData.name, 
            from_email: formData.email, 
            message:formData.msg
          }, 'BCHWeb1hlnZu1FDFl');

          toast.success('Your message was sent successfully, we will contact you soon!',{
            className:"custom-class-toast",
            duration: 5000, 
          });
        } catch (error) {
        toast.error('Error sending email');

      }
    } else {
      setErrors(newErrors);
      console.log(newErrors);
      if (newErrors?.msg=="Message must be at least 20 characters"&& !newErrors.name) {
        toast.error('the details message not enough about your question');
              return false;
      }
      toast.error('All Fields Required');
    }
  };
    
  return (
    <div className="container w-[90%] mx-auto">
      <div className="row">
        <h1 >Contact Us</h1>
      </div>
      <div className="row">
        <h4 style={{ textAlign: 'center' }}>We'd love to hear from you!</h4>
      </div>
      <div className="row input-container mt-0">
       <form onSubmit={handleSubmit} >
        <div className="col-xs-12"> 
          <div className="styled-input wide">
         <input type="text" name="name" className="contact__input-name"  
          value={formData.name}
          onChange={handleChange} required/>
            <label>Name</label>
          </div>
        </div>
        <div className="flex sm:flex-wrap md:flex md:w-[100%] col-md-6  col-sm-12 ">
                <div className="col-md-6 text-success col-sm-12">
          <div className="styled-input">
              <input type="text" name="email"  value={formData.email}
                           onChange={handleChange} required/>
            <label>Email</label>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="styled-input" >
            <input type="text"  required/>
            <label>Phone Number</label>
          </div>
        </div>
        </div>
    
        <div className="col-xs-12">
          <div className="styled-input wide">
     <textarea name="msg"  cols="10" rows="1" className="contact__textarea"
                        value={formData.msg}
                         onChange={handleChange} required></textarea>           
                             <label>Message</label>
          </div>
        </div>
        <div className="col-xs-12">
          <button type="submit" className="btn-lrg submit-btn">Send Message</button>
        </div>
        
        </form>
        
      </div>
    </div>
  );
}
