import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import loginImg from "./assets/login.png";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { formVariant, imageVariant } from "./variants";
import { GoDotFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa";

const schema = yup.object({
  email: yup
    .string()
    .email("Email format is not valid!")
    .required("Email is required!"),
  password: yup.string().required("Password is required").min(6),
  username: yup.string().required("Username is required"),
});

const Register = () => {
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState({
    hasLetter: false,
    hasNumber: false,
    hasChar: false,
    hasLength: false,
  });

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    console.log(password);

    const hasLetter = /([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password);
    const hasNumber = /\d/.test(password);
    const hasChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    const hasLength = password.length >= 8;

    setPasswordInfo({
      hasLetter,
      hasNumber,
      hasChar,
      hasLength,
    });
  };

  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  return (
    <div className="max-w-5xl mx-auto px-5 flex justify-center items-center gap-4 h-[80vh]">
      <motion.div
        className="hidden md:flex"
        variants={imageVariant}
        initial="hidden"
        animate="visible"
      >
        <img src={loginImg} alt="login" className="w-[600px]" />
      </motion.div>

      <motion.div
        className="md:w-[30rem] p-6 flex flex-col gap-4 shadow-3xl"
        variants={formVariant}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl text-center text-red">Register</h2>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <div>
            <TextField
              type="username"
              id="username"
              label="Username"
              size="small"
              {...register("username")}
              className="w-full"
            />
            <p className="text-sm text-red-400">{errors.username?.message}</p>
          </div>
          <div>
            <TextField
              type="email"
              id="email"
              label="Email"
              size="small"
              {...register("email")}
              className="w-full"
            />
            <p className="text-sm text-red-400">{errors.email?.message}</p>
          </div>
          <div>
            <TextField
              type="password"
              id="password"
              label="Password"
              size="small"
              {...register("password")}
              onChange={handlePasswordChange}
              onFocus={() => setShowPasswordStrength(true)}
              className="w-full"
            />
            <p className="text-sm text-red-400">{errors.password?.message}</p>
          </div>
          <button
            disabled={isSubmitting}
            className="bg-color-primary text-white font-Poppins font-medium py-2 rounded-sm hover:bg-light-blue"
          >
            Register
          </button>

          <p className="text-center">
            Already have an account? <Link to="/">Login</Link>
          </p>

          {/* password strength indicator */}
          <div
            className=""
            variants={formVariant}
            initial="hidden"
            animate="visible"
          >
            {showPasswordStrength && (
              <motion.ul
                className="flex flex-col bg-slate-200 p-4 text-md rounded-md"
                variants={formVariant}
                initial="hidden"
                animate="visible"
              >
                <p>Password Strength Indicator</p>
                {Object.entries(passwordInfo).map(([key, value]) => (
                  <li
                    key={key}
                    className={
                      value
                        ? "text-green-400 flex item-center"
                        : "flex item-center text-red-400"
                    }
                  >
                    {value ? (
                      <FaCheck className="mt-1" />
                    ) : (
                      <GoDotFill className="mt-1" />
                    )}
                    &nbsp; {passwordStrengthLabels[key]}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </form>
      </motion.div>

      <DevTool control={control} />
    </div>
  );
};

const passwordStrengthLabels = {
  hasLetter: "Lowercase & Uppercase",
  hasNumber: "Numbers (0-9)",
  hasChar: "Special Character (!@#$%^&*)",
  hasLength: "At Least 8 Characters",
};

export default Register;
