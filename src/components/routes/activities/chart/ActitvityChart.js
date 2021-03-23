import React from "react";
import { Bar } from "react-chartjs-2";
import { personalReport } from "./utils";

function ActitvityChart({user}) {
  return (
    <div>
      <Bar
        data={{
          labels: personalReport(
            user.data && user.data.activities ? user.data.activities : []
          ).map((item) => {
            return item.date;
          }),
          datasets: [
            {
              label: "Intention",
              backgroundColor: "rgba(52, 180, 235,0.5)",
              data: personalReport(
                user.data && user.data.activities ? user.data.activities : []
              ).map((item) => {
                return item.activities["Intention"];
              }),
            },
            {
              label: "Correction",
              backgroundColor: "rgba(196, 196, 24,0.5)",
              data: personalReport(
                user.data && user.data.activities ? user.data.activities : []
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
        <b>Thống kê số lượt hoạt động của tài khoản {user.data.username}</b>
      </div>
    </div>
  );
}

export default ActitvityChart;
