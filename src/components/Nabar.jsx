import Image from 'next/image'; // Use Next.js Image component for optimized images

function UpperNavbar() {
  return (
    <div className="flex items-center p-2 bg-blue-700 border-b border-gray-200 justify-between">
      <div className="mr-2">
        <Image
          src="/tiranga.jpg" // Path relative to the public folder
          width={60}
          height={60}
          alt="Preamble"
          className="inline-block align-top rounded-full"
        />
      </div>
      <div className="text-yellow-500 hover:underline">
        GOVERNMENT OF INDIA
      </div>
    </div>
  );
}

export default UpperNavbar;
