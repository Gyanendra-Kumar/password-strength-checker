import React from "react";
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

const schema = yup.object({
  email: yup
    .string()
    .email("Email format is not valid!")
    .required("Email is required!"),
  password: yup.string().required("Password is required").min(6),
});

const Login = () => {
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
        <h2 className="text-3xl text-center text-red">Login</h2>

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
              className="w-full"
            />
            <p className="text-sm text-red-400">{errors.password?.message}</p>
          </div>
          <button
            disabled={isSubmitting}
            className="bg-color-primary text-white font-Poppins font-medium py-2 rounded-sm hover:bg-light-blue"
          >
            Login
          </button>

          {/* reset password link */}
          <div className="">
            <Link to="/reset">Reset Password</Link>
          </div>

          <p className="text-center">-- OR --</p>
        </form>

        {/* login with google button */}
        <Button
          startIcon={<Google />}
          sx={{
            backgroundColor: "#FF4500",
            color: "#fff",
            textTransform: "capitalize",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#FF4500",
              color: "#fff",
            },
          }}
        >
          Login With Google
        </Button>

        <p className="text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </motion.div>

      <DevTool control={control} />
    </div>
  );
};

export default Login;
