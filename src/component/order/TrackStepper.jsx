import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";

const TrackStepper = ({
  activeStep,
  orderOn,
  processingAt,
  shippedAt,
  deliveredAt,
}) => {
  const formatDate = (dt) => {
    return new Date(dt).toUTCString().substring(0, 16);
  };
  const steps = [
    {
      status: "Ordered",
      dt: formatDate(orderOn),
    },
    {
      status: "Processing",
      dt: formatDate(processingAt),
    },
    {
      status: "Shipped",
      dt: formatDate(shippedAt),
    },
    {
      status: "Delivered",
      dt: formatDate(deliveredAt),
    },
  ];
  const opt = { color: "green", fontSize: "20px" };

  const completedIcon = (
    <span>
      <BsCheckCircleFill style={opt} />
    </span>
  );
  const pendingIcon = (
    <span>
      <BsCircle />
    </span>
  );

  return (
    <>
      <Box className="big">
        <Stepper activeStep={activeStep} sx={{ width: 1000 }} alternativeLabel>
          {steps.map((item, index) => (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                icon={activeStep >= index ? completedIcon : pendingIcon}
              >
                {activeStep >= index ? (
                  <div>
                    <span>{item.status}</span>
                    <p>{item.dt && item.dt}</p>
                  </div>
                ) : (
                  <span>{item.status}</span>
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>{" "}
      <Box className="small">
        {" "}
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((item, index) => (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                icon={activeStep >= index ? completedIcon : pendingIcon}
              >
                {activeStep >= index ? (
                  <div>
                    <span>{item.status}</span>
                    <span> {item.dt && item.dt}</span>
                  </div>
                ) : (
                  <span>{item.status}</span>
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
};

export default TrackStepper;
