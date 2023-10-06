import { useState } from 'react';
import './app.scss'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

function App() {
    const [Message,setMessage]=useState(false)
    const[Name,setName]=useState('')
    const[Number,setNumber]=useState('')
    const[Email,setEmail]=useState('')
    const [error,setError]=useState(false)
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    const initialValues = { Name: "", Number:"",Email: "", Message: "" };
    const [formValues, setFormValues] = useState(initialValues);

    const form = useRef();

    const sendEmail = (e) => {
    e.preventDefault();
    if(Name.length===0){
      setError(true)
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (Email.length===0) {
      setError(true)
    }
     else if (!regex.test(Email)) {
       setError(true)
    }
    if(Number.length<10){
      setError(true)
    }
    
    emailjs.sendForm('service_iqucknn', 'template_xv2y72q', form.current, 'ZZeSA_qerjEO72olO')
      .then((result) => {
          console.log(result.text);
          setSubmissionSuccess(true);
          setMessage(true);
      }, (error) => {
          console.log(error.text);
      });
      
  };
    const handleChange = (e) => {
      const { Name, value } = e.target;
      setFormValues({ ...formValues, [Name]: value });
    };
  
  return(
    <div className='contact' id='contact'>
      <div className="left">
        <img src="assests/shake.svg" alt="" />
      </div>
      <div className="right">
        <h1>Contact us!</h1>
        <form ref={form} onSubmit={sendEmail}>
          <input type='text' name="Name" placeholder='Name'  onChange={e=>setName(e.target.value)}/>
          {error&&Name.length===0?<label>Name is required!</label>:""}

          <input type='tel' name="Number" placeholder='Mobile Number' onChange={e=>setNumber(e.target.value)}/>
          {error&&Number.length<10?<label>Number is invalid</label>:""}

          <input type='text' name="Email" placeholder='Email'  onChange={e=>setEmail(e.target.value)}/>
          {error&&Email.length===0?<label>Correct mail is required!</label>:""}

          <textarea name="Message" placeholder='Message'  onChange={handleChange}></textarea>
          
          <button type='submit'>Send</button>
          {submissionSuccess && (<span>Thank you! We'll get back to you soon!</span>
  )}
        </form>
      </div>
    </div>
  );
}export default App;