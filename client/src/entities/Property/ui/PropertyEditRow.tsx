import { FC, useCallback, useEffect, useState } from 'react';
import {
    Button,
    TextField,
    TableCell,
    TableRow,
    Checkbox,
    Grid,
    Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore, Save } from '@mui/icons-material';
import { IProperty, IPropertyValue } from '../model/property.type';
import { PropertyValueCard } from './PropertyValueCard';

interface PropertyEditRowProps {
    property: IProperty;
    readonly: boolean;
    onSave?: (item: IProperty) => void;
    onSaveValue?: (args: { propId: number; value: IPropertyValue }) => void;
    onDeleteValue?: (args: { propId: number; valId: number }) => void;
}

export const PropertyEditRow: FC<PropertyEditRowProps> = (props) => {
    const [canSave, setCanSave] = useState(false);
    const [name, setName] = useState(props.property.name);
    const [isList, setIsList] = useState(props.property.isList);
    const [order, setOrder] = useState(props.property.order);

    useEffect(() => {
        setName(props.property.name);
        setIsList(props.property.isList);
        setOrder(props.property.order);
    }, [props.property]);

    useEffect(() => {
        setCanSave(
            props.property.name != name ||
                props.property.isList != isList ||
                props.property.order != order,
        );
    }, [props.property, isList, name, order]);

    const onSaveClick = useCallback(() => {
        if (props.onSave)
            props.onSave({
                id: props.property.id,
                name: name,
                isList: isList,
                order: order,
            });
    }, [props.property, name, isList, order]);

    const onSaveValue = useCallback(
        (value: IPropertyValue) => {
            if (props.onSaveValue) {
                props.onSaveValue({ propId: props.property.id, value });
            }
        },
        [props.property.values],
    );

    const onDeleteValue = useCallback(
        (value: IPropertyValue) => {
            if (props.onDeleteValue && value.id)
                props.onDeleteValue({
                    propId: props.property.id,
                    valId: value.id,
                });
        },
        [props.property],
    );

    return (
        <TableRow>
            <TableCell>
                <TextField
                    error={order != props.property.order}
                    label={order == props.property.order ? '' : 'Edited'}
                    value={order}
                    onChange={(event) =>
                        setOrder(Number.parseInt(event.target.value))
                    }
                    variant={'outlined'}
                    fullWidth
                    disabled={props.readonly}
                />
            </TableCell>
            <TableCell>
                <TextField
                    error={name != props.property.name}
                    label={name == props.property.name ? '' : 'Edited'}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    variant={'outlined'}
                    fullWidth
                    disabled={props.readonly}
                />
            </TableCell>
            <TableCell align="center">
                <Checkbox
                    checked={isList}
                    onChange={(e) => setIsList(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    disabled={props.readonly}
                />
            </TableCell>
            <TableCell>
                <Grid container gap={'5px'}>
                    {props.property.values?.map((val) => (
                        <PropertyValueCard
                            key={val.id}
                            item={val}
                            readonly={props.readonly}
                            onSave={onSaveValue}
                            onDelete={onDeleteValue}
                        />
                    ))}
                    {isList && props.onSaveValue && (
                        <PropertyValueCard
                            item={{
                                id: 0,
                                value: '',
                                isActive: true,
                            }}
                            onSave={onSaveValue}
                            readonly={props.readonly}
                        />
                    )}
                </Grid>
            </TableCell>
            <TableCell align="center">
                <Button
                    onClick={onSaveClick}
                    disabled={props.readonly || !canSave}>
                    <Save />
                </Button>
            </TableCell>
        </TableRow>
    );
};
