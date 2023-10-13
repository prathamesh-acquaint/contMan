import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Checkbox, Label, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
type Inputs = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    registerUser(data, "users/register")
      .then((res) => {
        if (res.status == 201) {
          setIsLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        alert(err.response.data.message);
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
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className=" space-y-6 flex max-w-md flex-col gap-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Your username" />
              </div>
              <TextInput
                {...register("username", { required: true })}
                color={errors.username ? "failure" : "gray"}
                id="username"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
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
                id="password"
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
              <span className="pl-3">
                {isLoading ? "loading..." : "Signup"}
              </span>
            </Button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an Account?{" "}
            <NavLink
              to="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Please Login
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
