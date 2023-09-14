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
import { CategoryType } from '../model/category.type';
import { CategoryEditRow } from './CategoryEditRow';
import {
    useDeleteCategoryMutation,
    useGetCategoryesQuery,
    useUpsertCategoryMutation,
} from '../model/category.api';

export const CategoryEditTable: FC = () => {
    const { data, ...props } = useGetCategoryesQuery(null);
    const [upsertCategory, upsertCategoryProps] = useUpsertCategoryMutation();
    const [deleteCategory, deleteCategoryProps] = useDeleteCategoryMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(
            props.isLoading ||
                upsertCategoryProps.isLoading ||
                deleteCategoryProps.isLoading,
        );
        setError(
            props.error ||
                upsertCategoryProps.error?.data?.message?.join('; ') ||
                deleteCategoryProps.error?.data?.message?.join('; '),
        );
    }, [props, upsertCategoryProps, deleteCategoryProps]);

    const onSave = useCallback((item: CategoryType) => {
        upsertCategory(item);
    }, []);

    const onDelete = useCallback((id: number) => {
        deleteCategory(id);
    }, []);

    return (
        <TableContainer component={Paper} aria-readonly={isLoading}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            align="center"
                            colSpan={6}
                            width={'100%'}
                            sx={{ color: 'red' }}>
                            {error}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell width={'10%'}>Order</TableCell>
                        <TableCell width={'50%'}>Name</TableCell>
                        <TableCell width={'30%'}>Link</TableCell>
                        <TableCell width={'10%'}>Visible?</TableCell>
                        <TableCell align="center">Save</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((item) => (
                            <CategoryEditRow
                                item={item}
                                key={item.id}
                                onSave={onSave}
                                onDelete={onDelete}
                                readonly={isLoading}
                            />
                        ))}
                    <CategoryEditRow
                        item={{
                            id: 0,
                            link: '',
                            name: '',
                            order: (data?.length ?? 0) + 1,
                            visible: true,
                        }}
                        onSave={onSave}
                        onDelete={onDelete}
                        readonly={isLoading}
                    />
                </TableBody>
            </Table>
        </TableContainer>
    );
};
