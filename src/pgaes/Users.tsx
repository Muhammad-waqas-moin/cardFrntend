import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { fetchUser } from "../features/User/UserSlice";
const Users = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.app.users);
  // console.log(data);

  const fetch = async () => {
    const response = await dispatch(fetchUser());
    console.log(response);
  };

  useEffect(() => {
    const userData = async () => {
      await dispatch(fetchUser());
    };
    userData();
  }, []);
  return <div>Users</div>;
};

export default Users;
