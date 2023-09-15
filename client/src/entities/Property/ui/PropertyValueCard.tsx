import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import {
    Button,
    TextField,
    Checkbox,
    FormControl,
    InputAdornment,
    OutlinedInput,
} from '@mui/material';
import { IPropertyValue } from '../model/property.type';
import { Delete, Save } from '@mui/icons-material';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface PropertyValueCardProps {
    item: IPropertyValue;
    readonly: boolean;
    onSave?: (item: IPropertyValue) => void;
    onDelete?: (item: IPropertyValue) => void;
}

export const PropertyValueCard: FC<PropertyValueCardProps> = (props) => {
    const [value, setValue] = useState(props.item.value);
    const [valIsActive, setIsActive] = useState(props.item.isActive);

    const SaveData = useCallback((val: string, isAct: boolean) => {
        if (props.onSave)
            props.onSave({
                id: props.item.id,
                value: val,
                isActive: isAct,
            });
    }, []);

    const onSaveDebounce = useDebounce(SaveData, 1000);

    const changeFlag = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setIsActive(event.target.checked);
            SaveData(value, event.target.checked);
        },
        [SaveData],
    );

    const changeValue = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
            onSaveDebounce(event.target.value, valIsActive);
        },
        [SaveData],
    );

    useEffect(() => {
        setValue(props.item.value);
        setIsActive(props.item.isActive);
    }, [props.item.isActive, props.item.value]);

    const onDeleteClick = useCallback(() => {
        if (props.onDelete)
            if (confirm(`You want delete ${props.item.value}?`))
                props.onDelete(props.item);
    }, [props.item, value, valIsActive]);

    return (
        <FormControl>
            <OutlinedInput
                startAdornment={
                    <InputAdornment position="start">
                        {props.item.id && (
                            <Checkbox
                                id={props.item.id.toString()}
                                checked={valIsActive}
                                onChange={changeFlag}
                                inputProps={{ 'aria-label': 'controlled' }}
                                disabled={props.readonly}
                                size="small"
                                sx={{ minWidth: 'unset' }}
                            />
                        )}
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        {props.onDelete && (
                            <Button
                                onClick={onDeleteClick}
                                disabled={props.readonly}
                                size="small"
                                sx={{ minWidth: 'unset' }}>
                                <Delete />
                            </Button>
                        )}
                    </InputAdornment>
                }
                value={value}
                onChange={changeValue}
                size="small"
                disabled={props.readonly}
            />
        </FormControl>
    );
};
