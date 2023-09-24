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
import { useSetPAPropertiesMutation } from '../model/paproperty.api';
import { errorsToString } from '@/shared/helpers/error.helper';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { SingleSelector } from '@/shared/ui';

interface PAPropertiesCardProps {
    prodId: number;
    prop: IProductAdminProperty;
    values?: ICategoryPropertyValues[];
    readonly: boolean;
    onLoading?: (isLoading: boolean) => void;
}

export const PAPropertiesCard: FC<PAPropertiesCardProps> = (args) => {
    const [setProperties, setPropertiesProps] = useSetPAPropertiesMutation();

    const [error, setError] = useState('');
    const [value, setValue] = useState(args.prop.value);
    const [valueId, setValueId] = useState(args.prop.valueId);

    useEffect(() => {
        if (args.onLoading) args.onLoading(setPropertiesProps.isLoading);
        setError(errorsToString([setPropertiesProps.error]));
    }, [setPropertiesProps]);

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
                <SingleSelector
                    allValues={args.values ?? []}
                    getLabel={(item) => item.value}
                    selectedValue={valueId}
                />
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
