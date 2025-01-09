"use client"; // Ensure this component is a Client Component

import { useRouter } from "next/navigation";
import Image from "next/image";

function HomePage() {
  const router = useRouter();

  // Event handlers for the button clicks
  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <>
      <div className="container mx-auto px-6 py-10"
      style={{
        background:
          "radial-gradient(circle,rgba(253, 248, 225, 1)  5%, rgba(109, 76, 65, 1) 81%)",
      }}>
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl text-[#FFD700] font-bold mb-4">
            Welcome to 
            <span className="hover:underline hover:underline-offset-1 text-4xl font-extrabold text-[#8b6f1a]">WarrantBuddy</span>
          </h1>
          <p className="text-lg text-[#3E2723]">
            A user-friendly platform revolutionizing <b> <i>Warrant Management</i></b>{' '}
            with digital issuance and real-time updates.
          </p>
        </div>

        {/* Feature Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              title: "Check Warrants Issued Against You",
              path: "/login",
              description: "Stay informed about any warrants issued.",
            },
            {
              title: "Talk to Our Virtual Assistant",
              path: "/Dashboards/Chatbot",
              description:
                "Enhance your knowledge about Law and Order.",
            },
            {
              title: "Issue Warrants and Approve Bail Requests",
              path: "/login",
              description: "As a Judge, Eradicate PaperWork and Fasten the Judiciary",
            },
            {
              title: "Contact a Legal Advisor",
              path: "/login",
              description:
                "Apply for a Bail Request with Ease anytime under the Lawyer of your Choice",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow-lg text-center bg-[#8b6f1a] flex flex-col justify-between border-[#D4AF37] hover:shadow-2xl transition duration-400"
            >
              <h2 className="text-lg text-[#FFD700] font-semibold mb-3">{feature.title}</h2>
              <p className="text-sm text-[#FFB300] mb-5">{feature.description}</p>
              <button
                className="px-4 py-2 border-[#FFB300] border-2 border- rounded-md bg-white text-[#1B5E20] font-bold hover:bg-green-50"
                onClick={() => handleClick(feature.path)}
              >
                CLICK HERE
              </button>
            </div>
          ))}
        </div>

        {/* Getting Started Section */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Getting Started is Quick and Easy</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10">
            {[
              {
                icon: "https://img1.digitallocker.gov.in/assets/img/icons/register-you.svg",
                title: "Register Yourself",
              },
              {
                icon: "/Right.png",
              },
              {
                icon: "https://img1.digitallocker.gov.in/assets/img/icons/verify-you.svg",
                title: "Verify Yourself",
              },
              {
                icon: "/Right.png",
              },
              {
                icon: "https://img1.digitallocker.gov.in/assets/img/icons/fetch-doc.svg",
                title: "Check Warrant Status",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-2"
              >
                <Image
                  src={step.icon}
                  alt={step.title || "Arrow"}
                  width={100}
                  height={100}
                  className={step.title ? "" : "hidden md:block"}
                />
                {step.title && <div className="text-lg font-medium">{step.title}</div>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default HomePage;
