import React from "react";
import { Link } from "react-router-dom";

function AllWishMedicins({ wishMedicins, delMed }) {
  return wishMedicins?.map((e, inx) => {
    return (
      <div className="flex justify-between cursor-pointer hover:bg-slate-200">
        <Link to={`/product/${e.id}`} className={"no-underline w-full "}>
          <div
            className={`p-2 ${
              inx === wishMedicins.length - 1 ? "border-b-0 mb-1" : "border-b-2"
            } border-gray-200 ${
              inx === 0 ? "mt-2" : ""
            } flex justify-between  transition-all`}
            key={e.id}
          >
            <div className="flex gap-3">
              <div>
                <img
                  src="/images/med.jpg"
                  alt=""
                  className="rounded-full w-20 h-20"
                />
              </div>
              <div className="flex justify-center items-center">
                <span className="text-font2">{e.name}</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex gap-3 items-center ">
          <button
            className="text-red-500 hover:text-red-600 text-xl transition-all mr-4"
            onClick={() => delMed(e.id)}
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>{" "}
      </div>
    );
  });
}

export default AllWishMedicins;
