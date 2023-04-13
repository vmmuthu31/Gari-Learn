import React, { useEffect, useRef, useState } from 'react';
import { useAsset, Player } from '@livepeer/react';
import Header from './components/Header';
import html2canvas from 'html2canvas';

const JoinClass = ({ streamKey }) => {
  const playerRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleMarkComplete = () => {
    // create the certificate for the student
    // convert the certificate element to a canvas using html2canvas
    html2canvas(document.querySelector("#certificate")).then(function(canvas) {
      // create a temporary link to download the image file
      const link = document.createElement('a');
      link.download = 'certificate.png';
      // convert the canvas to a data URL and set the link href to it
      link.href = canvas.toDataURL();
      // simulate a click on the link to download the image
      link.click();
    });
    setIsComplete(true); // update the state to true
  }

  return (
    <>
      <Header />
      <div className="rounded-md px-10 py-20 shadow-lg p-4">
        <div className="aspect-w-20 px-60 aspect-h-9">
          <Player
            src={'https://ipfs.io/ipfs/QmeUZLpPtFAGhKRsDEMEpYCX2NtVf7iq3t8tbU3SSgHpAV'}
            showPipButton
            showTitle={false}
            aspectRatio="16to9"
            controls={{
              autohide: 3000,
            }}
          />
          <h2 className="text-lg font-bold mb-4">Learn BlockChain Basics</h2>
          <div className='flex justify-between'>
            <p className="text-gray-500 mb-4">Instructor: Gyan</p>
            {isComplete ? (
              <button className="px-3 py-2 mb-2 bg-blue-600 rounded-xl"  onClick={handleMarkComplete}>
                Download Certificate
              </button>
            ) : (
              <button
                className="px-3 py-2 mb-2 bg-blue-600 rounded-xl"
               onClick={()=>{setIsComplete(true);}}
              >
                Mark as complete
              </button>
            )}
          </div>
          <p className="text-gray-500 ">
            Class Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus tristique ligula nec velit pharetra pulvinar.
          </p>
        </div>
        <div id="certificate" className="text-center hidden">
          <img
            src="https://c8.alamy.com/comp/2DC7K4G/certificate-template-background-award-diploma-design-blank-illustration-2DC7K4G.jpg"
            alt="Certificate Template"
          />
          <p>Certificate of Completion</p>
          <p>Presented to Gyan</p>
        </div>
        <p className="text-gray-500 hidden ">
          Class Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus tristique ligula nec velit pharetra pulvinar. Nulla facilisi. Sed
          ultrices massa et velit imperdiet, ac feug</p>
        
</div>
</>
);
};

export default JoinClass;

