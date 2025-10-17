import React, { useRef, useState } from "react";
import "./contact.css";
import Title from "../Title/Title";
import imesege from "../../assets/messege.png";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus("sending"); // button changes to "Sending..."

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log(result.text);
      setStatus("success"); // show success message
      e.target.reset();

      // reset back to normal after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error(error.text);
      setStatus("error"); // show error
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  // Button text based on status
  const getButtonText = () => {
    switch (status) {
      case "sending":
        return "Sending...";
      case "success":
        return "✅ Message Sent!";
      case "error":
        return "❌ Failed! Try Again";
      default:
        return "Send Message";
    }
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
          <form ref={form} onSubmit={sendEmail} className="contact-form">
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
            <button
              type="submit"
              className={`butn ${status}`}
              disabled={status === "sending"} // disable while sending
            >
              {getButtonText()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
