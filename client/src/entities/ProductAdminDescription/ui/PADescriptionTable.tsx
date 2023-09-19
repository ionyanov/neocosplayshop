import { FC, useEffect, useState } from 'react';
import { Container, Grid, Stack } from '@mui/material';
import { useGetDescriptionsQuery } from '../model/padescription.api';
import { errorsToString } from '@/shared/helpers/error.helper';
import { PADescriptionRow } from './PADescriptionRow';
import { DropDownIcon } from '@/shared/types/enums';

interface PADescriptionTableProps {
    id: number;
}

export const PADescriptionTable: FC<PADescriptionTableProps> = (args) => {
    const { data, ...dataProps } = useGetDescriptionsQuery(args.id);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(dataProps.isLoading);
    }, [dataProps]);

    if (dataProps.isLoading) return <div>Loading...</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <Stack direction={'column'} rowGap={2}>
            {data.map((item) => (
                <PADescriptionRow
                    prodId={args.id}
                    item={item}
                    readonly={isLoading}
                    key={item.id}
                    onLoading={setIsLoading}
                />
            ))}
            <PADescriptionRow
                prodId={args.id}
                item={{
                    id: 0,
                    description: '',
                    type: 'SIMPLE',
                }}
                readonly={isLoading}
                onLoading={setIsLoading}
            />
        </Stack>
    );
};
