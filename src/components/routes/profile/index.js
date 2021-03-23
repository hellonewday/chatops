import {

  Container,
  Divider,

} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestEdit } from "../../../redux/actions/accounts";
import ProfileEditForm from "./ProfileEditForm";
import ProfileSumary from "./ProfileSumary";

function Profile(props) {
  const [profile, setProfile] = useState({});
  const [status, setStatus] = useState("");

  const user = useSelector((state) => state.accounts.user);

  const response = useSelector((state) => state.accounts.editResponse);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (profile.retype !== profile.password) {
      setStatus("conflict");
    } else {
      let data = {
        username: profile.username,
        password: profile.password,
        id: window.localStorage.getItem("id"),
        authorization: window.localStorage.getItem("auth_token"),
      };
      dispatch(requestEdit(data));
      console.log(response);
    }
  };
  return (
    <div style={{ padding: 30 }}>
      <Container>
        <ProfileSumary user={user} />

        <br />
        <Divider />
        <br />

        <ProfileEditForm
          user={user}
          status={status}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          response={response}
        />
      </Container>
    </div>
  );
}

export default Profile;
