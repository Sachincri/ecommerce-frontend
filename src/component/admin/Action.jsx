import { useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Button } from "@mui/material";

const Actions = ({ id, deleteHandler, editRoute }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="action">
        {editRoute !== "review" && (
          <Link to={`/admin/${editRoute}/${id}`}>
            <MdModeEdit />
          </Link>
        )}
        <button onClick={() => setOpen(true)}>
          <MdDelete />
        </button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        height={"10rem"}
      >
        <DialogTitle textAlign={"center"}>
          <RiErrorWarningLine fontSize={"4rem"} color={"#ff0000"} />
        </DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product ?
        </DialogContent>
        <DialogActions>
          <Button color={"error"} onClick={() => deleteHandler(id)}>
            Yes, i'm sure
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
