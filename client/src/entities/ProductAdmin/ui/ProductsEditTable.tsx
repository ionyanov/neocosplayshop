import { FC, useEffect, useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { errorsToString } from '@/shared/helpers/error.helper';
import { TablePage } from '@/shared/ui';
import { useGetAdminProductsQuery } from '../model/productadmin.api';
import { ProductsEditRow } from './ProductsEditRow';

export const ProductsEditTable: FC = () => {
    const { data, ...dataProps } = useGetAdminProductsQuery();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(dataProps.isLoading);
        setError(errorsToString([dataProps.error]));
    }, [dataProps.isLoading, dataProps.error]);

    return (
        <TablePage
            error={error}
            refresh={dataProps.refetch}
            title="Product administration">
            <TableContainer
                component={Paper}
                aria-readonly={isLoading}
                sx={{ maxHeight: 600 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell width={'30%'}>Name</TableCell>
                            <TableCell width={'10%'}>Price</TableCell>
                            <TableCell width={'20%'}>Category</TableCell>
                            <TableCell>On sales</TableCell>
                            <TableCell>Popular</TableCell>
                            <TableCell>Save</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((item) => (
                                <ProductsEditRow
                                    key={item.id}
                                    item={item}
                                    readonly={isLoading}
                                    onError={setError}
                                    onLoading={setIsLoading}
                                />
                            ))}
                        <ProductsEditRow
                            item={{
                                id: 0,
                                name: '',
                                price: 0,
                            }}
                            readonly={isLoading}
                            onError={setError}
                            onLoading={setIsLoading}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </TablePage>
    );
};
