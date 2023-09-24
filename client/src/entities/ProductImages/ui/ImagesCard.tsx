import { FC, useState } from 'react';
import { ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import { useGetImagesQuery } from '../model/paimages.api';
import { Loader } from '@/shared/ui/Loader';
import { getImagePath } from '@/shared/const/router';
import { IProductImages } from '../model/paimages.type';

interface ImagesCardProps {
    prodId: number;
    main?: IProductImages;
}

export const ImagesCard: FC<ImagesCardProps> = (args) => {
    const { data, ...dataProp } = useGetImagesQuery(args.prodId);
    const [description, setDescription] = useState(args.main?.description);
    const [imageLink, setImageLink] = useState(args.main?.link);

    const onSelect = (item: IProductImages) => {
        setDescription(item.description);
        setImageLink(item.link);
    };

    if (dataProp.isLoading || !data) return <Loader />;
    return (
        <Stack direction={'column'} spacing={2}>
            <img src={getImagePath(imageLink)} />
            <Typography variant="h5">{description}</Typography>
            <ImageList variant="masonry" cols={2} gap={8}>
                {data.map((item) => (
                    <ImageListItem key={item.id} onClick={() => onSelect(item)}>
                        <img
                            srcSet={`${getImagePath(
                                item.link,
                            )}??w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${getImagePath(
                                item.link,
                            )}?w=248&fit=crop&auto=format`}
                            alt={item.description}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Stack>
    );
};
