import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { z } from "zod";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" })
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
      message: "Password cannot contain special characters",
    }),
});

const Register = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      userSchema.parse(userInput);
      await axios.post("http://localhost:3000/register", userInput);
      navigate("/login");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors.map((err) => err.message).join(", "));
      } else if (error.response?.data?.error) {
        setError(error.response?.data?.error);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b25saW5lJTIwbGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D")',
          opacity: "0.8",
        }}
      >
        <div
          className="bg-white p-8 rounded-lg shadow-lg mx-4 sm:mx-auto"
          style={{ maxWidth: "24rem" }}
        >
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
          {/* {JSON.stringify(userInput)} */}
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              {error ? (
                <h1 className="text-red-500 text-xs py-2">{error}</h1>
              ) : (
                ""
              )}
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-purple-500"
                placeholder="Enter your email"
                value={userInput.email}
                onChange={(event) => {
                  const newUserInput = {
                    email: event.target.value,
                    password: userInput.password,
                  };
                  setUserInput(newUserInput);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-purple-500"
                placeholder="Enter your password"
                value={userInput.password}
                onChange={(event) => {
                  const newInput = {
                    email: userInput.email,
                    password: event.target.value,
                  };
                  setUserInput(newInput);
                }}
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-[#ED462F] hover:bg-[#F469] text-white font-bold py-2 rounded-md"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
