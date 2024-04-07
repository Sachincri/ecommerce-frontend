import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box } from "@mui/material";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: 'Shipping',
    },
    {
      label: 'OrderSummary',
    },
    {
      label: 'Payment',
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <main className="CheckoutSteps">
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        style={stepStyles}
        sx={{p:2,width:'100%'}}
      >
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
              <Box >{item.label}</Box>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </main>
  );
};

export default CheckoutSteps;
