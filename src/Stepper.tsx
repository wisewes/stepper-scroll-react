import { Box, Container, Grid, Typography } from "@mui/material";
import { useState, useEffect, useRef, useMemo } from "react";
import { useIntersectionObservation } from "./hooks/useInteresctionObservation";
import { useScrollDirection } from "./hooks/useScrollDirection";


interface Step {
  id: number;
  header: string;
  body: string;
  image: string;
  cta?: {
    action: string;
    label: string
  }
}

interface StepperProps {
  steps: Step[]
}

export const Stepper = (props: StepperProps) => {
  const { steps } = props;

  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const isIntersecting = useIntersectionObservation(outerRef);
  const scrollDirection = useScrollDirection();

  const [activeStep, setActiveStep] = useState<number>(1);

  const gotoNextStep = () => {
    if (activeStep === steps.length) return;
    setActiveStep((prevStep) => prevStep + 1);
  }

  const gotoPreviousStep = () => {
    if (activeStep <= 0) return;
    setActiveStep((prevStep) => prevStep - 1);
  }

  const unlockScroll = () => {
    document.body.style.overflow = "auto";
  }

  // useEffect(() => {
  //   const ref = outerRef.current;

  //   if (isIntersecting) {
  //     console.log("is intersecting");
  //     if (ref) {
  //       ref.style.border = "1px solid red";
  //       // document.body.style.overflow = "hidden";
  //     }
  //   } else {
  //     console.log("not intersecting");
  //     if (ref) {
  //       ref.style.border = "none";
  //     }
  //   }
  // }, [isIntersecting]);

  useEffect(() => {
    const ref = innerRef.current;
    const throttle = 2000;

    if (ref) {
      if (isIntersecting && scrollDirection === "down") {
        console.log('intersecting and going down')
        setTimeout(() => {
          gotoNextStep();
        }, throttle)
      }

      if (isIntersecting && scrollDirection === "up") {
        console.log('intersecting and going up')
        gotoPreviousStep();
      }
    }
  }, [isIntersecting, scrollDirection, gotoNextStep, gotoPreviousStep]);

  return (
    <Container ref={outerRef}>
      <Grid container 
        onScroll={(event: React.SyntheticEvent) => console.log("scrolling", event)}
      >
        <Grid item lg={12}>
          <Typography variant="h3">Stepper</Typography>
          <Typography variant="body1">some text</Typography>
          <p>{scrollDirection}</p>
        </Grid>
        <button onClick={gotoPreviousStep}>-</button><button onClick={gotoNextStep}>+</button><button onClick={unlockScroll}>unlock</button>
        <Grid ref={innerRef} item lg={12} height={"800px"} sx={{ border: "1px solid green" }} className="steps-container">
          {steps.map((step, i) => (
          <Grid container key={step.id} height="800px" paddingX="80px" paddingY="50px"
            // className={`step-content ${activeStep === step.id ? 'active' : ''} ${
            //   scrollDirection === 'up' ? 'scroll-up' : scrollDirection === 'down' ? 'scroll-down' : ''
            // }`}
            sx={{
              display: activeStep === step.id ? 'flex' : 'none',
            }}
          >
            <Grid item lg={6}>
              <Typography variant="h3">{step.header}</Typography>
              <Typography variant="body1">{step.body}</Typography>
            </Grid>
            <Grid item lg={6}>
              <Box sx={{
                width: '200px',
                height: '200px',
                backgroundColor: 'purple',
                paddingRight: '20px',
                paddingTop: '20px',
                borderRadius: '4px'
              }}>
                <Box component="img" alt="something" src={step.image} sx={{
                  width: "425px",
                  objectFit: "cover",
                  aspectRatio: "4/3",
                  borderRadius: '4px'
                }} />
              </Box>
            </Grid>
          </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
