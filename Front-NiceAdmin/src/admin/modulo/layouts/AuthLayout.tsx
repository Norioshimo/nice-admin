import { Outlet } from "react-router";

const AuthLayout = () => {
  
  console.log("AuthLayout rendered");
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
