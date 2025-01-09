**WarrantBuddy: AI-Powered Digital Warrant Management System**
WarrantBuddy is an innovative platform designed to streamline and modernize the warrant management process. The project integrates cutting-edge technologies like AI-powered chatbots, secure authentication, and role-based access control to ensure a seamless and efficient experience for all stakeholders involved in warrant processing.
It enhances transparency and reduces the inefficiencies of traditional warrant processing systems. This application caters to multiple user roles, including Judges, Police Officers, Lawyers, and Citizens, providing them with dedicated dashboards and functionalities like issuing, viewing, and managing warrants digitally.
We also have a SuperUser which is responsible for assigning roles apart from Citizen to a User, this ensures that only legit profiles are created on the Platform

**Key Highlights:**
AI-powered chatbot for user interaction.
Secure authentication and role-based access control.
Reduction in paperwork and processing time by over 50%.
Easy integration with external systems using APIs.
Digital signatures for legal authenticity.
Validated Warrant Copy Download for Offline Use.

**Role-Based Functionalities:**
**1. Citizen:**
View warrants issued against you and your close relatives, track using Aadhar Card, now be informed against Fraudulent Calls and Spam Messages threatening Legal Actions.

**2. Lawyer:**
Submit bail applications.
Assist clients with legal processes via the dashboard.

**3. Police:**
Receive all Warrants issued for your respective Police Station, track real-time data and take actions accordingly.
Process Bail Requests forwarded to your Police Station.

**4. Judge:**
Issue Warrant against an Accused.
Approve or reject Bail Requests.
Digitally sign documents and provide an authorised copy of the document to the beneficiary.

**5. SuperUser:**
Manage users and system configurations.
Create, Delete and Update User Roles for people using the Platform.

**Technology Stack**

**Frontend Framework:** Next.js
**UI Library:** Tailwind CSS
**Backend Framework:** Node.js and Express.js
**Database:** MongoDB with Mongoose ORM
**Authentication:** NextAuth.js for secure login and session management, React PDF Libraries for Digital Signature
**AI-Powered Chatbot:** Gemini PRO API for generating dynamic and context-aware PDF's and Chatbot Assistance


**How to Run the Project**
Prerequisites:
Node.js installed (v16 or later).
MongoDB Atlas account or local MongoDB server.
**Steps to Run:**
1. Clone the Repository:git clone https://github.com/your-repo/warrantbuddy.git
2. cd warrantbuddy
3. Install Dependencies: npm i
4. Set Up Environment Variables:
  MONGO_URI=<your-mongodb-uri>
  NEXTAUTH_SECRET=<your-nextauth-secret>
  GPT_API_KEY=<your-gpt-api-key>
  Run the Development Server:
5. npm run dev
