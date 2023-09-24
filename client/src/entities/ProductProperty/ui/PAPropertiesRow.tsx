import { FC } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import {
    ICategoryProperties,
    IProductAdminProperty,
} from '../model/paproperty.type';
import { PAPropertiesCard } from './PAPropertiesCard';
import { Save } from '@mui/icons-material';

interface PAPropertiesRowProps {
    prodId: number;
    property: ICategoryProperties;
    items: IProductAdminProperty[];
    readonly: boolean;
    onLoading?: (isLoading: boolean) => void;
}

export const PAPropertiesRow: FC<PAPropertiesRowProps> = (args) => {
    return (
        <Grid
            container
            width={'100%'}
            gap={1}
            alignItems={'center'}
            justifyContent={'end'}>
            <Typography variant={'h4'}>{args.property.name}</Typography>
            <Grid item xs={10}>
                {args.items.map((prop) => (
                    <PAPropertiesCard
                        key={prop.id}
                        prodId={args.prodId}
                        prop={prop}
                        values={args.property.values}
                        readonly={args.readonly}
                        onLoading={args.onLoading}
                    />
                ))}
                {args.items.length == 0 && (
                    <PAPropertiesCard
                        prodId={args.prodId}
                        prop={{
                            id: 0,
                            propertyId: args.property.id,
                            property: {
                                id: args.property.id,
                                isList: args.property.isList,
                                name: args.property.name,
                            },
                        }}
                        values={args.property.values}
                        readonly={args.readonly}
                        onLoading={args.onLoading}
                    />
                )}
            </Grid>
        </Grid>
    );
};
