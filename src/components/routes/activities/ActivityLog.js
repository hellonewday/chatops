import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import { Grid } from "@material-ui/core";
import { personalReport } from "./utils";
import ActivityTable from "./table/ActivityTable";
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
              <Bar
                data={{
                  labels: personalReport(
                    user.data && user.data.activities
                      ? user.data.activities
                      : []
                  ).map((item) => {
                    return item.date;
                  }),
                  datasets: [
                    {
                      label: "Intention",
                      backgroundColor: "rgba(52, 180, 235,0.5)",
                      data: personalReport(
                        user.data && user.data.activities
                          ? user.data.activities
                          : []
                      ).map((item) => {
                        return item.activities["Intention"];
                      }),
                    },
                    {
                      label: "Correction",
                      backgroundColor: "rgba(196, 196, 24,0.5)",
                      data: personalReport(
                        user.data && user.data.activities
                          ? user.data.activities
                          : []
                      ).map((item) => {
                        return item.activities["Correction"];
                      }),
                    },
                  ],
                }}
                width={100}
                height={50}
                options={{
                  barValueSpacing: 20,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          min: 0,
                        },
                      },
                    ],
                  },
                }}
              />
              <div style={{ textAlign: "center" }}>
                <b>
                  Thống kê số lượt hoạt động của tài khoản {user.data.username}
                </b>
              </div>
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
