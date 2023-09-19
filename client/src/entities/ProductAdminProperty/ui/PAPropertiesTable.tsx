import { FC, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { PAPropertiesRow } from './PAPropertiesRow';
import {
    useGetCategoryPropertiesQuery,
    useGetPropertiesQuery,
} from '../model/paproperty.api';

interface PAPropertiesTableProps {
    id: number;
}

export const PAPropertiesTable: FC<PAPropertiesTableProps> = (args) => {
    const { data: catData, ...catDataProps } = useGetCategoryPropertiesQuery(
        args.id,
    );
    const { data, ...dataProps } = useGetPropertiesQuery(args.id);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(dataProps.isLoading);
    }, [dataProps]);

    if (dataProps.isLoading || catDataProps.isLoading || !data || !catData)
        return <div>Loading...</div>;

    return (
        <Stack direction={'column'} rowGap={0}>
            {catData.map((catProp) => (
                <PAPropertiesRow
                    prodId={args.id}
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
