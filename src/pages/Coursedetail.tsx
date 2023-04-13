import React,{useState} from 'react';
import Header from './components/Header';
import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey, clusterApiUrl  } from '@solana/web3.js';
import { Program, AnchorProvider, web3, utils } from '@project-serum/anchor';
import idl from './metadata.json'
import Link from 'next/link';

const {SystemProgram,Keypair} = web3;
const isBrowser = () => typeof window !== "undefined"; 

const programID = new PublicKey("5Z4fqtT4faiDGKzgs5VxjjyP33jHmBRMksSkR5RGz2Kf")
const network = clusterApiUrl("devnet")
const opts = {
  preflightCommitment:"processed",
}
const feedPostApp = Keypair.generate();
const connection = new Connection(network, opts.preflightCommitment);


const CourseDetailsPage = () => {
  const [Loading, setLoading] = useState(false)
  const [datas,setData] = useState([])
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

  console.log("datas",datas)
  return (
    <>
    <Header />
    <div className=" min-h-screen">
      <div className="max-w-7xl mx-auto py-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-white-900 sm:text-3xl sm:truncate">
                Course Title Here
              </h2>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm-2.293-3.707a1 1 0 011.414-1.414l2 2a1 1 0 01-1.414 1.414L9 11.414l-1.293 1.293a1 1 0 01-1.414-1.414l2-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Instructor Name
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm-.293-3.707a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 12.414l-2.707 2.293a1 1 0 01-1.414-1.414l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  4.9 (125 ratings)
                </div>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:ml-4">
              <Link href="/JoinClass">
            <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enroll
              </button>
              </Link>
            </div>
          </div>

          <div className="mt-5 md:mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Course Description
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum vehicula tempus velit vel commodo. Vestibulum ut
                  eleifend velit, ut pulvinar orci. Aliquam in fermentum ex.
                  Proin fringilla mi quam, eu laoreet nisi gravida at.
                  Suspendisse porta blandit ante in sagittis. Nam bibendum
                  nulla quis est facilisis, vitae maximus odio sollicitudin.
                  Suspendisse ultrices interdum dui, eget imperdiet eros
                  tincidunt sit amet. Sed nec ex vestibulum, eleifend nibh a,
                  accumsan metus.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Course Content
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <ul className="list-disc pl-5">
                    <li>Lesson 1: Introduction to the Course</li>
                    <li>Lesson 2: Getting Started with React</li>
                    <li>Lesson 3: Building UI Components with Tailwind CSS</li>
                    <li>Lesson 4: Managing State with React Hooks</li>
                    <li>Lesson 5: Building a Complete Project</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Course Requirements
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <ul className="list-disc pl-5">
                    <li>Basic knowledge of HTML, CSS, and JavaScript</li>
                    <li>Experience with React is a plus but not required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Course Features
                </h3>


                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <ul className="list-disc pl-5">
                    <li>5 lessons with a total of 20 hours of video content</li>
                    <li>Interactive quizzes and exercises</li>
                    <li>Access to course materials for 6 months</li>
                    <li>Personalized feedback on project submissions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Instructor
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f4b"
                      alt="Instructor"
                    />
                    <span className="ml-3 font-medium">
                      Jane Doe
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="text-gray-600">Email:</span>{' '}
                    jane.doe@example.com
                  </div>
                  <div className="mt-1">
                    <span className="text-gray-600">Website:</span>{' '}
                    janedoe.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default CourseDetailsPage;


