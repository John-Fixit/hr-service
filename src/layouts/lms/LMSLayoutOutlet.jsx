import { Outlet } from "react-router-dom";
import LmsDrawers from "../../components/core/lms/lms-drawers/lms-drawers";

const LMSLayoutOutlet = () => {
  return (
    <>
      <Outlet />
      <LmsDrawers />
    </>
  );
};

export default LMSLayoutOutlet;
