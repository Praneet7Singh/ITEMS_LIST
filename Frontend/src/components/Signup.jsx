import React, { useState } from "react";
import { sign_up } from "../api/users/signup";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function SignUp() {
    try {
      const user = await sign_up(name, email, password);
      if (user) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <div className="border border-[#353535] shadow-md bg-[#272727] flex flex-col w-[450px] items-center border-l-5 rounded-xs">
          <p className="text-[20px] mt-[10px]">SIGN UP</p>
          {error && (
            <p className="text-[14px] mt-[8px] text-red-600">{error}</p>
          )}
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter Name"
            className="border border-[#404040] shadow-md mt-[10px] p-1 w-[250px] placeholder:text-neutral-300 rounded-xs"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter email"
            className="border border-[#404040] shadow-md mt-[10px] p-1 w-[250px] placeholder:text-neutral-300 rounded-xs"
          />
          <input
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter password"
            className="border border-[#404040] shadow-md mt-[10px] p-1 w-[250px] placeholder:text-neutral-300 rounded-xs"
          />
          <Link to="/login" className="mt-[10px] hover:text-cyan-500">
            Already have an Account
          </Link>
          <button
            className="border border-neutral-200 bg-neutral-300 text-neutral-900 mt-[14px] w-[100px] mb-[14px] rounded-xs"
            onClick={SignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;
