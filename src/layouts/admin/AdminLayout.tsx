import React, {ReactNode} from 'react';
import Header from '@layouts/admin/header/Header.tsx';
import SubmitDialog from '@components/dialogs/admin/SubmitDialog.tsx';

interface IProps {
    children: ReactNode;
}

const AdminLayout: React.FC<IProps> = ({children}) => {
    return (
        <>
            <Header/>
            {children}
            <SubmitDialog/>
        </>
    );
};

export default AdminLayout;
