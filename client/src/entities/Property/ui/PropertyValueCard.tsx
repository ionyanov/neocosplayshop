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
    const [value, setValue] = useState(props.item.value ?? '');
    const [isActive, setIsActive] = useState(props.item.isActive);

    const SaveData = () => {
        if (props.onSave) {
            props.onSave({
                id: props.item.id,
                value: value,
                isActive: isActive,
            });
            setValue('');
        }
    };

    //const onSaveDebounce = useDebounce(SaveData, 1000);

    const changeFlag = (event: ChangeEvent<HTMLInputElement>) => {
        setIsActive(event.target.checked);
        //SaveData();
    };

    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        //onSaveDebounce();
    };

    useEffect(() => {
        setValue(props.item.value);
        setIsActive(props.item.isActive);
    }, [props.item.isActive, props.item.value]);

    const onDeleteClick = useCallback(() => {
        if (props.onDelete)
            if (confirm(`You want delete ${value}?`))
                props.onDelete(props.item);
    }, [props.item, value, isActive]);

    return (
        <OutlinedInput
            startAdornment={
                <InputAdornment position="start">
                    {props.item.id ? (
                        <Checkbox
                            id={props.item.id.toString()}
                            checked={isActive}
                            onChange={changeFlag}
                            inputProps={{ 'aria-label': 'controlled' }}
                            disabled={props.readonly}
                            size="small"
                            sx={{ minWidth: 'unset' }}
                        />
                    ) : (
                        <></>
                    )}
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <Button
                        onClick={SaveData}
                        disabled={props.readonly || value == props.item.value}
                        size="small"
                        sx={{ minWidth: 'unset' }}>
                        <Save />
                    </Button>
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
            sx={{ padding: '0' }}
        />
    );
};
