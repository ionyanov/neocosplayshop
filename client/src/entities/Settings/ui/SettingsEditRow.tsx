import { FC, useCallback, useEffect, useState, ChangeEvent } from 'react';
import {
    Button,
    TextField,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material';
import { Save, Delete } from '@mui/icons-material';

interface SettingsEditRowProps {
    name: string;
    value: string;
    readonly: boolean;
    onSave?: (name: string, value: string) => void;
    onDelete?: (name: string) => void;
}

export const SettingsEditRow: FC<SettingsEditRowProps> = (props) => {
    const [editedValue, setEditedValue] = useState(props.value);

    const valueChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setEditedValue(event.target.value);
    };

    useEffect(() => {
        setEditedValue(props.value);
    }, [props.value]);

    const onSaveClick = useCallback(() => {
        if (props.onSave) props.onSave(props.name, editedValue);
    }, [editedValue]);

    const onDeleteClick = useCallback(() => {
        if (props.onDelete)
            if (confirm('You want delete settings?'))
                props.onDelete(props.name);
    }, [editedValue]);

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                <Typography variant="button">{props.name}</Typography>
            </TableCell>
            <TableCell>
                <TextField
                    error={editedValue != props.value}
                    label={editedValue == props.value ? '' : 'Edited'}
                    value={editedValue}
                    onChange={valueChange}
                    variant={'outlined'}
                    fullWidth
                    disabled={props.readonly}
                />
            </TableCell>
            <TableCell align="center">
                <Button onClick={onSaveClick} disabled={props.readonly}>
                    <Save />
                </Button>
            </TableCell>
            <TableCell align="center">
                <Button onClick={onDeleteClick} disabled={props.readonly}>
                    <Delete />
                </Button>
            </TableCell>
        </TableRow>
    );
};
