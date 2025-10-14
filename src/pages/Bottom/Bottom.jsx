import React from 'react'
import './bottom.css'
const Bottom = () => {
  return (
   <div className="bottom">
    <div className="logo-name">
      <h2>SinCUT</h2>
    </div>
    <div className="separate">
      <section className="company">
      <h4>Company</h4>
      <ul>
        <li><a href="\">Home</a></li>
        <li><a href="\about">About us</a></li>
        <li><a href="\contact">Contact</a></li>
        <li><a href="\FAQs">FAQs</a></li>
        <li><a href="\terms">Term & Conditions</a></li>

      </ul>
    </section>
    <section className="social">
      <h4>Social</h4>
      <ul>
        <li>facebook</li>
        <li>instagram</li>
        <li>linkedin</li>
        <li>github</li>
        <li>thread</li>
        <li>x</li>
      </ul>
    </section>
    <section className="copy">
    <p> Copywrite All Rights Reserved </p>
    </section>
    </div>
    <span></span>

   </div>
  )
}

export default Bottom