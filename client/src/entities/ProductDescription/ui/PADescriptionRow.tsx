import { FC, useCallback, useEffect, useState } from 'react';
import {
    TextField,
    Grid,
    MenuItem,
    Select,
    FormControl,
    FormHelperText,
    Button,
    Stack,
} from '@mui/material';
import { errorsToString } from '@/shared/helpers/error.helper';
import { IProductAdminDescription } from '../model/padescription.type';
import {
    useDelDescriptionMutation,
    useSetDescriptionMutation,
} from '../model/padescription.api';
import { DropDownIcon } from '@/shared/types/enums';
import { Delete, Save } from '@mui/icons-material';

interface PADescriptionRowProps {
    prodId: number;
    item: IProductAdminDescription;
    readonly: boolean;
    onLoading?: (isLoading: boolean) => void;
}

export const PADescriptionRow: FC<PADescriptionRowProps> = (args) => {
    const [setDescription, setDescriptionProps] = useSetDescriptionMutation();
    const [delDescription, delDescriptionProps] = useDelDescriptionMutation();

    const [error, setError] = useState('');
    const [descr, setDescr] = useState(args.item.description);
    const [type, setType] = useState(args.item.type);

    useEffect(() => {
        if (args.onLoading)
            args.onLoading(
                setDescriptionProps.isLoading || delDescriptionProps.isLoading,
            );
        setError(
            errorsToString([
                setDescriptionProps.error,
                delDescriptionProps.error,
            ]),
        );
    }, [setDescriptionProps, delDescriptionProps]);

    useEffect(() => {
        setDescr(args.item.description);
        setType(args.item.type);
    }, [args.item]);

    const onSave = useCallback(() => {
        if (descr != '')
            setDescription({
                prodId: args.prodId,
                data: {
                    id: args.item.id,
                    type: type,
                    description: descr,
                },
            });
        else delDescription({ prodId: args.prodId, descId: args.item.id });
    }, [args.item, descr, type]);

    const onDelete = useCallback(() => {
        if (confirm('You want delete description?'))
            delDescription({ prodId: args.prodId, descId: args.item.id });
    }, [args.item, descr, type]);

    return (
        <Grid
            container
            width={'100%'}
            spacing={1}
            alignItems={'center'}
            justifyContent={'end'}>
            <Grid
                item
                xs={2}
                alignItems={'center'}
                display={'flex'}
                justifyContent={'end'}>
                <Stack direction={'column'} width={'100%'}>
                    <FormControl>
                        <Select
                            fullWidth
                            value={type}
                            onChange={(event) => setType(event.target.value)}>
                            {Object.keys(DropDownIcon).map((key, index) => (
                                <MenuItem value={key} key={index}>
                                    <img
                                        src={`/images/${
                                            Object.values(DropDownIcon)[index]
                                        }`}
                                        style={{
                                            maxWidth: '45px',
                                            display: 'block',
                                        }}
                                    />
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{error}</FormHelperText>
                    </FormControl>
                    <Stack direction={'row'}>
                        <Button onClick={onSave}>
                            <Save />
                        </Button>
                        {args.item.id != 0 && (
                            <Button onClick={onDelete}>
                                <Delete />
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={10}>
                <TextField
                    error={descr != args.item.description}
                    value={descr}
                    multiline
                    minRows={3}
                    onChange={(event) => setDescr(event.target.value)}
                    variant={'outlined'}
                    fullWidth
                    disabled={args.readonly}
                />
            </Grid>
        </Grid>
    );
};
