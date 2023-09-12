import { FC, useRef } from 'react';
import { FormikErrors } from 'formik';
import CustomButton from '@components/ui/Button';

interface IProps {
  data: { image?: File };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<{ image?: File }>> | Promise<void>;
  errors: FormikErrors<{ image?: File }>;
}

const FileUpload: FC<IProps> = ({ setFieldValue, errors }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFieldValue('image', e.target.files[0]);
    }
  };
  return (
    <div>
      <CustomButton onClick={handleFileButtonClick} color="transparentMint">
        Upload File
      </CustomButton>
      <input
        ref={fileInputRef}
        type="file"
        name="image"
        accept="image/png, image/jpg, image/jpeg"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {errors.image && (
        <>
          <br />
          <span id="error">{errors.image}</span>
          <br />
        </>
      )}
    </div>
  );
};

export default FileUpload;
