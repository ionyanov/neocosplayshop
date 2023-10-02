import { FC, useCallback, useEffect, useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import {
    useDelPropertyValueMutation,
    useGetPropertiesQuery,
    useSetPropertyValueMutation,
    useSetPropertyMutation,
} from '../model/property.api';
import { TablePage } from '@/shared/ui';
import { errorsToString } from '@/shared/helpers/error.helper';
import { PropertyEditRow } from './PropertyEditRow';
import { IProperty } from '../model/property.type';

export const PropertyEditTable: FC = () => {
    const { data, ...dataProps } = useGetPropertiesQuery();
    const [setProperty, setPropertyProps] = useSetPropertyMutation();
    const [delValue, delValueProps] = useDelPropertyValueMutation();
    const [saveValue, saveValueProps] = useSetPropertyValueMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(
            dataProps.isLoading ||
                setPropertyProps.isLoading ||
                delValueProps.isLoading ||
                saveValueProps.isLoading,
        );
        setError(
            errorsToString([
                dataProps.error,
                setPropertyProps.error,
                delValueProps.error,
                saveValueProps.error,
            ]),
        );
    }, [dataProps, setPropertyProps, delValueProps, saveValueProps]);

    const onSave = useCallback((item: IProperty) => {
        setProperty(item);
    }, []);

    return (
        <TablePage
            error={error}
            refresh={dataProps.refetch}
            title="Properties administration">
            <TableContainer
                component={Paper}
                aria-readonly={isLoading}
                sx={{ maxHeight: '80vh' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell width={'5%'}>Order</TableCell>
                            <TableCell width={'20%'}>Name</TableCell>
                            <TableCell>Is list</TableCell>
                            <TableCell width={'75%'}>Values</TableCell>
                            <TableCell>Save</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((item) => (
                                <PropertyEditRow
                                    property={item}
                                    key={item.id}
                                    onSave={onSave}
                                    onSaveValue={saveValue}
                                    onDeleteValue={delValue}
                                    readonly={isLoading}
                                />
                            ))}
                        <PropertyEditRow
                            property={{
                                id: 0,
                                name: '',
                                isList: false,
                                order: data?.length ?? 1,
                            }}
                            onSave={onSave}
                            readonly={isLoading}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </TablePage>
    );
};
