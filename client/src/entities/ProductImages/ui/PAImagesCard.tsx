import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import {
    Button,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
} from '@mui/material';
import { PAImagesUploadCard } from './PAImagesUploadCard';
import {
    useGetImagesQuery,
    useSetMainImageMutation,
} from '../model/paimages.api';
import { Refresh } from '@mui/icons-material';
import { PAImagesRow } from './PAImagesRow';
import { Loader } from '@/shared/ui/Loader';
import { useGetProduct } from '@/entities/Product';
import { getImagePath } from '@/shared/const/router';

interface PAImagesCardProps {
    prodId: number;
}

export const PAImagesCard: FC<PAImagesCardProps> = (args) => {
    const { data, ...dataProp } = useGetImagesQuery(args.prodId);
    const { data: prodData, ...prodDataProps } = useGetProduct(args.prodId);
    const [mainImage, setMainImage] = useState(prodData?.mainImage?.id);
    const [setMain] = useSetMainImageMutation();

    const onRefresh = useCallback(() => {
        prodDataProps.refetch();
        dataProp.refetch();
    }, []);

    useEffect(() => {
        setMainImage(prodData?.mainImage?.id);
    }, [prodData]);

    const onSetMain = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setMainImage(+event.target.value);
            setMain({ prodId: args.prodId, imgId: +event.target.value }).then(
                prodDataProps.refetch,
            );
        },
        [prodData],
    );

    if (dataProp.isLoading) return <Loader />;
    return (
        <Stack direction={'column'} rowGap={2}>
            {prodData?.mainImage?.link && (
                <img
                    src={getImagePath(prodData?.mainImage.link)}
                    style={{ maxHeight: '500px', maxWidth: '100%' }}
                />
            )}
            <Grid container justifyContent={'center'}>
                <PAImagesUploadCard id={args.prodId} refresh={onRefresh} />
                <Button variant="text" onClick={onRefresh}>
                    <Refresh />
                </Button>
            </Grid>
            <RadioGroup value={mainImage} onChange={onSetMain}>
                {data?.map((img) => (
                    <FormControlLabel
                        value={img.id}
                        key={img.id}
                        control={<Radio />}
                        label={<PAImagesRow img={img} prodId={args.prodId} />}
                    />
                ))}
            </RadioGroup>
        </Stack>
    );
};
