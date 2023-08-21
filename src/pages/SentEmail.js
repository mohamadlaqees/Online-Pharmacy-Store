import * as React from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetA, verify } from "../states/authSalice";
import Loading from "../Components/loading";

export default function SentEmail() {
  const { errorA, successA, loadingA, email } = useSelector(
    (state) => state.authSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (successA !== null) {
      msg("sucesss", successA);
      dispatch(resetA());
    } else {
      if (errorA !== null) {
        msg("error", errorA);
      }
    }
  }, [successA, errorA, navigate, dispatch]);

  const msg = (type, msg) => {
    switch (type) {
      case "sucesss":
        message.success(msg);
        break;
      case "error":
        message.error(msg);
        break;
      default:
        return "";
    }
  };

  const buttonHandler = () => {
    dispatch(verify());
    localStorage.setItem("email", email);
  };

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div className="email">
          <div className="mt-20 text-lg text-center ">
            click to send Email verification to your email :
            <div className="text-SWord mt-10">{email}</div>
            <div className="d-grid gap-2 mt-20">
              <Loading
                error={errorA}
                loading={loadingA}
                clss={"p-1 border-SReg  border-2 text-SReg rounded-md"}
              >
                <button
                  type="submit"
                  className="p-1 border-SReg  border-2 text-SReg rounded-md hover:text-white hover:bg-SReg hover:border-SReg duration-.3s"
                  onClick={() => buttonHandler()}
                >
                  Send
                </button>
              </Loading>
            </div>
          </div>
        </div>
        <div className="h-full">
          <img
            src="/images/pharmacist_1.jpg"
            alt=""
            className="h-photo hidden xl:block "
          />
        </div>
      </div>
    </React.Fragment>
  );
}
