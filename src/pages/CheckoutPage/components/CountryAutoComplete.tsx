import * as React from 'react';
import {FC} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {createTheme, ThemeProvider} from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1EC1AA', // Your desired primary color
        },
    },
});

interface IProps {
    id: string;
    handler: any;
    value: string;
    arr: string[]
}

const CountryAutoComplete: FC<IProps> = ({handler, value, arr}) => {
    return (
        <ThemeProvider theme={theme}>
            <Autocomplete
                value={value}
                onChange={(_event: any, newValue: string | null) => {
                    handler(newValue);
                }}
                options={arr}
                autoHighlight
                defaultValue="United States"
                renderInput={(params) => (
                    <TextField
                        {...params}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />
        </ThemeProvider>
    );
};
export default CountryAutoComplete;

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js

