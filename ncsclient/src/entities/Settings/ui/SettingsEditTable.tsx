import { FC, useCallback } from 'react';
import {
    Button,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Settings } from '@/shared/types/settings';
import * as Icons from '@mui/icons-material';
import { getSettings, getSettingsIsInit } from '../model/settings.selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { SettingItem } from '../model/settings.type';
import { deleteSettings, upsertSettings } from '../model/settings.services';
import { SettingEditCard } from './SettingsEditRow';

interface SettingEditTableProps {
    item: SettingItem;
}

export const SettingEditTable: FC<SettingEditTableProps> = (props) => {
    const dispatch = useAppDispatch();
    const data = useSelector(getSettings);
    const isInit = useSelector(getSettingsIsInit);

    const onSave = useCallback((name: string, value: string) => {
        dispatch(upsertSettings({ name, value }));
    }, []);

    const onDelete = useCallback((name: string) => {
        dispatch(deleteSettings(name));
    }, []);

    //if (!isInit) return <></>;

    return (
        <TableContainer component={Paper} aria-readonly={!isInit}>
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
                        <SettingEditCard
                            name={key}
                            value={data?.[key] ?? ''}
                            key={key}
                            onSave={onSave}
                            onDelete={onDelete}
                            readonly={!isInit}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
