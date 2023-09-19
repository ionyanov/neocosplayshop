import { FC, useCallback, useEffect, useState } from 'react';
import {
    Button,
    TextField,
    TableCell,
    TableRow,
    Checkbox,
    Grid,
    Collapse,
} from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';
import { IProduct } from '../model/productadmin.type';
import { errorsToString } from '@/shared/helpers/error.helper';
import {
    useSetAdminProductMutation,
    useDeleteAdminProductMutation,
} from '../model/productadmin.api';
import { getRouteAdminProduct } from '@/shared/const/router';
import { SingleSelector } from '@/shared/ui';
import { useGetCategoriesQuery } from '@/entities/Category/model/category.api';
import { IBaseType } from '@/shared/types/baseType';

interface ProductsEditRowProps {
    item: IProduct;
    readonly: boolean;
    onLoading?: (isLoading: boolean) => void;
    onError?: (error: string) => void;
}

export const ProductsEditRow: FC<ProductsEditRowProps> = (args) => {
    const { data = [] } = useGetCategoriesQuery();
    const [setProduct, setProductProps] = useSetAdminProductMutation();
    const [delProduct, delProductProps] = useDeleteAdminProductMutation();

    const [canSave, setCanSave] = useState(false);
    const [name, setName] = useState(args.item.name);
    const [price, setPrice] = useState(args.item.price);
    const [category, setCategory] = useState(args.item.category);
    const [isOnsales, setIsOnsales] = useState(args.item.isOnsales ?? false);
    const [isPopular, setIsPopular] = useState(args.item.isPopular ?? false);

    useEffect(() => {
        if (args.onLoading)
            args.onLoading(
                setProductProps.isLoading || delProductProps.isLoading,
            );
        if (args.onError)
            args.onError(
                errorsToString([setProductProps.error, delProductProps.error]),
            );
    }, [setProductProps, delProductProps]);

    useEffect(() => {
        setName(args.item.name);
        setPrice(args.item.price);
        setCategory(args.item.category);
        setIsOnsales(args.item.isOnsales ?? false);
        setIsPopular(args.item.isPopular ?? false);
    }, [args.item]);

    useEffect(() => {
        setCanSave(
            args.item.name != name ||
                args.item.price != price ||
                args.item.category?.id != category?.id ||
                args.item.isOnsales != isOnsales ||
                args.item.isPopular != isPopular,
        );
    }, [args.item, name, price, category, isOnsales, isPopular]);

    const onSaveClick = useCallback(() => {
        setProduct({
            id: args.item.id,
            name: name,
            price: price,
            category: category,
            isOnsales: isOnsales,
            isPopular: isPopular,
        });
    }, [args.item, name, price, category, isOnsales, isPopular]);

    const onDeleteClick = useCallback(() => {
        delProduct(args.item.id);
    }, [args.item]);

    const onCategoryChange = useCallback((val: IBaseType | undefined) => {
        if (val) setCategory(val);
    }, []);

    return (
        <TableRow>
            <TableCell>{args.item.id}</TableCell>
            <TableCell>
                <TextField
                    error={name != args.item.name}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    variant={'outlined'}
                    fullWidth
                    disabled={args.readonly}
                />
            </TableCell>
            <TableCell>
                <TextField
                    error={price != args.item.price}
                    value={price}
                    onChange={(event) =>
                        setPrice(Number.parseFloat(event.target.value))
                    }
                    variant={'outlined'}
                    fullWidth
                    disabled={args.readonly}
                />
            </TableCell>
            <TableCell align="center">
                <SingleSelector<IBaseType>
                    allValues={data}
                    selectedValues={args.item.category}
                    getLabel={(cat) => cat.name}
                    comparer={(opt, val) => opt.id == val.id}
                    onSelectValue={onCategoryChange}
                />
            </TableCell>
            <TableCell align="center">
                <Checkbox
                    checked={isOnsales}
                    onChange={(e) => setIsOnsales(e.target.checked)}
                    disabled={args.readonly}
                />
            </TableCell>
            <TableCell align="center">
                <Checkbox
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    disabled={args.readonly}
                />
            </TableCell>
            <TableCell>
                <Button
                    onClick={onSaveClick}
                    disabled={args.readonly || !canSave}>
                    <Save />
                </Button>
            </TableCell>
            <TableCell align="center">
                {args.item.id != 0 && (
                    <Button href={getRouteAdminProduct(args.item.id)}>
                        <Edit />
                    </Button>
                )}
            </TableCell>
            <TableCell align="center">
                {args.item.id != 0 && (
                    <Button onClick={onDeleteClick} disabled={args.readonly}>
                        <Delete />
                    </Button>
                )}
            </TableCell>
        </TableRow>
    );
};
