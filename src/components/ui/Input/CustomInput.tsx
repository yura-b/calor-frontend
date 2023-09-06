import { FC, ChangeEvent } from 'react';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

interface IProps {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  errorMessage?: string;
  error?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<any>) => void;
}

const CustomInput: FC<IProps> = ({ id, name, placeholder, label, errorMessage, error, onChange }) => {
  return (
    <FormControl error>
      <FormLabel>{label}</FormLabel>
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        error={false}
        onChange={onChange}
        style={{ borderRadius: '2px' }}
      />
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

export default CustomInput;
