import { FC, ChangeEvent } from 'react';
import Textarea from '@mui/joy/Textarea';
interface IProps {
  placeholder: string;
  variant: 'soft' | 'outlined' | 'plain';
  height?: number;
  className?: string;
  defaultValue?: string;
  name?: string;
  id?: string;
  onChange?: (e: ChangeEvent<any>) => void;
}

const CustomTextArea: FC<IProps> = ({ placeholder, variant, height, className, defaultValue, name, id, onChange }) => {
  return (
    <Textarea
      style={{ borderRadius: 0 }}
      sx={{
        border: '1px solid',
        borderColor: '#D9D9D9',
        borderBottom: '2px solid',
        borderBottomColor: '#000000',
        borderRadius: 0,
        background: 'none',
        fontWeight: '300',
        '&:hover': {
          borderBottom: '2px solid #000000',
        },
        '&::before': {
          border: '1px solid #1EC1AA',
          transform: 'scaleX(0)',
          left: 0,
          right: 0,
          bottom: '-2px',
          top: 'unset',
          transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
          borderRadius: 0,
        },
        '&:focus-within::before': {
          transform: 'scaleX(1)',
        },
      }}
      placeholder={placeholder}
      variant={variant}
      minRows={height}
      style={{ borderRadius: '2px' }}
      className={className}
      defaultValue={defaultValue}
      name={name}
      id={id}
      onChange={onChange}
    />
  );
};

export default CustomTextArea;
