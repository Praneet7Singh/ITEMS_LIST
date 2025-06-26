import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Outlet, useNavigate } from "react-router-dom";

import "./App.css";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="border border-neutral-700 p-10 shadow-md ">
          <p className="text-[20px] mb-[10px]">Welcome to the Project</p>
          <ul className="border border-neutral-700 p-10 shadow-md bg-[#272727] list-disc">
            <li>
              This is Items List project which implements CRUD operations and
              user authentication using sessions.
            </li>
            <li>
              Each user will have its own set of items which is doen by adding a
              reference of the user model in the Item model schema
            </li>
          </ul>
          <button
            className="bg-neutral-300 text-black shadow-md p-2 mt-[10px]"
            onClick={() => {
              navigate("/login");
            }}
          >
            Start
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
