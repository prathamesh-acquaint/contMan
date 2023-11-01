import { Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/loggedInSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout(isLoggedIn));
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <div className="min-h-screen min-w-full flex flex-col gap-5 items-center justify-center ">
      <h1 className="dark:text-gray-50">Click here to Logout.</h1>
      <Button
        type="submit"
        gradientDuoTone="purpleToBlue"
        outline
        onClick={handleClick}
      >
        <span className="pl-3">Logout</span>
      </Button>
    </div>
  );
};

export default Logout;
