import React from 'react'
import "./contact.css"
import Title from '../Title/Title'
import imesege from '../../assets/messege.png'
const Contact = () => {
  return (
    <div className="tit">
      <Title subtitle="Get in Touch" title="We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us."/>
    <div className="contact">
  
  <div className="contact-col">
    <h2>Contact Us <img src={imesege} alt="" /></h2>
    <p>
      We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us at 
    </p>
    <ul>
      <li>Contact@sincut.in</li>
      <li>+91-7478895884</li>
      <li>Kohka, Bhilai Durg (C.G.) </li>
    </ul>
  </div>
  <div className="contact-col">
   <form action="">
    <label htmlFor="">Your Name</label>
    <input type="text" name='name' placeholder='Enter Your Name' required />
    <label htmlFor="">Phone Number</label>
    <input type="tel" name="phone" id="" placeholder='Enter your Number' required/>
    <label htmlFor="">Write Your Messege</label>
    <textarea name="messege" id="" cols="30" rows="10" placeholder='Send us your messege...' required></textarea>
    <button type="submit" className="butn">Submit</button>
  </form>
  </div>
 
</div>
    </div>

  )
}

export default Contact