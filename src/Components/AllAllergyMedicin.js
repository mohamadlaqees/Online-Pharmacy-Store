import React from "react";

function AllAllergyMedicin({ allergyMedicins, delMed }) {
  return allergyMedicins.map((e, inx) => {
    return (
      <div
        className={`p-2 ${
          inx === allergyMedicins.length - 1 ? "border-b-0 mb-1" : "border-b-2"
        } border-gray-200 ${
          inx === 0 ? "mt-2" : ""
        } flex justify-between cursor-pointer hover:bg-slate-200 transition-all`}
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
        <div className="flex gap-3 items-center">
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

export default AllAllergyMedicin;
