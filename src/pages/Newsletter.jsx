import React from 'react'
import { Form, redirect,useNavigation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';


// loaders and actions are similar
// in loaders,data is handled before page gets loaded
// just like loaders ,we get bunch of useful info

// new way of submitting form in react-router
export const action= async({request})=>{

  console.log(request);
  
  // grabbing formdata
  const formData = await request.formData();
  const data = Object.fromEntries(formData) 
   
  try{
   const response = await axios.post(newsletterUrl,data);
   toast.success(response.data.msg)
   return redirect('/'); // function to navigate user to home page
  }catch(error){
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
  
  // redirects designed for actions and loaders,not for the actual components
}

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state==='submitting'

  // name attribute very important
  // vite server can't handle post request
  return (
    <Form className='form' method="POST">
      <h4 style={{textAlign:'center',marginBottom:'2rem'}}>
        our newsletter
      </h4>
      {/*name*/}
      <div className="form-row">
        <label htmlFor='name'
        className='form-label'>
          name
        </label>
        <input type="text" className='form-input' 
        name="name"
        id="name"
        defaultValue="john"
        required
        />
      </div>
      
      {/*lastName*/}
      <div className="form-row">
        <label htmlFor='lastName'
        className='form-label'>
          last name
        </label>
        <input type="text" className='form-input' 
        name="lastName"
        id="lastName"
        defaultValue="smith"
        required
        />
      </div>

      {/*email*/}
      <div className="form-row">
        <label htmlFor='email'
        className='form-label'>
          email
        </label>
        <input type="email" className='form-input' 
        name="email"
        id="email"
        defaultValue="johnsmith@gmail.com"
        required
        />
      </div>
      <button type="submit"
      className='btn btn-block'
      style={{marginTop:'0.5rem'}}
      disabled={isSubmitting}>
        {isSubmitting?'submitting':'submit'}
      </button>
    </Form>
  )
}

export default Newsletter
