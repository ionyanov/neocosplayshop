import { FC, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { useGetDescriptionsQuery } from '../model/padescription.api';
import { PADescriptionRow } from './PADescriptionRow';
import { Loader } from '@/shared/ui/Loader';

interface PADescriptionTableProps {
    id: number;
}

export const PADescriptionTable: FC<PADescriptionTableProps> = (args) => {
    const { data, ...dataProps } = useGetDescriptionsQuery(args.id);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(dataProps.isLoading);
    }, [dataProps]);

    if (dataProps.isLoading ?? !data) return <Loader />;
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
