"use client"; // Ensure this component is a Client Component

import { useRouter } from 'next/navigation'; // Use next/navigation for client-side navigation
import Div_Guidelines from './Guidelines';

function HomeGrid() {
  const router = useRouter();

  // Event handlers for the button clicks
  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-12">
          <div className="p-4 border rounded-lg shadow-md text-center flex flex-col justify-around mx-12 max-w-2xl lg:min-h-52 bg-gray-50">
            <div className="mt-5 text-lg font-semibold">
              Check Warrants issued against you
            </div>
            <div className="mb-2">
              <button
                className="px-4 py-2 text-sm border border-green-500 rounded-md bg-white text-green-500 hover:bg-green-50"
                type="button" 
                onClick={() => handleClick('/ClientLogin')}
              >
                CLICK HERE
              </button>
            </div>
          </div>
          <div className="p-4 border rounded-lg shadow-md text-center flex flex-col justify-around mx-12 max-w-2xl lg:min-h-52 bg-gray-50">
            <div className="mt-5 text-lg font-semibold">
              Talk to our Virtual Assistant, Enhance your knowledge about Law and Order.
            </div>
            <div className="mb-2">
              <button
                className="px-4 py-2 text-sm border border-green-500 rounded-md bg-white text-green-500 hover:bg-green-50"
                type="button" 
                onClick={() => handleClick('/ClientLogin')}
              >
                CLICK HERE
              </button>
            </div>
          </div>
          <div className="p-4 border rounded-lg shadow-md text-center flex flex-col justify-around mx-12 max-w-2xl lg:min-h-52 bg-gray-50">
            <div className="mt-5 text-lg font-semibold">
              File a Complaint against Someone
            </div>
            <div className="mb-2">
              <button
                className="px-4 py-2 text-sm border border-green-500 rounded-md bg-white text-green-500 hover:bg-green-50"
                type="button" 
                onClick={() => handleClick('/ClientLogin')}
              >
                CLICK HERE
              </button>
            </div>
          </div>
          <div className="p-4 border rounded-lg shadow-md text-center flex flex-col justify-around mx-12 max-w-2xl lg:min-h-52 bg-gray-50">
            <div className="mt-5 text-lg font-semibold">
              Contact a Legal Advisor
            </div>
            <div className="mb-2">
              <button
                className="px-4 py-2 text-sm border border-green-500 rounded-md bg-white text-green-500 hover:bg-green-50"
                type="button" 
                onClick={() => handleClick('/ClientLogin')}
              >
                CLICK HERE
              </button>
            </div>
          </div>
        </div>
      </div>
      <Div_Guidelines/>
    </>
  );
}

export default HomeGrid;
