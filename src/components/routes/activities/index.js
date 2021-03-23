import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Grid } from "@material-ui/core";
import ActivityTable from "./table/ActivityTable";
import ActitvityChart from "./chart/ActitvityChart";
moment.locale("vi");

function ActivityLog(props) {
  const user = useSelector((state) => state.accounts.user);

  return (
    <div>
      {user.data && user.data.activities ? (
        <div>
          {" "}
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
            <Grid item xs={12} lg={6}>
              <ActitvityChart user={user} />
            </Grid>
            <Grid item xs={12} lg={12}>
              <ActivityTable user={user} />
            </Grid>
          </Grid>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ActivityLog;
