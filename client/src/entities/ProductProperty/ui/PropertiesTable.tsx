import { FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { useGetPAPropertiesQuery } from '../model/paproperty.api';
import { Loader } from '@/shared/ui/Loader';

interface PropertiesTableProps {
    prodId: number;
}

export const PropertiesTable: FC<PropertiesTableProps> = (prop) => {
    const { data, ...dataProps } = useGetPAPropertiesQuery(prop.prodId);
    if (dataProps.isLoading || !data) return <Loader />;

    return (
        <Stack direction={'column'}>
            {data.map((item) => (
                <Grid
                    key={item.id}
                    container
                    width={'100%'}
                    gap={1}
                    alignItems={'center'}
                    justifyContent={'end'}>
                    <Typography variant={'h4'}>{item.property.name}</Typography>
                    <Grid item xs={10}>
                        <Typography variant={'h5'}>
                            {item.property?.isList
                                ? item.propertyValues?.value
                                : item.value}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
        </Stack>
    );
};
