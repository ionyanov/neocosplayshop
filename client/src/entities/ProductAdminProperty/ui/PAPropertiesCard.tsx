import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import {
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import {
    IProductAdminProperty,
    ICategoryPropertyValues,
} from '../model/paproperty.type';
import {
    useSetPropertiesMutation,
    useDelPropertiesMutation,
} from '../model/paproperty.api';
import { errorsToString } from '@/shared/helpers/error.helper';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface PAPropertiesCardProps {
    prodId: number;
    prop: IProductAdminProperty;
    values?: ICategoryPropertyValues[];
    readonly: boolean;
    onLoading?: (isLoading: boolean) => void;
}

export const PAPropertiesCard: FC<PAPropertiesCardProps> = (args) => {
    const [setProperties, setPropertiesProps] = useSetPropertiesMutation();
    const [delProperties, delPropertiesProps] = useDelPropertiesMutation();

    const [error, setError] = useState('');
    const [value, setValue] = useState(args.prop.value);
    const [valueId, setValueId] = useState(args.prop.valueId);

    useEffect(() => {
        if (args.onLoading)
            args.onLoading(
                setPropertiesProps.isLoading || delPropertiesProps.isLoading,
            );
        setError(
            errorsToString([
                setPropertiesProps.error,
                delPropertiesProps.error,
            ]),
        );
    }, [setPropertiesProps, delPropertiesProps]);

    useEffect(() => {
        setValue(args.prop.value);
        setValueId(args.prop.valueId);
    }, [args.prop]);

    const saveData = useCallback(
        (value: string, valueId: number) => {
            setProperties({
                prodId: args.prodId,
                data: {
                    id: args.prop.id,
                    value: value,
                    valueId: valueId,
                    property: {
                        id: args.prop.propertyId,
                        name: '',
                        isList: false,
                    },
                    propertyId: args.prop.propertyId,
                },
            });
            //else delProperties({ prodId: args.prodId, descId: args.item.id });
        },
        [args.prop],
    );

    const saveDataDebounce = useDebounce(saveData, 1000);

    const changeValue = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
            saveDataDebounce(event.target.value, valueId);
        },
        [saveData],
    );

    return (
        <FormControl fullWidth>
            {args.prop.property?.isList ? (
                <Select
                    value={valueId}
                    onChange={(e) =>
                        saveData(value ?? '', e.target.value as number)
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
                    onChange={changeValue}
                    multiline
                    variant={'outlined'}
                    fullWidth
                    disabled={args.readonly}
                />
            )}
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    );
};
