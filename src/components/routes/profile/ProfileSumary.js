import { Typography } from "@material-ui/core";
import React from "react";

function ProfileSumary({user}) {
  return (
    <div>
      <Typography variant="h4">
        Hello {user && user.data ? user.data.username : ""},
      </Typography>
      <Typography variant="h6">
        Số lần hoạt động ghi nhận:{" "}
        {user && user.data ? user.data.activities.length : 0}
      </Typography>
      <Typography variant="h6">
        Ngày tạo tài khoản: {user && user.data ? user.data.createdAt : 0}
      </Typography>
    </div>
  );
}

export default ProfileSumary;
