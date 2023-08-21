import { useSelector } from "react-redux";

function Profile() {
  const { userData, image } = useSelector((state) => state.authSlice);
  
  return (
    <div className="page2">
      <div className="md:flex md:justify-center md:gap-4">
        <div className="rounded-md bg-white sm:w-80 shadow-md p-3 w-64 md:h-form  ml-auto  mr-auto  md:w-72 mb-4  md:mt-24 md:ml-0 md:mr-0 md:mb-0 ">
          <div className="p-1">
            <img
              src={image ? image : "images/user.jpg"}
              alt=""
              className="rounded-full w-64 h-64"
            />
          </div>
          <span className="p-2 block text-center font-bold">
            {`${userData.first_name} ${userData.last_name}`}{" "}
          </span>
          <span className="p-2 block text-center text-font2">{`${userData.type}`}</span>
          <span className="p-2 block text-center text-green-400">{`${userData.account_status}`}</span>
        </div>
        <div className=" ml-auto mr-auto rounded-md bg-white shadow-md p-3 w-96 md:w-form h-form  md:mt-24  md:ml-0 md:mr-0">
          <div className="flex justify-around mb-2 border-b-2 border-slate-100 p-3 text-font1">
            <span className="block">Full name</span>
            <span className="text-font2 md:mr-40 block">{`${userData.first_name} ${userData.last_name}`}</span>
          </div>
          <div className="flex justify-around mb-2 border-b-2 border-slate-100 p-3 text-font1">
            <span className="block"> Email</span>
            <span className="text-font2 md:mr-40 block">{`${userData.email}`}</span>
          </div>
          <div className="flex justify-around mb-2 border-b-2 border-slate-100 p-3 text-font1">
            <span className="block">Gender</span>
            <span className="text-font2 md:mr-40 block">{`${userData.gender}`}</span>
          </div>
          <div className="flex justify-around mb-2 border-b-2 border-slate-100 p-3 text-font1">
            <span className="block"> Address</span>
            <span className="text-font2 md:mr-40 block">{`${userData.address}`}</span>
          </div>
          <div className="flex justify-around mb-2 border-b-2 border-slate-100 p-3 text-font1">
            <span className="block"> Budget</span>
            <span className="text-font2 md:mr-40 block">{`${userData.money}`}</span>
          </div>
          <div className="flex justify-around mb-2 border-b-2 border-slate-100 p-3 text-font1">
            <span className="block">Mobile</span>
            <span className="text-font2 md:mr-40 block">{`${
              userData.mobile ? userData.mobile : "No phone number"
            }`}</span>
          </div>
          <div className="flex justify-around mb-2  p-3 text-font1">
            <span className="block"> Birth date</span>
            <span className="text-font2 md:mr-40 block">{`${userData.date_of_birth}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
