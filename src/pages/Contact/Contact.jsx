import React, { useRef } from "react";
import "./contact.css";
import Title from "../Title/Title";
import imesege from "../../assets/messege.png";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // e.g., 'service_abc123'
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // e.g., 'template_xyz456'
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // e.g., 'user_123abc'
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message, please try again.");
        }
      );

    e.target.reset();
  };

  return (
    <div className="tit">
      <Title
        subtitle="Get in Touch"
        title="We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us."
      />
      <div className="contact">
        <div className="contact-col">
          <h2>
            Contact Us <img src={imesege} alt="" />
          </h2>
          <p>
            We'd love to hear from you! Whether you have questions, feedback,
            or just want to say hello, feel free to reach out to us at
          </p>
          <ul>
            <li>Contact@sincut.in</li>
            <li>+91-7478895884</li>
            <li>Kohka, Bhilai Durg (C.G.)</li>
          </ul>
        </div>

        <div className="contact-col">
          <form ref={form} onSubmit={sendEmail}>
            <label>Your Name</label>
            <input type="text" name="name" placeholder="Enter Your Name" required />
            <label>Email Address</label>
            <input type="email" name="email" placeholder="Enter your email" required />
            <label>Write Your Message</label>
            <textarea
              name="message"
              cols="30"
              rows="10"
              placeholder="Send us your message..."
              required
            ></textarea>
            <button type="submit" className="butn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
