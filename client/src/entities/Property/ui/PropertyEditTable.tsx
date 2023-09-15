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
    useDeleteValueMutation,
    useGetPropertiesQuery,
    useSetPropertyValueMutation,
    useUpsertPropertyMutation,
} from '../model/property.api';
import { PropertyEditRow } from './PropertyEditRow';
import { IProperty } from '../model/property.type';
import { TablePage } from '@/shared/ui';
import { errorsToString } from '@/shared/helpers/error.helper';

export const PropertyEditTable: FC = () => {
    const { data, ...props } = useGetPropertiesQuery();
    const [upsertProperty, upsertPropertyProps] = useUpsertPropertyMutation();
    const [deleteValue, deleteValueProps] = useDeleteValueMutation();
    const [saveValue, saveValueProps] = useSetPropertyValueMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(
            props.isLoading ||
                upsertPropertyProps.isLoading ||
                deleteValueProps.isLoading ||
                saveValueProps.isLoading,
        );
        setError(
            errorsToString([
                props.error,
                upsertPropertyProps.error,
                deleteValueProps.error,
                saveValueProps.error,
            ]),
        );
    }, [props, upsertPropertyProps, deleteValueProps, saveValueProps]);

    const onSave = useCallback((item: IProperty) => {
        upsertProperty(item);
    }, []);

    return (
        <TablePage
            error={error}
            refresh={props.refetch}
            title="Properties administration">
            <TableContainer
                component={Paper}
                aria-readonly={isLoading}
                sx={{ maxHeight: 600 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell width={'20%'} align="center">
                                Name
                            </TableCell>
                            <TableCell align="center">Is list</TableCell>
                            <TableCell width={'60%'} align="center" colSpan={2}>
                                Values
                            </TableCell>
                            <TableCell align="center">Save</TableCell>
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
                                    onDeleteValue={deleteValue}
                                    readonly={isLoading}
                                />
                            ))}
                        <PropertyEditRow
                            property={{
                                id: 0,
                                name: '',
                                isList: false,
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
