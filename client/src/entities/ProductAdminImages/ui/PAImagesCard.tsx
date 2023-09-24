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

interface PAImagesCardProps {
    prodId: number;
    mainImage: number;
}

export const PAImagesCard: FC<PAImagesCardProps> = (args) => {
    const { data, ...dataProp } = useGetImagesQuery(args.prodId);
    const [mainImage, setMainImage] = useState(args.mainImage);
    const [setMain] = useSetMainImageMutation();

    const onRefresh = useCallback(() => {
        dataProp.refetch();
    }, []);

    const onSetMain = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setMainImage(+event.target.value);
            setMain({ prodId: args.prodId, imgId: +event.target.value });
        },
        [args.mainImage],
    );

    if (dataProp.isLoading) return <></>;
    return (
        <Stack direction={'column'} rowGap={2}>
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
