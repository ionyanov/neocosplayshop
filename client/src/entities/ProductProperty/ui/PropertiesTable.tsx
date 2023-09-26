import { FC, useEffect, useState } from 'react';
import { Chip, Card, Grid, Stack, Typography } from '@mui/material';
import {
    useGetCategoryPropertiesQuery,
    useGetPAPropertiesQuery,
} from '../model/paproperty.api';
import { Loader } from '@/shared/ui/Loader';

interface PropertiesTableProps {
    prodId: number;
}

export const PropertiesTable: FC<PropertiesTableProps> = (prop) => {
    const { data: catData, ...catDataProps } = useGetCategoryPropertiesQuery(
        prop.prodId,
    );
    const { data, ...dataProps } = useGetPAPropertiesQuery(prop.prodId);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(dataProps.isLoading || catDataProps.isLoading);
    }, [dataProps, catDataProps]);

    if (isLoading || !catData || !data) return <Loader />;
    return (
        <Stack direction={'column'}>
            {catData?.map((catProp) => (
                <>
                    {data.filter((element) => element.propertyId == catProp.id)
                        .length > 0 && (
                        <Grid
                            key={catProp.id}
                            container
                            width={'100%'}
                            gap={1}
                            alignItems={'center'}
                            justifyContent={'center'}>
                            <Grid item xs={3} md={2}>
                                <Typography variant={'h4'}>
                                    {catProp.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Typography variant={'h5'}>
                                    {data
                                        .filter(
                                            (element) =>
                                                element.propertyId ==
                                                catProp.id,
                                        )
                                        .map((item) => (
                                            <Chip
                                                label={
                                                    item.property?.isList
                                                        ? item.propertyValues
                                                              ?.value
                                                        : item.value
                                                }
                                                variant="outlined"
                                            />
                                        ))}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </>
            ))}
        </Stack>
    );
};
