import { FC, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { useGetDescriptionsQuery } from '../model/padescription.api';
import { PADescriptionRow } from './PADescriptionRow';
import { Loader } from '@/shared/ui/Loader';

interface PADescriptionTableProps {
    prodId: number;
}

export const PADescriptionTable: FC<PADescriptionTableProps> = (prop) => {
    const { data, ...dataProps } = useGetDescriptionsQuery(prop.prodId);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(dataProps.isLoading);
    }, [dataProps]);

    if (dataProps.isLoading ?? !data) return <Loader />;
    return (
        <Stack direction={'column'} rowGap={2}>
            {data.map((item) => (
                <PADescriptionRow
                    prodId={prop.prodId}
                    item={item}
                    readonly={isLoading}
                    key={item.id}
                    onLoading={setIsLoading}
                />
            ))}
            <PADescriptionRow
                prodId={prop.prodId}
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
