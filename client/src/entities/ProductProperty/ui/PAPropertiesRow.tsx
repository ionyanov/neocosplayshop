import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import {
    ICategoryProperties,
    IProductAdminProperty,
} from '../model/paproperty.type';
import { PAPropertiesCard } from './PAPropertiesCard';
import { Add, Save } from '@mui/icons-material';

interface PAPropertiesRowProps {
    prodId: number;
    property: ICategoryProperties;
    items: IProductAdminProperty[];
    readonly: boolean;
    onLoading?: (isLoading: boolean) => void;
}

export const PAPropertiesRow: FC<PAPropertiesRowProps> = (args) => {
    const [items, setItems] = useState(args.items);
    useEffect(() => {
        setItems(args.items);
    }, [args.items]);

    const newItem = {
        id: 0,
        propertyId: args.property.id,
        property: {
            id: args.property.id,
            isList: args.property.isList,
            name: args.property.name,
        },
    };

    const onAdd = useCallback(() => {
        setItems([...items, newItem]);
        console.log(items);
        console.log(args.items);
    }, [items]);

    return (
        <Grid
            container
            width={'100%'}
            spacing={1}
            alignItems={'center'}
            justifyContent={'end'}>
            <Grid item xs={2} textAlign={'end'}>
                <Typography variant={'h4'}>{args.property.name}</Typography>
                {args.property.isList && (
                    <Button onClick={onAdd} disabled={args.items.length == 0}>
                        <Add />
                    </Button>
                )}
            </Grid>
            <Grid item xs={10}>
                {items.map((prop) => (
                    <PAPropertiesCard
                        key={prop.id}
                        prodId={args.prodId}
                        prop={prop}
                        values={args.property.values}
                        readonly={args.readonly}
                        onLoading={args.onLoading}
                    />
                ))}
                {items.length == 0 && (
                    <PAPropertiesCard
                        prodId={args.prodId}
                        prop={newItem}
                        values={args.property.values}
                        readonly={args.readonly}
                        onLoading={args.onLoading}
                    />
                )}
            </Grid>
        </Grid>
    );
};
