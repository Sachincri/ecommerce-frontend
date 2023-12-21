import React from "react";
import {
  MdLocalShipping,
  MdAccountBalanceWallet,
  MdLibraryAddCheck,
} from "react-icons/md";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Typography } from "@mui/material";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <MdLocalShipping />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <MdLibraryAddCheck />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <MdAccountBalanceWallet />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  }; 

  return (
    <main className="CheckoutSteps">
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#0356fc" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </main>
  );
};

export default CheckoutSteps;
