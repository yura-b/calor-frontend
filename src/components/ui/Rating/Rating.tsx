import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

interface IProps {
  includeTitle: boolean;
  readOnly: boolean;
}

const BasicRating: FC<IProps> = ({includeTitle, readOnly}) => {
  const [value, setValue] = useState<number | null>(5);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      { includeTitle && 
        <Typography className="flex justify-center items-center" component="legend">1</Typography>
      }
      <Rating
        readOnly={readOnly}
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
}

export default BasicRating;