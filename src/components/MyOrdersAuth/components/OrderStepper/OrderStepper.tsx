import React from 'react';
import { Stack, Step, StepConnector, stepConnectorClasses, StepIconProps, StepLabel, Stepper } from '@mui/material';
import { styled } from '@mui/material/styles';
import tick from '@assets/images/SignUpHeaderImg/tick.png';

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: '#B8E4D8',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: '#1EC1AA',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#1EC1AA',
  }),
}));

function ColorlibStepIcon(props: StepIconProps & { currentStep: number }) {
  const { active, icon, currentStep } = props;
  const stepNumber = currentStep + 1;

  const iconNumber = typeof icon === 'number' ? icon : 0;
  const completed = active || iconNumber < stepNumber;

  const icons: { [index: number]: React.ReactElement } = {
    1: <p>1</p>,
    2: <p>2</p>,
    3: <p>3</p>,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed }}>
      {completed ? <img src={tick} alt={''} /> : icons[iconNumber]}
    </ColorlibStepIconRoot>
  );
}

const OrderStepper = ({ step, steps }) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper activeStep={steps.indexOf(step)} alternativeLabel connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={(stepProps) => (
                <ColorlibStepIcon {...stepProps} currentStep={steps.indexOf(step)} icon={index + 1} />
              )}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default OrderStepper;

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#1EC1AA',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#B8E4D8',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#B8E4D8',
    borderRadius: 1,
  },
}));
