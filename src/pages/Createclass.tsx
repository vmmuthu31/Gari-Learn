import React, { useState, useEffect, useRef } from "react";
import { BiCloud, BiPlus } from "react-icons/bi";
import axios from "axios"
import Header from "./components/Header";
import { useAsset, Player } from '@livepeer/react';
import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey, clusterApiUrl  } from '@solana/web3.js';
import { Program, AnchorProvider, web3, utils } from '@project-serum/anchor';
import idl from './metadata.json'
import {Buffer} from 'buffer';

const {SystemProgram,Keypair} = web3;
const isBrowser = () => typeof window !== "undefined"; 

const programID = new PublicKey("5Z4fqtT4faiDGKzgs5VxjjyP33jHmBRMksSkR5RGz2Kf")
const network = clusterApiUrl("devnet")
const opts = {
  preflightCommitment:"processed",
}
const feedPostApp = Keypair.generate();
const connection = new Connection(network, opts.preflightCommitment);


export default function Createclass() {
 
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [imgurl, setImgurl] = useState<string>("");
  const [Loading, setLoading] = useState(false)
  const [vediourl, setVedioUrl] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>();
  const [video, setVideo] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
const [dat,Dat] = useState(null)
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  

  const [datas,setData] = useState([])
  const [walletaddress, setWalletAddress] = useState("");
  const isBrowser = typeof window !== "undefined";
  const { solana } = isBrowser ? window : {};
  const getProvider = () => {
    //Creating a provider, the provider is authenication connection to solana
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
      connection,
      solana,
      opts.preflightCommitment
    );
    return provider;
  };

  const checkIfWalletIsConnected = async () => {
    try {
      setLoading(true)
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect({
            onlyIfTrusted: true, //second time if anyone connected it won't show anypop on screen
          });
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found!, Get a Phantom Wallet");
      }
    } catch (error) {
      console.log(error.message);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const onLoad = () => {
    checkIfWalletIsConnected();
    getPosts();
  };

  const connectWalletRenderPopup = async () => { //first time users are connecting to wallet this function will activate
    try{
      setLoading(true)
      if (solana) {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
      }
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  };

  const connect = () => {
    return (
      <button onClick={connectWalletRenderPopup} className="buttonStyle"> {Loading ? <p>loading...</p>: <p>Connect Wallet </p>}    </button>
    );
  };

  console.log("datas",datas)

  const createPostFunction = async(text,position) =>{ //createPostFunction connects to the smartcontract via rpc and lib.json  to create post
    const provider = getProvider() //checks & verify the dapp it can able to connect solana network
    const program = new Program(idl,programID,provider) //program will communicate to solana network via rpc using lib.json as model
    const num = new anchor.BN(position); //to pass number into the smartcontract need to convert into binary
    try{
      //post request will verify the lib.json and using metadata address it will verify the programID and create the block in solana
      const tx = await program.rpc.createPost(text,num,false,{ 
        accounts:{
          feedPostApp:feedPostApp.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers:[feedPostApp] 
      })
      //const account_data  = await program.account.feedPostApp.fetch(feedPostApp.publicKey)
      //console.log('user_data',user_data,'tx',tx,'feedpostapp',feedPostApp.publicKey.toString(),'user',provider.wallet.publicKey.toString(),'systemProgram',SystemProgram.programId.toString())
      onLoad();
    }catch(err){
      console.log(err)
    }
  }

  const getPosts = async() =>{
    const provider = getProvider();
    const program = new Program(idl,programID,provider)
    try{
      setLoading(true)
      Promise.all(
        ((await connection.getProgramAccounts(programID)).map(async(tx,index)=>( //no need to write smartcontract to get the data, just pulling all transaction respective programID and showing to user
          {
          ...(await program.account.feedPostApp.fetch(tx.pubkey)),
            pubkey:tx.pubkey.toString(),
        }
        )))
    ).then(result=>{
      result.sort(function(a,b){return b.position.words[0] - a.position.words[0] })
      setData([...result])
    })
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

    
  const uploadimage = async () => {
    setIsUploading(true);
    const inputElement = document.querySelector('input[name="image"]');
    const file = inputElement?.files[0];
    const formData = new FormData();
    
    formData.append('file', file)

    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);
    const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1Y2FiZTdkYS1hMTliLTQxMmYtOWQ2OS1mYjAyZGU3NzFmZWMiLCJlbWFpbCI6Im12YWlyYW11dGh1MjAwM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOWQ2MjhiYTA3MDIzODZhYjEyYmMiLCJzY29wZWRLZXlTZWNyZXQiOiJlNmMwNGQzZmNmODI0MGQxNjA1Nzg4YmVjYWQ1NzU3ODFhNzQ5MzE0ZjdmNTE0OWM5ZmU2OTk1OWJiOGY0ZDM4IiwiaWF0IjoxNjgxNDAxMzEzfQ.RPQU4izimjj4j3FZchxRGIeBTtwhxJcbOhWG8_5jMPU'
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: 100000000,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData}`,
          Authorization: JWT
        }
      });
      console.log("response",res.data.IpfsHash);
    const cid = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;

    setImgurl(cid);
    
    setIsUploading(false);
  };

  const uploadvedio = async () => {
    setIsUploading(true);
    const inputElement = document.querySelector('input[name="vedio"]');
    const file = inputElement.files[0];
    const formData = new FormData();
    
    formData.append('file', file)

    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);
    const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1Y2FiZTdkYS1hMTliLTQxMmYtOWQ2OS1mYjAyZGU3NzFmZWMiLCJlbWFpbCI6Im12YWlyYW11dGh1MjAwM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOWQ2MjhiYTA3MDIzODZhYjEyYmMiLCJzY29wZWRLZXlTZWNyZXQiOiJlNmMwNGQzZmNmODI0MGQxNjA1Nzg4YmVjYWQ1NzU3ODFhNzQ5MzE0ZjdmNTE0OWM5ZmU2OTk1OWJiOGY0ZDM4IiwiaWF0IjoxNjgxNDAxMzEzfQ.RPQU4izimjj4j3FZchxRGIeBTtwhxJcbOhWG8_5jMPU'
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: 100000000,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData}`,
          Authorization: JWT
        }
      });
      console.log("response",res.data.IpfsHash);
      const cid = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;
  
    setVedioUrl(cid);
  
    setIsUploading(false);
  };
 console.log(vediourl)

  const handleSubmit = async () => {
    
    var datas = JSON.stringify({
        pinataOptions: {
          cidVersion: 1,
        },
        pinataMetadata: {
          name: "testing",
          keyvalues: {
            customKey: "customValue",
            customKey2: "customValue2",
          },
        },
      
        pinataContent: {
           video: vediourl,
           title:title,
           description:description,
           location:location,
           category:category,
           thumbnail:imgurl,
            UploadedDate: Date.now(),
    },
      });
  
      var config = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: "519cd60b2578f450cf79",
          pinata_secret_api_key:
            "0071de8e6bb414b85d442cbb5b8286a94b093d150c676087974ef4eb903160d1",
        },
        data: datas,
      }
      const res = await axios(config);
      const created = res.data.IpfsHash;
      const metadataURI = `https://ipfs.io/ipfs/${created}`;
      console.log("metadataURI",metadataURI)
      await createPostFunction(metadataURI,3)
      
  };
  

console.log("wallet",walletaddress)
 
  return (
    <>
    <Header />
   <div className="w-full px-10 pt-16 flex flex-row">
      <div className="flex-1 flex flex-col">
        
        <div className="flex flex-col m-10     mt-5  lg:flex-row">
          <div className="flex lg:w-3/4 flex-col ">
            <label className="text-[#9CA3AF]  text-sm">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Rick Astley - Never Gonna Give You Up (Official Music Video)"
              className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />
            <label className="text-[#9CA3AF] mt-10">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Never Gonna Give You Up was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick’s debut LP “Whenever You Need Somebody."
              className="w-[90%] text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />
 
            <div className="flex flex-row mt-10 w-[90%]  justify-between">
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="Bali - Indonesia"
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                >
                  <option>Music</option>
                  <option>Sports</option>
                  <option>Gaming</option>
                  <option>News</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Science & Technology</option>
                  <option>Travel</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="mt-5 flex justify-between" >
                <div>
            <label className="text-[#9CA3AF]  mt-10 text-sm">Thumbnail</label>
 
            <div
              onClick={() => {
                thumbnailRef.current.click();
              }}
              className="border-2 w-64 border-gray-600  border-dashed rounded-md mt-2 p-2  h-36 items-center justify-center flex"
            >
              {thumbnail ? (
                <img
                  onClick={() => {
                    thumbnailRef.current.click();
                  }}
                  src={URL.createObjectURL(thumbnail)}
                  alt="thumbnail"
                  className="h-full rounded-md"
                />
              ) : (
                <BiPlus size={40} color="gray" />
              )}
            </div>
 
            <input
              type="file"
              className="hidden"
              ref={thumbnailRef}
            //   onChange={(e) => {
            //     uploadToLighthouse(e);
            //   }}
            />
            </div>
            <div className=" mr-10 flex  justify-end">
          <div className="flex items-center">
       
          <button
              onClick={() => {
                handleSubmit();
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
            >
              <BiCloud />
              <p className="ml-2">Upload</p>
            </button>
          </div>
        </div>
        </div>
          </div>

          <div
  onClick={() => {
    thumbnailRef.current.click();
  }}
  className="border-2  hidden border-gray-600 border-dashed rounded-md  items-center justify-center "
>
  {thumbnailPreview ? (
    <img
      src={thumbnailPreview}
      alt="thumbnail"
      className="h-full rounded-md"
    />
  ) : thumbnail ? (
    <img
      onClick={() => {
        thumbnailRef.current.click();
      }}
      src={URL.createObjectURL(thumbnail)}
      alt="thumbnail"
      className="h-full rounded-md"
    />
  ) : (
    <BiPlus size={40} color="gray" />
  )}
</div>

<input
  type="file"
  name="image"
  className="hidden"
  ref={thumbnailRef}
  onChange={(e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    uploadimage()
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
    console.log("file",file)
    
   
  }}
/>
 
          <div
            onClick={() => {
              videoRef.current.click();
            }}
            className={
              video
                ? " w-96   rounded-md  h-64 items-center justify-center flex"
                : "border-2 border-gray-600  w-96 border-dashed rounded-md mt-8   h-64 items-center justify-center flex"
            }
          >
            {video ? (
              <video
                controls
                src={URL.createObjectURL(video)}
                className="h-full rounded-md"
              />
            ) : (
              <p className="text-[#9CA3AF]">Upload Video</p>
            )}
          </div>
        </div>
        
        <input
          type="file"
          className="hidden"
          ref={videoRef}
          accept={"video/*"}
        //   onChange={(e) => {
        //     uploadToLighthouse(e);
        //   }}
        />
        
      </div>
      <div className="border-2  border-gray-600 border-dashed rounded-md mt-2 p-2  items-center justify-center hidden">
  {videoPreview ? (
    <video
      src={videoPreview}
      controls
      className="h-full rounded-md"
    />
  ) : video ? (
    <video
      src={URL.createObjectURL(video)}
      controls
      className="h-full rounded-md"
    />
  ) : (
    <div
      onClick={() => {
        videoRef.current.click();
      }}
      className="h-full w-full flex items-center justify-center text-gray-500 hover:text-gray-900"
    >
      <BiPlus size={40} />
      <span className="ml-2">Upload Video</span>
    </div>
  )}
  
</div>

<input
  type="file"
  name="vedio"
  className="hidden"
  ref={videoRef}
  accept="video/*"
  onChange={(e) => {
    const file = e.target.files[0];
    setVideo(file);
    const reader = new FileReader();
    reader.onload = () => {
      setVideoPreview(reader.result);
    };
    uploadvedio()
    reader.readAsDataURL(file);
  }}
/>

    </div>
    </>
  );
}