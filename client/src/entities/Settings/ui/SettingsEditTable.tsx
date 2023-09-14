import { FC, useCallback, useEffect, useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Settings } from '@/shared/types/settings';
import {
    useDeleteSettingsMutation,
    useInitSettingsQuery,
    useUpsertSettingsMutation,
} from '../model/settings.api';
import { SettingsEditRow } from './SettingsEditRow';

export const SettingEditTable: FC = () => {
    const { data, ...props } = useInitSettingsQuery();
    const [upsertSettings, upsertSettingsProps] = useUpsertSettingsMutation();
    const [deleteSettings, deleteSettingsProps] = useDeleteSettingsMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(
            props.isLoading ||
                upsertSettingsProps.isLoading ||
                deleteSettingsProps.isLoading,
        );
        setError(
            props.error ||
                upsertSettingsProps.error?.data?.message?.join('; ') ||
                deleteSettingsProps.error?.data?.message?.join('; '),
        );
    }, [props, upsertSettingsProps, deleteSettingsProps]);

    const onSave = useCallback((name: string, value: string) => {
        upsertSettings({ name, value });
    }, []);

    const onDelete = useCallback((name: string) => {
        deleteSettings(name);
    }, []);

    return (
        <TableContainer component={Paper} aria-readonly={isLoading}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width={'20%'}>Name</TableCell>
                        <TableCell width={'80%'}>Value</TableCell>
                        <TableCell align="center">Save</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(Settings).map((key, index) => (
                        <SettingsEditRow
                            name={key}
                            value={data?.[key] ?? ''}
                            key={key}
                            onSave={onSave}
                            onDelete={onDelete}
                            readonly={isLoading}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
