import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import MaterialTable from "material-table";
import { tableIcons } from "../TableIcons";
import { Bar } from "react-chartjs-2";
import { Grid } from "@material-ui/core";
moment.locale("vi");

function personalReport(data) {
  let statistics = data.map((item) => {
    return {
      type: item.actType,
      date: item.statistical.date,
      hour: item.statistical.hour,
    };
  });
  // console.log(statistics);

  // Problem 1: Count frequency in date.
  var a = statistics.reduce(function (acc, curr) {
    if (typeof acc[curr.date] == "undefined") {
      acc[curr.date] = 1;
    } else {
      acc[curr.date] += 1;
    }

    return acc;
  }, {});

  let dates = Object.keys(a);
  let typeFreq = [];
  dates.forEach((item) => {
    let fragment = statistics.filter((s) => {
      return s.date === item;
    });

    let redu = fragment.reduce(function (acc, curr) {
      if (typeof acc[curr.type] == "undefined") {
        acc[curr.type] = 1;
      } else {
        acc[curr.type] += 1;
      }
      return acc;
    }, {});

    let res = {
      date: item,
      activities: redu,
    };

    typeFreq.push(res);
  });

  return typeFreq;
}

function ActivityLog(props) {
  const user = useSelector((state) => state.accounts.user);

  useEffect(() => {
    // console.log(personalReport(user.data.activities));
  }, []);
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
              <MaterialTable
                columns={[
                  {
                    title: "Mã hoạt động",
                    field: "id",
                    filtering: false,
                    grouping: false,
                  },
                  {
                    title: "Loại hoạt động",
                    field: "actType",
                  },
                  {
                    title: "Nội dung",
                    field: "content",
                    filtering: false,
                    grouping: false,
                  },
                  {
                    title: "Ngày khởi tạo",
                    field: "createdAt",
                    filtering: false,
                    grouping: false,
                  },
                ]}
                data={
                  user.data && user.data.activities ? user.data.activities : []
                }
                title="Danh sách chi tiết hoạt động"
                icons={tableIcons}
                options={{
                  filtering: true,
                  exportButton: true,
                  exportAllData: true,
                  grouping: true,
                }}
              />
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
