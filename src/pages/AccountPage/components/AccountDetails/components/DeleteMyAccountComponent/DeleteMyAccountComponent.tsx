import MainFrame from '@/components/mainFrame';
import React, { useState } from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import MainLayout from '@/components/MainLayout';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { deleteUserAccount } from '@/api/users';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { paths } from '@/routes/paths';
import { List, ListItem, ListItemText } from '@mui/material';
import { cleanUserData } from '@/store/reducers/UserReducer.ts';

const MarkedList = ({ items }) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index} className="ml-4 flex items-center justify-center">
          <span className="text-4xl pr-2 -mt-2 text-gray lg:text-mint">&#8226;</span>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: '18px',
          color: checked ? '#1EC1AA' : 'gray',
        },
      }}
    />
  );
};

const DeleteMyAccountComponent: React.FC = (): React.ReactElement => {
  const { access_token } = useAppSelector((state) => state.user);
  const items = ['Sign out on all devices', 'Delete all of your account information'];
  const refreshPage = () => {
    window.location.reload();
  };
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [showTextArea, setShowTextArea] = useState(false);

  const reasonsOfDeleteAccount = [
    'No longer using the service',
    'Privacy concerns',
    'Found a better alternative',
    'Other reasons',
  ];
  const [showReasons, setShowReasons] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      selectedReasons: [] as string[],
      otherReason: '',
    },
    onSubmit: async (values) => {
      try {
        await deleteUserMutation.mutateAsync(access_token, values);
        setAccountDeleted(true);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    },
  });

  const deleteUserMutation = useMutation(() => deleteUserAccount(access_token), {
    onSuccess: () => {
      dispatch(cleanUserData());
    },
    onError: (error) => {
      console.error('Account deletion error:', error);
    },
  });
  const [accountDeleted, setAccountDeleted] = useState(false);
  return (
    <MainLayout>
      <MainFrame title={'Delete Account'} showCloseBtn={true} headerBg={'grayLight'}>
        <div className={`${styles.container} `}>
          {!accountDeleted && (
            <h1 className={`${styles.header2} hidden lg:block text-center uppercase text-gray`}>Delete Account</h1>
          )}
          {!showReasons && (
            <div className="flex flex-col items-center mt-4 lg:mt-10">
              <p className={`${styles.body2} font-bold`}>Deleting account will do the following</p>
              <MarkedList items={items} />
              <p className="font-bold">Are you sure you want to delete your account?</p>
              <Button color="gray" className="my-8" onClick={() => setShowReasons(!showReasons)}>
                Yes
              </Button>
              <Button onClick={refreshPage} color="mintExtraLight">
                No
              </Button>
            </div>
          )}
          {showReasons && !accountDeleted && (
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col items-center mt-4 lg:mt-10">
                <p className={`${styles.body2} font-bold`}>Why are you deleting your account?</p>
                <div className="flex flex-col">
                  {reasonsOfDeleteAccount.map((reason, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 cursor-pointer"
                      htmlFor={`custom-checkbox-${index}`}
                    >
                      <CustomCheckbox
                        checked={formik.values.selectedReasons.includes(reason)}
                        onChange={() => {
                          let updatedReasons;
                          if (selectedReasons.includes(reason)) {
                            updatedReasons = selectedReasons.filter((r) => r !== reason);
                          } else {
                            updatedReasons = [...selectedReasons, reason];
                          }
                          formik.setFieldValue('selectedReasons', updatedReasons);
                          if (reason === 'Other reasons') {
                            setShowTextArea(!showTextArea);
                          } else if (showTextArea) {
                            setShowTextArea(false);
                            formik.setFieldValue('otherReason', '');
                          }
                        }}
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>
                {showTextArea && (
                  <textarea
                    className="mt-4 mb-8 p-2 border rounded max-w-[360px] min-w-[320px] min-h-[160px] 
                 border-grayLight focus:border-mint focus:outline-none"
                    placeholder="Other"
                    value={formik.values.otherReason}
                    onChange={formik.handleChange('otherReason')}
                  />
                )}
                <p className="font-bold">Are you sure you want to delete your account?</p>
                <Button color="gray" className="my-8" type={'submit'}>
                  Delete Account
                </Button>
                <Button onClick={refreshPage} color="mintExtraLight">
                  No
                </Button>
              </div>
            </form>
          )}
          {accountDeleted && (
            <div className="flex flex-col justify-center items-center mt-8 min-h-[50vh]">
              <p className={`${styles.body1} font-bold text-center`}>Your account is deleted</p>
              <p className={`${styles.body1} text-center`}>Thanks for using our product</p>
              <Button color="gray" className="my-8" to={paths.home}>
                Home
              </Button>
            </div>
          )}
        </div>
      </MainFrame>
      ;
    </MainLayout>
  );
};

export default DeleteMyAccountComponent;
