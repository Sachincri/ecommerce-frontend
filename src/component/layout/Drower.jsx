// DrawerComponent.jsx
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";

import { Link } from "react-router-dom";
const DrawerComponent = ({ listArray }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <Box>
      <GiHamburgerMenu
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: "white",
          marginLeft: 10,
        }}
        onClick={toggleDrawer(true)}
      />

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 280 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            sx={{
              bgcolor: "primary.main",
              width: 280,
              height: 60,
              alignItems: "center",
              display: "flex",
              p: 2,
              color: "#fff",
            }}
          >
            sachin
          </Box>
          <Box sx={{ mt: 2 }}>
            {listArray.map((text, index) => (
              <Link
                key={index}
                to={text.path}
                style={{
                  display: "flex",
                  padding: 8,
                  fontSize: 19,
                  color: "#7a7a7a",
                  fontWeight: 500,
                }}
              >
                <Box>{text.icon}</Box>
                <Box sx={{ pl: 2 }}>{text.name}</Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default DrawerComponent;
