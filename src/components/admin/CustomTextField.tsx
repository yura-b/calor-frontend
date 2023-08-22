import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material';

interface IProps {
    defaultValue: string;
    setValue: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabledField: boolean;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#1EC1AA', // Your desired primary color
        },
    },
});
const CustomTextField: React.FC<IProps> = ({setValue, defaultValue, disabledField}) => {
    return (
        <ThemeProvider theme={theme}>
      <textarea
          className={'w-[100%] h-80px pb-8 pt-2 px-2 border-2 border-[#CBD2E0] resize-none'}
          disabled={disabledField}
          value={defaultValue}
          onChange={setValue}
      />
        </ThemeProvider>
    );
};

export default CustomTextField;
