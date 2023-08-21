import React, { useEffect } from "react";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
import axios from "./axios";
export default function Notifications() {
  async function notification() {
    try {
      const { data } = await axios.post("/user/2");
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }
  // useEffect(() => {
  //   notification();
  //   const pusher = Pusher;
  //   const echo = new Echo({
  //     broadcaster: "pusher",
  //     key: "dfad91118ef078597edb",
  //     cluster: "mt1",
  //     wsHost: "ws-mt1.pusher.com",
  //     wsPort: 80,
  //     wssPort: 443,
  //     forceTLS: true,
  //     enabledTransports: ["ws", "wss"],
  //   });
  //   echo
  //     .private("events")
  //     .listen("RealTimeMessage", (e) =>
  //       console.log("RealTimeMessage: " + e.message)
  //     );
  // }, []);
  return (
    <>
      <div className="p-2 hover:bg-slate-200 transition-all border border-b-4 border-gray-500">
        <h5>Title</h5>
        <span className="block h-11 overflow-hidden cursor-pointer text-ellipsis ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius facilis
          maxime dignissimos iusto veritatis, vel modi non accusantium dolor!
          Asperiores sapiente possimus doloremque recusandae perferendis beatae
          unde earum, minima obcaecati?
        </span>
      </div>
      <div className="p-2 hover:bg-slate-200 transition-all border border-b-4 border-gray-500">
        <h5>Title</h5>
        <span className="block h-11 overflow-hidden cursor-pointer text-ellipsis ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius facilis
          maxime dignissimos iusto veritatis, vel modi non accusantium dolor!
          Asperiores sapiente possimus doloremque recusandae perferendis beatae
          unde earum, minima obcaecati?
        </span>
      </div>
      <div className="p-2 hover:bg-slate-200 transition-all border border-b-4 border-gray-500">
        <h5>Title</h5>
        <span className="block h-11 overflow-hidden cursor-pointer text-ellipsis ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius facilis
          maxime dignissimos iusto veritatis, vel modi non accusantium dolor!
          Asperiores sapiente possimus doloremque recusandae perferendis beatae
          unde earum, minima obcaecati?
        </span>
      </div>
      <div className="p-2 hover:bg-slate-200 transition-all border border-b-4 border-gray-500">
        <h5>Title</h5>
        <span className="block h-11 overflow-hidden cursor-pointer text-ellipsis ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius facilis
          maxime dignissimos iusto veritatis, vel modi non accusantium dolor!
          Asperiores sapiente possimus doloremque recusandae perferendis beatae
          unde earum, minima obcaecati?
        </span>
      </div>
      <div className="p-2 hover:bg-slate-200 transition-all border border-b-4 border-gray-500">
        <h5>Title</h5>
        <span className="block h-11 overflow-hidden cursor-pointer text-ellipsis ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius facilis
          maxime dignissimos iusto veritatis, vel modi non accusantium dolor!
          Asperiores sapiente possimus doloremque recusandae perferendis beatae
          unde earum, minima obcaecati?
        </span>
      </div>
    </>
  );
}
