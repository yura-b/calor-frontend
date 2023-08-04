import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { getUsers } from '@/api/users.ts';
import { IUser } from '@/constants/interfaces/user.ts';
import { TablePagination } from '@mui/material';
import { useCleanUserDataAndNavigateToLogin } from '@components/hooks/CleanUserData.ts';
import { useNavigate } from 'react-router';

interface Column {
  id: 'name' | 'Registration' | 'Phone  Number' | 'Registration Date' | 'email';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'Registration', label: 'Registration', minWidth: 100 },
  {
    id: 'Registration Date',
    label: 'Registration Date',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'email', label: 'email', minWidth: 200 },
  {
    id: 'Phone  Number',
    label: 'Phone  Number',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface IProps {
  nameFilter: string;
}

const UsersGrid: React.FC<IProps> = ({ nameFilter }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const { access_token } = useAppSelector((state) => state.user);
  const [users, setUsers] = useState<IUser[]>([]);
  const clearUserData = useCleanUserDataAndNavigateToLogin();
  const navigate = useNavigate();

  const onClickHandler = (id: string) => {
    navigate(`/admin/users/${id}`);
  };

  useEffect(() => {
    if (access_token) {
      getUsers(access_token, nameFilter)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((e) => clearUserData(e));
    }
  }, [nameFilter]);

  if (users.length === 0) return <h2>User list is empty</h2>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <Paper sx={{ width: '99%', height: '100%',  marginX:'30px', marginTop: '30px' }}>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader aria-label="sticky table" sx={{ border: '1px #DDE1E6 solid' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                    sx={{ background: '#DDE1E6', fontWeight: 'bold' }}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={user._id}
                  onClick={() => {
                    onClickHandler(user._id);
                  }}
                >
                  <TableCell>
                    <p>{user.firstName + ' ' + user.secondName}</p>
                  </TableCell>
                  <TableCell>
                    <p>{user.email_verified + ''}</p>
                  </TableCell>
                  <TableCell align={'center'}>
                    <p>{user.registrationDate + ''}</p>
                  </TableCell>
                  <TableCell>
                    <p>{user.email}</p>
                  </TableCell>
                  <TableCell align={'right'}>
                    <p>{user.phoneNumber}</p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 25, 50]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default UsersGrid;
