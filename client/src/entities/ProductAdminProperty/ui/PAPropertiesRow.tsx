import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import {
    TextField,
    Grid,
    MenuItem,
    Select,
    FormControl,
    FormHelperText,
    Typography,
} from '@mui/material';
import { errorsToString } from '@/shared/helpers/error.helper';
import { DropDownIcon } from '@/shared/types/enums';
import { useDebounce } from '@/shared/hooks/useDebounce';
import {
    useDelPropertiesMutation,
    useSetPropertiesMutation,
} from '../model/paproperty.api';
import {
    ICategoryProperties,
    IProductAdminProperty,
} from '../model/paproperty.type';
import { PAPropertiesCard } from './PAPropertiesCard';

interface PAPropertiesRowProps {
    prodId: number;
    property: ICategoryProperties;
    items: IProductAdminProperty[];
    readonly: boolean;
    onLoading?: (isLoading: boolean) => void;
}

export const PAPropertiesRow: FC<PAPropertiesRowProps> = (args) => {
    return (
        <Grid container width={'100%'} gap={1}>
            <Grid
                item
                xs={2}
                alignItems={'center'}
                display={'flex'}
                justifyContent={'end'}>
                <Typography variant={'h4'}>{args.property.name}</Typography>
            </Grid>
            <Grid item xs={9}>
                {args.items.map((prop) => (
                    <PAPropertiesCard
                        prodId={args.prodId}
                        prop={prop}
                        values={args.property.values}
                        key={prop.id}
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
