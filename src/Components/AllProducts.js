import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rate } from "antd";

function AllProducts({ data, img }) {
  const navigate = useNavigate();
  
  return data.map((e, inx) => {
    return (
      <div
        className="w-72 h-form2 rounded-md shadow-md hover:bg-slate-100 p-3 mb-3 cursor-pointer transition-all "
        key={inx}
      >
        <Link
          to={`${
            e.id
              ? `/product/${e.id}`
              : e.product_id
              ? `/product/${e.product_id}`
              : ""
          }`}
          className={"no-underline "}
        >
          <div className="rounded-md p-2 w-full bg-white m-auto bg-cover  ">
            <img src={img} alt="" />
          </div>
          <span className="  text-sm text-font2 line-clamp-1 mt-3 ">
            {e.labeller ? e.labeller : ""}
          </span>
          <span
            className="no-underline text-font2 hover:text-SSReg"
            onClick={() => navigate(``)}
          >
            <span className="text-2xl line-clamp-1">{e.name}</span>
          </span>
          <div>
            <Rate disabled value={e.rating} />
          </div>
        </Link>
        <div className=" relative">
          <div className="flex justify-between">
            <span className=" mb-1 block mt-4 text-SReg text-xl   ">
              {e.availability === true ? (
                <div>{e.price} $</div>
              ) : e.availability === false ? (
                <span className="block absolute b-0 -left-4 p-1 bg-red-500 text-white rounded-r-md">
                  Not available
                </span>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
      </div>
    );
  });
}

export default AllProducts;
