import { FC } from 'react';
import Textarea from '@mui/joy/Textarea';

interface IProps {
  placeholder: string;
  variant: 'soft' | 'outlined' | 'plain';
  height?: number;
}

const CustomTextArea: FC<IProps> = ({ placeholder, variant, height }) => {
  return <Textarea placeholder={placeholder} variant={variant} minRows={height} style={{ borderRadius: '2px' }} />;
};

export default CustomTextArea;
