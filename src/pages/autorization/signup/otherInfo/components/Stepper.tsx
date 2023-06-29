import React from 'react';
import { Stack, Step, StepConnector, stepConnectorClasses, StepIconProps, StepLabel, Stepper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import tick from '../../../../../assets/images/SignUpHeaderImg/tick.png';
import { setStep, Steps } from '@/store/reducers/RegistrationReducer.ts';

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

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;
  const icons: { [index: string]: React.ReactElement } = {
    1: <p>1</p>,
    2: <p>2</p>,
    3: <p>3</p>,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <img src={tick} alt={''} /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const CustomStepper = () => {
  const steps = ['Email', 'Contact Info', 'Password'];
  const { step } = useAppSelector((state) => state.registration);
  const dispatch = useAppDispatch();

  const firstClick = () => {
    dispatch(setStep(Steps.FIRST));
  };
  const secondClick = () => {
    dispatch(setStep(Steps.SECOND));
  };

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper activeStep={step} alternativeLabel connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              onClick={() => {
                if (index === 0 && step !== Steps.FOURTH) firstClick();
                if (index === 1 && step !== Steps.FOURTH) secondClick();
              }}
              StepIconComponent={ColorlibStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default CustomStepper;

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
