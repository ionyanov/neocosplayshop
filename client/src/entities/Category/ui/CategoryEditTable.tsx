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
import { CategoryProperty, CategoryType } from '../model/category.type';
import { CategoryEditRow } from './CategoryEditRow';
import {
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
    useUpsertCategoryMutation,
} from '../model/category.api';
import { TablePage } from '@/shared/ui';
import { errorsToString } from '@/shared/helpers/error.helper';
import { useGetPropertiesQuery } from '@/entities/Property/model/property.api';

interface CategoryEditTableProp {
    properties: String[];
}

export const CategoryEditTable: FC<CategoryEditTableProp> = (args) => {
    const { data, ...props } = useGetCategoriesQuery();
    const [upsertCategory, upsertCategoryProps] = useUpsertCategoryMutation();
    const [deleteCategory, deleteCategoryProps] = useDeleteCategoryMutation();
    const [allProperties, setAllProperties] = useState<CategoryProperty[]>([]);
    const properties = useGetPropertiesQuery();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (properties.data) {
            const newArray: CategoryProperty[] = [];
            properties.data.map((item) => {
                newArray.push({ property: { id: item.id, name: item.name } });
            });
            setAllProperties(newArray);
        }
    }, [properties.data]);

    useEffect(() => {
        setIsLoading(
            props.isLoading ||
                upsertCategoryProps.isLoading ||
                deleteCategoryProps.isLoading,
        );
        setError(
            errorsToString([
                props.error,
                upsertCategoryProps.error,
                deleteCategoryProps.error,
            ]),
        );
    }, [props, upsertCategoryProps, deleteCategoryProps]);

    const onSave = useCallback((item: CategoryType) => {
        upsertCategory(item);
    }, []);

    const onDelete = useCallback((id: number) => {
        deleteCategory(id);
    }, []);

    if (properties.isLoading) return <></>;
    return (
        <TablePage
            error={error}
            refresh={props.refetch}
            title="Categories administration">
            <TableContainer component={Paper} aria-readonly={isLoading}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order</TableCell>
                            <TableCell>Visible?</TableCell>
                            <TableCell width={'30%'}>Name</TableCell>
                            <TableCell width={'20%'}>Link</TableCell>
                            <TableCell width={'50%'}>Properties</TableCell>
                            <TableCell>Save</TableCell>
                            <TableCell>Delete</TableCell>
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
                                    properties={allProperties}
                                    onLoading={setIsLoading}
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
                            properties={allProperties}
                            onLoading={setIsLoading}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </TablePage>
    );
};
