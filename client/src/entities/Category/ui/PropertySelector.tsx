import { FC, useCallback, useEffect, useState } from 'react';
import { MultiSelector } from '@/shared/ui/MultiSelect';
import { CategoryProperty } from '../model/category.type';
import {
    useDeletePropertyMutation,
    useAddPropertyMutation,
} from '../model/category.api';

interface PropertySelectorProp {
    allProperties: CategoryProperty[];
    selectedProp: CategoryProperty[];
    categoryId: number;
    onLoading?: (isLoad: boolean) => void;
}

export const PropertySelector: FC<PropertySelectorProp> = (args) => {
    const [deleteProperty, deletePropertyProps] = useDeletePropertyMutation();
    const [addProperty, addPropertyProps] = useAddPropertyMutation();

    useEffect(() => {
        if (args.onLoading)
            args.onLoading(
                deletePropertyProps.isLoading || addPropertyProps.isLoading,
            );
    }, [
        args.onLoading,
        deletePropertyProps.isLoading,
        addPropertyProps.isLoading,
    ]);

    const onSelect = useCallback(
        (item: string | CategoryProperty | undefined) => {
            addProperty({
                catId: args.categoryId,
                propId: (item as CategoryProperty).property.id,
            });
        },
        [args.categoryId, addPropertyProps],
    );

    const onDelete = useCallback(
        (item: string | CategoryProperty | undefined) => {
            deleteProperty({
                catId: args.categoryId,
                propId: (item as CategoryProperty).property.id,
            });
        },
        [args.categoryId, deletePropertyProps],
    );

    const Compare = useCallback(
        (
            option: string | CategoryProperty,
            value: string | CategoryProperty,
        ) => {
            if (
                typeof option == 'object' &&
                option &&
                typeof value == 'object' &&
                value
            )
                return option.property.id == value.property.id;
            return option == value;
        },
        [args.categoryId, addPropertyProps],
    );

    if (args.categoryId == 0) return <></>;

    return (
        <MultiSelector
            allValues={args.allProperties}
            getLabel={(option) => {
                if (typeof option == 'object' && option)
                    return option.property.name;
                return option;
            }}
            selectedValues={args.selectedProp}
            onDeleteValue={onDelete}
            onSelectValue={onSelect}
            comparer={Compare}
        />
    );
};
