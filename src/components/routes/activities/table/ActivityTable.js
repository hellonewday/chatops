import MaterialTable from "material-table";
import React from "react";
import { tableIcons } from "./TableIcons";

function ActivityTable({user}) {
  return (
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
      data={user.data && user.data.activities ? user.data.activities : []}
      title="Danh sách chi tiết hoạt động"
      icons={tableIcons}
      options={{
        filtering: true,
        exportButton: true,
        exportAllData: true,
        grouping: true,
      }}
    />
  );
}

export default ActivityTable;
