import React, { useEffect } from "react";
import { deleteOrder, getAllOrders } from "../../../Redux/action/admin";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Sidebar from "../Sidebar";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../layout/Loader";
import Actions from "../Action";

const OrderList = () => {
  const { error, message, orders, loading } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    dispatch(getAllOrders());
    window.scrollTo(0, 0);
  }, [dispatch, error, message]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "Delivered" ? (
              <span style={{ color: "green", fontWeight: 600 }}>
                {params.row.status}
              </span>
            ) : params.row.status === "Shipped" ? (
              <span style={{ color: "orange", fontWeight: 600 }}>
                {params.row.status}
              </span>
            ) : params.row.status === "Processing" ? (
              <span style={{ color: "blue", fontWeight: 600 }}>
                {params.row.status}
              </span>
            ) : (
              <span style={{ color: "red", fontWeight: 600 }}>
                {params.row.status}
              </span>
            )}
          </>
        );
      },
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 100,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        return <span>₹{params.row.amount.toLocaleString()}</span>;
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 10,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "orderOn",
      headerName: "Order On",
      minWidth: 120,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "processingOn",
      headerName: "Processing On",
      minWidth: 120,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "shippedOn",
      headerName: "Shipped On",
      minWidth: 120,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "deliveredOn",
      headerName: "Delivered On",
      minWidth: 120,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 200,
      flex: 0.2,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <Actions
            editRoute={"order"}
            deleteHandler={deleteOrderHandler}
            id={params.row.id}
          />
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((order) => {
      rows.unshift({
        id: order._id,
        name: order.name,
        status: order.orderStatus,
        amount: order.totalAmount,
        itemsQty: order.orderItems.length,
        orderOn: order.createdAt && order.createdAt.substring(0, 10),
        processingOn: order.processingAt && order.processingAt.substring(0, 10),
        shippedOn: order.shippedAt && order.shippedAt.substring(0, 10),
        deliveredOn: order.deliveredAt && order.deliveredAt.substring(0, 10),
      });
    });
  return (

      <section className="tableClass">
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div>
            <h2 className="heading">Dashboard</h2>

            <h1>Manage Orders</h1>
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
                sx={{ textAlign: "center" }}
              />
            </Box>
          </div>
        )}
      </section>

  );
};

export default OrderList;
