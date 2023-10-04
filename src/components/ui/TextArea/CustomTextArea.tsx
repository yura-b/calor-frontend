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
  return <Textarea placeholder={placeholder} variant={variant} minRows={height} style={{ borderRadius: '2px' }} className={className} defaultValue={defaultValue} name={name} id={id} onChange={onChange}/>;
};

export default CustomTextArea;
