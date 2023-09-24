import { FC } from 'react';
import { Grid, Stack } from '@mui/material';
import { useGetDescriptionsQuery } from '../model/padescription.api';
import { Loader } from '@/shared/ui/Loader';
import { DropDownIcon } from '@/shared/types/enums';

interface DescriptionTableProps {
    id: number;
}

export const DescriptionTable: FC<DescriptionTableProps> = (args) => {
    const { data, ...dataProps } = useGetDescriptionsQuery(args.id);

    if (dataProps.isLoading ?? !data) return <Loader />;
    return (
        <Stack direction={'column'} rowGap={2}>
            {data.map((item) => (
                <Grid
                    container
                    width={'100%'}
                    spacing={1}
                    key={item.id}
                    alignItems={'center'}
                    justifyContent={'end'}>
                    <Grid
                        item
                        xs={2}
                        alignItems={'center'}
                        display={'flex'}
                        justifyContent={'end'}>
                        <img
                            src={`/images/${DropDownIcon[item.type]}`}
                            style={{
                                maxWidth: '45px',
                                display: 'block',
                            }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        {item.description}
                    </Grid>
                </Grid>
            ))}
        </Stack>
    );
};
