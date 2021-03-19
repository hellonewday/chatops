import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";
import moment from "moment";

moment.locale("vi");
function ActivityLog(props) {
  const user = useSelector((state) => state.accounts.user);
  useEffect(() => {}, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã hoạt động</TableCell>
              <TableCell align="center">Loại hoạt động</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Ngày khởi tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.data && user.data.activities
              ? user.data.activities.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell align="center">
                      <Badge
                        badgeContent={item.actType}
                        color={
                          item.actType === "Intention" ? "secondary" : "primary"
                        }
                      />
                    </TableCell>
                    <TableCell>{item.content}</TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ActivityLog;
