import React from "react";
import sampleVideo from "../../assets/saddoddle.mp4"; // Put your video in the src folder or public folder
import "./doodlesad.css";

const VideoSectionSad = () => {
  return (
    <section className="video-section">
      <div className="text-container">
        <h2>Discover SinCut</h2>
        <p>
          SinCut allows you to share your confessions anonymously and
          contribute to a positive change. With just a small donation, you
          can relieve your guilt and make a meaningful impact.
        </p>
        <p>
          Join our community today and see how your small actions can make a
          big difference.
        </p>
      </div>
      <div className="video-container">
        <video autoPlay loop muted playsInline>
          <source src={sampleVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default VideoSectionSad;
