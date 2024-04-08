import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import { Box, Avatar } from "@mui/material";
import Loader from "../../layout/Loader";
import Actions from "../Action";
import { deleteUser, getAllUsers } from "../../../Redux/action/admin";

const UsersList = () => {
  const { users, error, message, loading } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();

  const deleteUserHandler = (userId) => {
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    window.scrollTo(0, 0);
    dispatch(getAllUsers());
  }, [dispatch, error, message]);

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      minWidth: 20,
      renderCell: (params) => {
        return <Avatar src={params.row.avatar} alt={params.row.name} />;
      },
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 60,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            {params.row.role === "admin" ? (
              <span>{params.row.role}</span>
            ) : (
              <span>{params.row.role}</span>
            )}
          </>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      minWidth: 100,
      flex: 0.2,
    },
    {
      field: "id",
      headerName: "User_Id",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 110,
      flex: 0.2,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Actions
            editRoute={"user"}
            deleteHandler={deleteUserHandler}
            id={params.row.id}
            name={params.row.name}
          />
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.unshift({
        id: item._id,
        name: item.name,
        avatar: item.avatar?.url,
        email: item.email,
        role: item.role,
        createdAt: new Date(item.createdAt).toISOString().substring(0, 10),
      });
    });

  return (
    <section className="tableClass">
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h2 className="heading">Dashboard</h2>

            <h1>Manage Users</h1>
            <Box sx={{ height: "100%", width: "100%" }}>
              <DataGrid
                columns={columns}
                rows={rows}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10]}
              />
            </Box>
          </div>
        </>
      )}
    </section>
  );
};

export default UsersList;
