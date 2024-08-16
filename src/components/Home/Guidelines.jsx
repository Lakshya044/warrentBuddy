"use client"; // Ensure this component is a Client Component

import Image from 'next/image';

function Div_Guidelines() {
  return (
    <>
      <div className="container mx-auto text-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 items-center justify-around mx-40">
          <div className="flex flex-col mr-40 justify-center items-center">
            <div className="text-2xl font-bold  w-80 align-left">
              Getting Started is <br />
              Quick and Easy
            </div>
          </div>
          <div className="flex flex-col mx-auto justify-center items-center">
           <div> <Image
              src="https://img1.digitallocker.gov.in/assets/img/icons/register-you.svg"
              alt="Register Yourself"
              width={100}
              height={100}
            /></div>
           
            <div className="mt-2 text-lg font-medium">Register Yourself</div>
          </div>

           <div className='flex flex-col max-w-fit mx-0 px-0'>
           <Image
                src="/Right.png"
                alt="Right Arrow"
                width={50}
                height={50}
                className=""
              />
           </div>

          <div className="flex flex-col mx-auto justify-center items-center">
            
              <div><Image
                src="https://img1.digitallocker.gov.in/assets/img/icons/verify-you.svg"
                alt="Verify Yourself"
                width={100}
                height={100}
              /></div>
            
            <div className="mt-2 text-lg font-medium">Verify Yourself</div>
          </div>
          <div className='flex flex-col max-w-fit mx-0 px-0'>
           <Image
                src="/Right.png"
                alt="Right Arrow"
                width={50}
                height={50}
                className=""
              />
           </div>
          <div className="flex flex-col mx-auto justify-center items-center">
            <div>
              <Image
                src="https://img1.digitallocker.gov.in/assets/img/icons/fetch-doc.svg"
                alt="Check Warrant Status"
                width={100}
                height={100}
              />
            </div>
            <div className="mt-2 text-lg font-medium">Check Warrant Status</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-center p-6 bg-gray-50 mx-28 h-60 justify-center items-center rounded-full">
        <h3 className="text-2xl font-bold">
          <b>WarrantBuddy</b> is a user-friendly platform revolutionizing{' '}
          <i>Warrant Management</i> with digital issuance and real-time updates,
          ensuring transparency and efficiency in the process.
        </h3>
        <br />
        <a href="/signup" className="inline-block">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Sign-Up Now
          </button>
        </a>
      </div>
    </>
  );
}

export default Div_Guidelines;
