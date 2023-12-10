import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import loginImg from "./assets/login.png";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Paper, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Google } from "@mui/icons-material";
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
  const [pass, setPass] = useState("");

  const [passLetter, setPassLetter] = useState(false);
  const [passNumber, setPassNumber] = useState(false);
  const [passChar, setPassChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const [passComplete, setPassComplete] = useState(false);

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isValid, isDirty, isSubmitting, isSubmitSuccessful } =
    formState;

  const handlePasswordChange = (e) => {
    setPass(e.target.value);
    console.log(pass);
  };
  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  useEffect(() => {
    // check for uppercase and lowercase letters
    if (pass.match(/^([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setPassLetter(true);
    } else {
      setPassLetter(false);
    }
    // check for numbers
    if (pass.match(/([0-9])/)) {
      setPassNumber(true);
    } else {
      setPassNumber(false);
    }

    // check for special characters
    // match(/([!,%,&,@,#,$,^,*,?,_,~])/)
    if (pass.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setPassChar(true);
    } else {
      setPassChar(false);
    }

    // check for password length
    if (pass.length > 7) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [pass]);

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
              // value={pass}
              onChange={handlePasswordChange}
              className="w-full"
              onFocus={() => setShowPasswordStrength(true)}
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
                <li
                  className={
                    passLetter
                      ? "text-green-400 flex item-center"
                      : "flex item-center text-red-400"
                  }
                >
                  {passLetter ? (
                    <FaCheck className="mt-1" />
                  ) : (
                    <GoDotFill className="mt-1" />
                  )}
                  &nbsp; Lowercase & Uppercase
                </li>
                <li
                  className={
                    passNumber
                      ? "text-green-400 flex item-center"
                      : "flex item-center text-red-400"
                  }
                >
                  {passNumber ? (
                    <FaCheck className="mt-1" />
                  ) : (
                    <GoDotFill className="mt-1" />
                  )}
                  &nbsp; Numbers (0-9)
                </li>
                <li
                  className={
                    passChar
                      ? "text-green-400 flex item-center"
                      : "flex item-center text-red-400"
                  }
                >
                  {passChar ? (
                    <FaCheck className="mt-1" />
                  ) : (
                    <GoDotFill className="mt-1" />
                  )}
                  &nbsp; Special Character (!@#$%^&*)
                </li>
                <li
                  className={
                    passLength
                      ? "text-green-400 flex item-center"
                      : "flex item-center text-red-400"
                  }
                >
                  {passLength ? (
                    <FaCheck className="mt-1" />
                  ) : (
                    <GoDotFill className="mt-1" />
                  )}
                  &nbsp; At Least 8 Characters
                </li>
              </motion.ul>
            )}
          </div>
        </form>
      </motion.div>

      <DevTool control={control} />
    </div>
  );
};

export default Register;
