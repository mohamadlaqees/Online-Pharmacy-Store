import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import { getImage, getUserData } from "../states/authSalice";
import { reset } from "../states/productSlice";
export const checkContext = React.createContext();
const CheckProvider = checkContext.Provider;

import React, { useRef } from "react";

// function Dashboard() {
//   const dispatch = useDispatch();
//   const { userId } = useSelector((state) => state.authSlice);

//   const [check, setCheck] = useState(false);

//   useEffect(() => {
//     dispatch(reset());
//     dispatch(getUserData());
//     if (userId) {
//       dispatch(getImage(userId));
//     }
//   }, [dispatch, userId]);
  
//   return (
//     <Fragment>
//       <div className="flex">
//         <CheckProvider value={check}>
//           <SideBar />
//         </CheckProvider>
//         <div className={`w-full ${check ? "show:w-full" : "show:w-88%"}`}>
//           <div
//             className={`fixed w-custom2 ${
//               check ? "show:w-custom" : "show:w-88%"
//             } z-20 `}
//           >
//             <Header set={setCheck} check={check} />
//           </div>
//           <Outlet />
//         </div>
//       </div>
//     </Fragment>
//   );
// }

// export default Dashboard;
// import React from 'react'
const movieNameValue=''
const ratingValue=null
const durationValue=''

const saveMovieName=(movieName)=>{
  movieNameValue=movieName;
}
const saveRating=(rating)=>{
  ratingValue=rating;
}
const saveDuration=(duration)=>{
  durationValue=duration;
}
const Context=React.createContext();

export const ContextProvider=({children})=>{
  return(
    <Context.Provider value={{values:{movieNameValue,ratingValue,durationValue},func:{saveMovieName,saveDuration,saveRating}}}>
      {children}
    </Context.Provider>
  )
}

