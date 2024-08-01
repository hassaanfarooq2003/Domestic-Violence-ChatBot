import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    setDarkMode(savedMode === "true");
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Form submitted with data:", formData);
    var email = formData.email;
    var password = formData.password;
    try {
      const response = await axios.post("http://localhost:8081/api/login", {
        email,
        password,
      });
      const { user } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      // alert('Login successful! Redirecting to Homepage');
      navigate("/chat");
    } catch (error) {
      console.error("Login error:", error.response.data);
      alert("Login Failed");
    }
  };

  const bgColor = darkMode ? "bg-gray-900" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-black";
  const inputBgColor = darkMode ? "bg-gray-800" : "bg-white";
  const inputTextColor = darkMode ? "text-white" : "text-black";
  const inputBorderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const labelColor = darkMode ? "text-gray-300" : "text-gray-700";

  return (
    <section className={`${bgColor} ${textColor}`}>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/src/Auth/img1.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
            <span className="sr-only">Home</span>
                <img
                  src="/src/Homepage/bot.png"
                  alt="Description of the image"
                  className="h-8 sm:h-10"
                />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome back
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Log in to your account to access the chatbot
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <img
                  src="/src/Homepage/bot.png"
                  alt="Description of the image"
                  className="h-8 sm:h-10"
                />
              </a>

              <h1
                className={`mt-2 text-2xl font-bold ${textColor} sm:text-3xl md:text-4xl`}
              >
                Welcome back
              </h1>

              <p
                className={`mt-4 leading-relaxed ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Log in to your account to access the chatbot.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className={`block text-sm font-medium ${labelColor}`}
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 w-full rounded-md ${inputBorderColor} ${inputBgColor} ${inputTextColor} text-sm shadow-sm h-12 px-4`}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className={`block text-sm font-medium ${labelColor}`}
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`mt-1 w-full rounded-md ${inputBorderColor} ${inputBgColor} ${inputTextColor} text-sm shadow-sm h-12 px-4`}
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="RememberMe" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="RememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className={`h-5 w-5 rounded-md ${inputBorderColor} ${inputBgColor} shadow-sm`}
                  />

                  <span className={`text-sm ${textColor}`}>Remember me</span>
                </label>
              </div>

              <div className="col-span-6">
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  By logging in, you agree to our
                  <a href="#" className={`${textColor} underline`}>
                    {" "}
                    terms and conditions{" "}
                  </a>
                  and
                  <a href="#" className={`${textColor} underline`}>
                    {" "}
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Log in
                </button>

                <p
                  className={`mt-4 text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } sm:mt-0`}
                >
                  Don't have an account?
                  <Link to="/signup" className={`${textColor} underline`}>
                    {" "}
                    Signup
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
