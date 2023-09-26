import { FC, useCallback, useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import {
    IProductAdminProperty,
    ICategoryPropertyValues,
} from '../model/paproperty.type';
import {
    useSetPAPropertiesMutation,
    useDelPAPropertiesMutation,
} from '../model/paproperty.api';
import { errorsToString } from '@/shared/helpers/error.helper';
import { Delete, Add, Save } from '@mui/icons-material';

interface PAPropertiesCardProps {
    prodId: number;
    prop: IProductAdminProperty;
    values?: ICategoryPropertyValues[];
    readonly: boolean;
    onLoading?: (isLoading: boolean) => void;
}

export const PAPropertiesCard: FC<PAPropertiesCardProps> = (args) => {
    const [setProperties, setPropertiesProps] = useSetPAPropertiesMutation();
    const [delProperties, delPropertiesProps] = useDelPAPropertiesMutation();

    const [error, setError] = useState('');
    const [value, setValue] = useState(args.prop.value ?? '');
    const [valueId, setValueId] = useState(args.prop.valueId ?? '');

    useEffect(() => {
        if (args.onLoading) args.onLoading(setPropertiesProps.isLoading);
        setError(errorsToString([setPropertiesProps.error]));
    }, [setPropertiesProps]);

    useEffect(() => {
        setValue(args.prop.value ?? '');
        setValueId(args.prop.valueId ?? '');
    }, [args.prop]);

    const onSaveData = useCallback(() => {
        setProperties({
            prodId: args.prodId,
            data: {
                id: args.prop.id,
                value: value,
                valueId: +valueId,
                property: {
                    id: args.prop.propertyId,
                    name: '',
                    isList: false,
                },
                propertyId: args.prop.propertyId,
            },
        });
    }, [args.prop, value, valueId]);

    const onDelete = useCallback(() => {
        delProperties({ prodId: args.prodId, propId: args.prop.id });
    }, [args.prop]);

    return (
        <Grid container>
            <Grid item xs={9}>
                <FormControl fullWidth>
                    {args.prop.property?.isList ? (
                        <Select
                            value={valueId}
                            onChange={(event) =>
                                setValueId(event.target.value)
                            }>
                            {args.values?.map((val) => (
                                <MenuItem value={val.id} key={val.id}>
                                    {val.value}
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        <TextField
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                            multiline
                            variant={'outlined'}
                            fullWidth
                            disabled={args.readonly}
                        />
                    )}
                    <FormHelperText>{error}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <Button onClick={onSaveData}>
                    <Save />
                </Button>
                <Button onClick={onDelete} disabled={args.prop.id == 0}>
                    <Delete />
                </Button>
            </Grid>
        </Grid>
    );
};
