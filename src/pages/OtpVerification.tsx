import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../api/api";
import { Button, Spinner } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/loggedInSlice";

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn, "isLoggedIn");

  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!one || !two || !three || !four) {
      setError(true);
      setIsLoading(false);
      return;
    }
    verifyOtp("otp/verify", {
      otp: `${one + two + three + four}`,
      email: location.state.email,
    }).then((res) => {
      setIsLoading(false);
      if (res.status === 200) {
        dispatch(login(isLoggedIn));
        navigate("/");
      } else {
        setError(true);
      }
    });
  };

  return (
    <div className=" flex min-h-screen flex-col justify-center items-center overflow-hidden dark:bg-gray-900">
      <div className=" dark:bg-gray-900 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl dark:text-gray-50">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {location?.state?.email}</p>
            </div>
          </div>

          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg dark:bg-gray-700 bg-gray-50 dark:text-gray-50 focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      value={one}
                      onChange={(e) => setOne(e.target.value)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg dark:bg-gray-700 bg-gray-50 dark:text-gray-50 focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      value={two}
                      onChange={(e) => setTwo(e.target.value)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg dark:bg-gray-700 bg-gray-50 dark:text-gray-50 focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      value={three}
                      onChange={(e) => setThree(e.target.value)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg dark:bg-gray-700 bg-gray-50 dark:text-gray-50 focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      value={four}
                      onChange={(e) => setFour(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  {error && (
                    <p className="text-red-500 font-bold text-xl">
                      OTP is not valid
                    </p>
                  )}
                  <div>
                    <Button
                      type="submit"
                      gradientDuoTone="purpleToBlue"
                      outline
                      disabled={isLoading ? true : false}
                      className="w-full"
                    >
                      {isLoading && (
                        <Spinner
                          aria-label="Spinner button example"
                          size="sm"
                        />
                      )}
                      <span className="pl-3">
                        {isLoading ? "Verifying..." : "Verify Account"}
                      </span>
                    </Button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>{" "}
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
