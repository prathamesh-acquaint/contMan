import { NavLink, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser, sendOtp } from "../api/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Checkbox, Label, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setIsLoading(true);
    loginUser(data, "users/login")
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          sendOtp("otp/send-otp", { email: data.email }).then((res) => {
            setIsLoading(false);
            if (res.status === 200) {
              navigate("/otp", { state: { email: data.email } });
            } else {
              console.log("something went wrong while sending OTP");
            }
          });
        } else {
          setIsLoading(false);
          alert("Please enter Correct Details");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-50">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className=" space-y-6 flex max-w-md flex-col gap-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                {...register("email", { required: true })}
                color={errors.email ? "failure" : "gray"}
                id="email1"
                placeholder="name@flowbite.com"
                type="email"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput
                {...register("password", { required: true })}
                color={errors.password ? "failure" : "gray"}
                id="password1"
                type="password"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              outline
              disabled={isLoading ? true : false}
            >
              {isLoading && (
                <Spinner aria-label="Spinner button example" size="sm" />
              )}
              <span className="pl-3">{isLoading ? "loading..." : "Login"}</span>
            </Button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-200">
            Don't have an Account?{" "}
            <NavLink
              to="register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-700 dark:text-indigo-300"
            >
              Please Register
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
