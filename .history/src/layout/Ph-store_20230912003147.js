import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import { getImage, getUserData } from "../states/authSalice";
import { reset } from "../states/productSlice";
export const checkContext = React.createContext();
const CheckProvider = checkContext.Provider;


function Dashboard() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.authSlice);

  const [check, setCheck] = useState(false);

  useEffect(() => {
    dispatch(reset());
    dispatch(getUserData());
    if (userId) {
      dispatch(getImage(userId));
    }
  }, [dispatch, userId]);
  
  return (
    <Fragment>
      <div className="flex">
        <CheckProvider value={check}>
          <SideBar />
        </CheckProvider>
        <div className={`w-full ${check ? "show:w-full" : "show:w-88%"}`}>
          <div
            className={`fixed w-custom2 ${
              check ? "show:w-custom" : "show:w-88%"
            } z-20 `}
          >
            <Header set={setCheck} check={check} />
          </div>
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
}
