import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

const Parent = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Parent;
