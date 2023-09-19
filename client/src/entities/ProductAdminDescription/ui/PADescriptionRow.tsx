import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import {
    TextField,
    Grid,
    MenuItem,
    Select,
    Icon,
    FormControl,
    FormHelperText,
} from '@mui/material';
import { errorsToString } from '@/shared/helpers/error.helper';
import { IProductAdminDescription } from '../model/padescription.type';
import {
    useDelDescriptionMutation,
    useSetDescriptionMutation,
} from '../model/padescription.api';
import { DropDownIcon } from '@/shared/types/enums';
import { useDebounce } from '@/shared/hooks/useDebounce';

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

    const saveData = useCallback(
        (descr: string, type: DropDownIcon) => {
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
        },
        [args.item, descr, type],
    );

    const saveDataDebounce = useDebounce(saveData, 1000);

    const changeDescr = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setDescr(event.target.value);
            saveDataDebounce(event.target.value, type);
        },
        [saveData],
    );

    return (
        <Grid container width={'100%'} gap={1}>
            <Grid
                item
                xs={2}
                alignItems={'center'}
                display={'flex'}
                justifyContent={'end'}>
                <FormControl>
                    <Select
                        value={type}
                        onChange={(event) => setType(event.target.value)}>
                        {Object.keys(DropDownIcon).map((key, index) => (
                            <MenuItem value={key} key={index}>
                                <img
                                    src={`/image/${
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
            </Grid>
            <Grid item xs={9}>
                <TextField
                    error={descr != args.item.description}
                    value={descr}
                    sx={{ backgroundColor: 'white' }}
                    multiline
                    minRows={2}
                    onChange={changeDescr}
                    variant={'outlined'}
                    fullWidth
                    disabled={args.readonly}
                />
            </Grid>
        </Grid>
    );
};
