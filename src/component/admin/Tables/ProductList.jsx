import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { Box, Avatar, Rating } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../layout/Loader";
import Actions from "../Action";
import { getAdminProducts, deleteProduct } from "../../../Redux/action/admin";

const ProductList = () => {
  const dispatch = useDispatch();

  const { message, error, products, loading } = useSelector(
    (state) => state.admin
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
    dispatch(getAdminProducts());
  }, [dispatch, message, error]);

  const columns = [
    {
      field: "images",
      headerName: "Image",
      minWidth: 10,
      renderCell: (params) => {
        return <Avatar src={params.row.image} variant="rounded" />;
      },
    },
    {
      field: "name",
      headerName: "Product Name",
      minWidth: 300,
      flex: 0.2,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      headerAlign: "left",
      align: "left",
      flex: 0.2,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 120,
      flex: 0.1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 80,
      flex: 0.1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <Rating
            readOnly
            value={params.row.rating}
            size="small"
            precision={0.5}
            sx={{ color: "green" }}
          />
        );
      },
    },
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Actions
            editRoute={"product"}
            deleteHandler={deleteProductHandler}
            id={params.row.id}
          />
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.unshift({
        id: item._id,
        name: item.name,
        image: item.images[0]?.url,
        category: item.category,
        stock: item.stock,
        price: item.price,
        cprice: item.cuttedPrice,
        rating: item.ratings,
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

            <h1>Manage Product</h1>
            <Box sx={{ height: "90%", width: "100%" }}>
              <DataGrid
                columns={columns}
                rows={rows}
                sx={{ textAlign: "center" }}
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

export default ProductList;
