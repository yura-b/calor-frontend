import React, { useState } from 'react';
import AccountLayout from '../AccountLayout';
import Details from './components/Details';
import EditAccountDetails from './components/EditAccountDetails';
import Delete from '@assets/images/account/delete.svg';
import DeleteMyAccountComponent from './components/DeleteMyAccountComponent';
import { paths } from '@/routes/paths';
import { Link } from 'react-router-dom';

const AccountDetails: React.FC = (): React.ReactElement => {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <>
      {!deleting && (
        <AccountLayout bgColor={deleting ? 'white' : 'mintExtraLight'}>
          <div className="relative mb-8">
            {!deleting && !editing && (
              <div className="flex justify-end absolute top-20 right-[10%] lg:relative lg:top-0 right-0">
                <button onClick={() => setEditing(!editing)} className="underline hover:font-bold">
                  Edit Account Details
                </button>
              </div>
            )}
            {editing ? <EditAccountDetails /> : null}
            {!editing && !deleting ? <Details /> : null}

            {!deleting && !editing && (
              <div className="flex mt-10">
                <div
                  className="bg-custom-red w-[28px] h-[28px] rounded-full flex justify-center items-center mr-2 ml-[5%]  md:ml-[9%] lg:ml-0"
                  onClick={() => setDeleting(!deleting)}
                >
                  <img src={Delete} className="w-[24px] h-[24px]" />
                </div>
                <Link className="text-custom-red hover:font-bold " to={paths.accountDelete}>
                  Delete My Account
                </Link>
              </div>
            )}
          </div>
        </AccountLayout>
      )}
      {deleting && <DeleteMyAccountComponent />}
    </>
  );
};

export default AccountDetails;
