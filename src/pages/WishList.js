import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWishMedicins, getWishMedicins } from "../states/productSlice";
import { message } from "antd";
import Loading from "../Components/loading";
import AllWishMedicins from "../Components/AllWishMedicins";

function WishList() {
  const { loading, error, success, wishMedicins } = useSelector(
    (state) => state.productSlice
  );
  const dispatch = useDispatch();

  const msg = (type, msg) => {
    switch (type) {
      case "success":
        message.success(msg);
        break;
      case "error":
        message.error(msg);
        break;
      default:
        return "";
    }
  };

  React.useEffect(() => {
    if (success !== null && wishMedicins.length > 0) {
      msg("success", `${success}`);
    }
    if (error !== null) {
      msg("error", `${error}`);
    }
  }, [error, success, wishMedicins]);

  useEffect(() => {
    dispatch(getWishMedicins());
  }, [dispatch]);

  const delMed = (id) => {
    dispatch(addWishMedicins(id));
    dispatch(getWishMedicins());
  };
  
  return (
    <div className="page ">
      <div className="bg-white pt-4 pb-4 shadow-md rounded-md  relative ">
        <div className="absolute top-0 w-full p-1 bg-SReg text-white font-bold text-center rounded-md">
          WishList
        </div>
        <div className="absolute bottom-0 w-full h-7  bg-SReg text-white font-bold text-center rounded-md"></div>
        {wishMedicins.length > 0 ? (
          <Loading loading={loading} check={false} error={error}>
            <AllWishMedicins
              loading={loading}
              delMed={delMed}
              wishMedicins={wishMedicins}
            />
          </Loading>
        ) : (
          <div className={`p-2 ${"border-b-2"} border-gray-200 ${"mt-2"}`}>
            <div className="h-20 text-4xl text-gray-300  flex justify-center items-center">
              Empty
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;
