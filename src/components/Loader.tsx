import { Spinner } from "flowbite-react";

const Loader = () => {
  return (
    <div className="min-h-screen min-w-full absolute top-0 left-0 flex items-center justify-center">
      <Spinner aria-label="Extra small spinner example" size="xl" />
    </div>
  );
};

export default Loader;
