import { FC, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { PAPropertiesRow } from './PAPropertiesRow';
import {
    useGetCategoryPropertiesQuery,
    useGetPAPropertiesQuery,
} from '../model/paproperty.api';
import { Loader } from '@/shared/ui/Loader';

interface PAPropertiesTableProps {
    prodId: number;
}

export const PAPropertiesTable: FC<PAPropertiesTableProps> = (args) => {
    const { data: catData, ...catDataProps } = useGetCategoryPropertiesQuery(
        args.prodId,
    );
    const { data, ...dataProps } = useGetPAPropertiesQuery(args.prodId);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(dataProps.isLoading || catDataProps.isLoading);
    }, [dataProps, catDataProps]);

    if (isLoading || !catData || !data) return <Loader />;

    return (
        <Stack direction={'column'}>
            {catData.map((catProp) => (
                <PAPropertiesRow
                    prodId={args.prodId}
                    items={data.filter(
                        (element) => element.propertyId == catProp.id,
                    )}
                    readonly={isLoading}
                    key={catProp.id}
                    onLoading={setIsLoading}
                    property={catProp}
                />
            ))}
        </Stack>
    );
};
