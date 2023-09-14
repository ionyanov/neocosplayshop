import { FC, useCallback, useEffect, useState } from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
} from '@mui/material';
import {
    useGetAllUsersDataQuery,
    useUpdateUserDataMutation,
} from '../model/useradmin.api';
import { AdminUserRow } from './AdminUserRow';
import { IAdminUser } from '../model/user.types';

export const AdminUserList: FC = () => {
    const { data = [], ...props } = useGetAllUsersDataQuery();
    const [updateUserData, updateUserDataProps] = useUpdateUserDataMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(props.isLoading || updateUserDataProps.isLoading);
        setError(
            props.error || updateUserDataProps.error?.data?.message?.join('; '),
        );
    }, [props, updateUserDataProps]);

    const onSave = useCallback((item: IAdminUser) => {
        updateUserData(item);
    }, []);

    return (
        <TableContainer component={Paper} aria-readonly={isLoading}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width={'5%'} colSpan={9} align="center">
                            <Button onClick={props.refetch}>Refresh</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell width={'5%'}></TableCell>
                        <TableCell width={'3%'}>Id</TableCell>
                        <TableCell width={'17%'}>Created</TableCell>
                        <TableCell width={'30%'}>Email</TableCell>
                        <TableCell width={'15%'}>Role</TableCell>
                        <TableCell width={'15%'}>Last Login</TableCell>
                        <TableCell width={'5%'}>Lock Count</TableCell>
                        <TableCell width={'5%'} align="center">
                            Lock
                        </TableCell>
                        <TableCell width={'5%'} align="center">
                            Save
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((item) => (
                        <AdminUserRow
                            item={item}
                            key={item.id}
                            onSave={onSave}
                            readonly={isLoading}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    useEffect(() => {
        console.log(data);
    }, [data]);
    return <></>;
};
