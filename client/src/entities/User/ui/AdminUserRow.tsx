import { FC, useCallback, useEffect, useState, ChangeEvent } from 'react';
import {
    Button,
    TableCell,
    TableRow,
    IconButton,
    Collapse,
    Container,
    TextField,
    Checkbox,
    MenuItem,
    Select,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Save } from '@mui/icons-material';
import { IAdminUser } from '../model/user.types';
import { UserRole } from '@/shared/types/router';

interface AdminUserRowProps {
    item: IAdminUser;
    readonly: boolean;
    onSave?: (item: IAdminUser) => void;
}

export const AdminUserRow: FC<AdminUserRowProps> = (props) => {
    const [open, setOpen] = useState(false);
    const [edited, setEdited] = useState(false);
    const [editedAvatar, setEditedAvatar] = useState(props.item.avatar ?? '');
    const [editedEmail, setEditedEmail] = useState(props.item.email);
    const [editedRole, setEditedRole] = useState(props.item.role);
    const [editedLockFlg, setEditedLockFlg] = useState(props.item.lockflg);

    useEffect(() => {
        setEditedAvatar(props.item.avatar ?? '');
        setEditedEmail(props.item.email);
        setEditedRole(props.item.role);
        setEditedLockFlg(props.item.lockflg);
    }, [props.item]);

    useEffect(() => {
        setEditedAvatar(props.item.avatar ?? '');
        setEditedEmail(props.item.email);
        setEditedRole(props.item.role);
        setEditedLockFlg(props.item.lockflg);
    }, [props.item]);

    useEffect(() => {
        setEdited(
            props.item.avatar != editedAvatar ||
                props.item.email != editedEmail ||
                props.item.role != editedRole ||
                props.item.lockflg != editedLockFlg,
        );
    }, [props.item, editedAvatar, editedRole, editedEmail, editedLockFlg]);

    const onSaveClick = useCallback(() => {
        const newUser: IAdminUser = { ...props.item };
        newUser.email = editedEmail;
        newUser.avatar = editedAvatar;
        newUser.role = editedRole;
        newUser.lockflg = editedLockFlg;
        if (!editedLockFlg) newUser.lockcount = 0;
        if (props.onSave) props.onSave(newUser);
    }, [props.item, editedAvatar, editedRole, editedEmail, editedLockFlg]);

    const formatDate = useCallback((param: Date): string => {
        if (!param) return '';
        const date = new Date(Date.parse(param as any));
        return `${date.getDate()}.${
            date.getUTCMonth() + 1
        }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }, []);

    return (
        <>
            <TableRow>
                <TableCell rowSpan={2}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>{props.item.id}</TableCell>
                <TableCell> {formatDate(props.item.created)} </TableCell>
                <TableCell>
                    <TextField
                        label="Email"
                        fullWidth
                        variant="outlined"
                        disabled={props.readonly}
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                    />
                </TableCell>
                <TableCell>
                    <Select
                        value={editedRole}
                        variant="outlined"
                        disabled={props.readonly}
                        fullWidth
                        onChange={(e) =>
                            setEditedRole(e.target.value as UserRole)
                        }>
                        {Object.values(UserRole).map((key, item) => (
                            <MenuItem value={key} key={key}>
                                {key}
                            </MenuItem>
                        ))}
                    </Select>
                </TableCell>
                <TableCell>{formatDate(props.item.lastlogin)} </TableCell>
                <TableCell align="center">{props.item.lockcount}</TableCell>
                <TableCell>
                    <Checkbox
                        checked={editedLockFlg}
                        inputProps={{ 'aria-label': 'controlled' }}
                        onChange={(e) => setEditedLockFlg(e.target.checked)}
                        disabled={props.readonly}
                    />
                </TableCell>
                <TableCell align="center">
                    <Button
                        onClick={onSaveClick}
                        disabled={props.readonly || !edited}>
                        <Save />
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    colSpan={2}
                    style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        Last updated: <br />
                        {formatDate(props.item.updated)}
                    </Collapse>
                </TableCell>
                <TableCell
                    colSpan={6}
                    style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <TextField
                            label="Avatar"
                            variant="outlined"
                            fullWidth
                            disabled={props.readonly}
                            value={editedAvatar}
                            onChange={(e) => setEditedAvatar(e.target.value)}
                        />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};
