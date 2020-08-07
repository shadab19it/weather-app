import React from "react";

const OnlineText = ({ isOline }) => {
  if (isOline === "onn") {
    return (
      <h2 className='online'>
        <div className='onn'>You are back to Online</div>
      </h2>
    );
  } else if (isOline === "off") {
    return (
      <h2 className='online'>
        <div className='off'>You are offline</div>
      </h2>
    );
  } else {
    return <div></div>;
  }
};

export default OnlineText;
