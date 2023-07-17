import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useQuery} from 'react-query';
import {useAppSelector} from '@/store/hooks/hooks.ts';
import {getUsers} from '@/api/users.ts';
import {IUser} from '@/constants/interfaces/user.ts';
import {TablePagination} from '@mui/material';
import {useCleanUserDataAndNavigateToLogin} from '@components/hooks/CleanUserData.ts';

interface Column {
    id: 'name' | 'Registration' | 'Phone  Number' | 'Registration Date' | 'email';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'Registration', label: 'Registration', minWidth: 100},
    {
        id: 'Registration Date',
        label: 'Registration Date',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {id: 'email', label: 'email', minWidth: 200},
    {
        id: 'Phone  Number',
        label: 'Phone  Number',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
];


export default function UsersGrid() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const {access_token} = useAppSelector(state => state.user)

    const {isLoading, data, error} = useQuery('getUsers', () => getUsers(access_token))
    const clearUserData = useCleanUserDataAndNavigateToLogin()

    if (isLoading) return <></>

    if (error)  clearUserData(error)
    const users: IUser[] = data?.data
    // @ts-ignore
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                      <TableCell>
                                          <p>{row.firstName + row.secondName}</p>
                                      </TableCell>
                                        <TableCell>
                                          <p>{row.email_verified+ ''}</p>
                                      </TableCell>
                                        <TableCell align={'center'}>
                                          <p>{row.registrationDate + ''}</p>
                                      </TableCell>
                                        <TableCell>
                                          <p>{row.email}</p>
                                      </TableCell>
                                        <TableCell align={'right'}>
                                          <p>{row.phoneNumber}</p>
                                      </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
