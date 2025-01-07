"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Unauthorized() {
  const router = useRouter();

  useEffect(() => {
    // Optionally, you could add a redirect after a certain time or on any condition
    const timer = setTimeout(() => {
      // Redirect to homepage or login page after 5 seconds
      router.push('/');
    }, 5000);

    // Clean up the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="text-center p-4 bg-white shadow-lg rounded-md">
        <h1 className="text-4xl font-bold text-red-600">Unauthorized Access</h1>
        <p className="mt-2 text-lg text-gray-700">You do not have the required permissions to access this page.</p>
        <p className="mt-4 text-sm text-gray-500">Redirecting you to the homepage...</p>
      </div>
    </div>
  );
}
