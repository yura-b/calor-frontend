import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

interface IProps {
  includeTitle: boolean;
  readOnly: boolean;
  rating?: number;
  size?: "small" | "medium" | "large";
  getRating?: (newValue: number) => void;
}

const BasicRating: FC<IProps> = ({ includeTitle, readOnly, rating, size = "large", getRating }) => {
  const [value, setValue] = useState<number>(rating || 5);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    if (getRating) {
      getRating(newValue);
    }
  };

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      {includeTitle && (
        <Typography className="flex justify-center items-center" component="legend">
          1
        </Typography>
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Rating
          style={{  }}
          readOnly={readOnly}
          name="simple-controlled"
          value={readOnly ? rating || 0 : value}
          onChange={(event, newValue) => handleChange(newValue as number)}
          size={size}
        />
      </div>
    </Box>
  );
};

export default BasicRating;
