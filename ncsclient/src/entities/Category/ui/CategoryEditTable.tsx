import { FC, useCallback, useEffect, useState } from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import {
    getCategories,
    getCategoriesError,
    getCategoriesIsInit,
} from '../model/category.selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { CategoryType } from '../model/category.type';
import {
    initCategories,
    deleteCategory,
    upsertCategory,
} from '../model/category.services';
import { CategoryEditRow } from './CategoryEditRow';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/components/DynamicModuleLoader';
import { categoryReducer } from '../model/category.slice';

const reducers: ReducerList = {
    category: categoryReducer,
};
export const CategoryEditTable: FC = () => {
    const dispatch = useAppDispatch();
    const data = useSelector(getCategories);
    const isInit = useSelector(getCategoriesIsInit);
    const error = useSelector(getCategoriesError);

    useEffect(() => {
        dispatch(initCategories());
    }, []);

    const onSave = useCallback((item: CategoryType) => {
        dispatch(upsertCategory(item));
    }, []);

    const onDelete = useCallback((id: number) => {
        dispatch(deleteCategory(id));
    }, []);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <TableContainer component={Paper} aria-readonly={!isInit}>
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
                                    readonly={!isInit}
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
                            readonly={!isInit}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </DynamicModuleLoader>
    );
};
