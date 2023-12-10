import React, { useEffect, useState } from "react";
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
});

const NewRegister = () => {
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);

  const [pass, setPass] = useState("");
  const [passLetter, setPassLetter] = useState(false);
  const [passNumber, setPassNumber] = useState(false);
  const [passChar, setPassChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isValid, isDirty, isSubmitting, isSubmitSuccessful } =
    formState;

  const handlePasswordCheck = (e) => {
    const password = e.target.value;
    setPass(password);
    console.log(password);
  };

  useEffect(() => {
    // check for uppercase and lowercase letters
    pass.match(/^([a-z].*[A-Z])|([A-Z].*[a-z])/)
      ? setPassLetter(true)
      : setPassLetter(false);

    // check for Number
    pass.match(/([0-9])/) ? setPassNumber(true) : setPassNumber(false);

    // check for special characters
    pass.match(/([!,%,&,@,#,$,^,*,?,_,~])/)
      ? setPassChar(true)
      : setPassChar(false);

    // check for password length
    pass.length >= 8 ? setPassLength(true) : setPassLength(false);
  }, [pass]);

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
        <h2 className="text-3xl text-center text-red">New Register</h2>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
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
              onFocus={() => setShowPasswordStrength(true)}
              onChange={handlePasswordCheck}
              className="w-full"
            />
            <p className="text-sm text-red-400">{errors.password?.message}</p>
          </div>
          <button
            disabled={!passLength}
            className={`font-Poppins font-medium py-2 rounded-sm ${
              !passLength
                ? "bg-slate-300 text-white"
                : "bg-color-primary text-white hover:bg-light-blue"
            }`}
          >
            Login
          </button>

          {/* reset password link */}
          <div className="">
            <Link to="/reset">Reset Password</Link>
          </div>

          {/* password strength indicator */}
          <div>
            {showPasswordStrength && (
              <ul className="flex flex-col bg-slate-300 p-4">
                <p>Password Strength Checker</p>
                <li
                  className={
                    passLetter
                      ? "flex item-center text-green-500"
                      : "flex item-center text-red-500"
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
                      ? "flex item-center text-green-500"
                      : "flex item-center text-red-500"
                  }
                >
                  {passNumber ? (
                    <FaCheck className="mt-1" />
                  ) : (
                    <GoDotFill className="mt-1" />
                  )}
                  &nbsp; Number (0-9)
                </li>
                <li
                  className={
                    passChar
                      ? "flex item-center text-green-500"
                      : "flex item-center text-red-500"
                  }
                >
                  {passChar ? (
                    <FaCheck className="mt-1" />
                  ) : (
                    <GoDotFill className="mt-1" />
                  )}
                  &nbsp; Special Characters (!@#$%^&*)
                </li>
                <li
                  className={
                    passLength
                      ? "flex item-center text-green-500"
                      : "flex item-center text-red-500"
                  }
                >
                  {passLength ? (
                    <FaCheck className="mt-1" />
                  ) : (
                    <GoDotFill className="mt-1" />
                  )}
                  &nbsp; At least 8 characters
                </li>
              </ul>
            )}
          </div>
        </form>
      </motion.div>

      <DevTool control={control} />
    </div>
  );
};

export default NewRegister;
