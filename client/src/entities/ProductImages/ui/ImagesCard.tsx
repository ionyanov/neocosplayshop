import { FC, useCallback, useState } from 'react';
import { ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import { useGetImagesQuery } from '../model/paimages.api';
import { Loader } from '@/shared/ui/Loader';
import { getImagePath } from '@/shared/const/router';
import { IProductImages } from '../model/paimages.type';
import { BorderColor, BorderedImage } from '@/shared/ui';
import { getSettings } from '@/entities/Settings';
import { Settings } from '@/shared/types/enums';

interface ImagesCardProps {
    prodId: number;
    main?: IProductImages;
}

export const ImagesCard: FC<ImagesCardProps> = (args) => {
    const border = getSettings(Settings.BORDER, 'WHITE');
    const border_small = getSettings(Settings.BORDER_SMALL, 'WHITE');
    const { data, ...dataProp } = useGetImagesQuery(args.prodId);
    const [id, setId] = useState(args.main?.id);
    const [description, setDescription] = useState(args.main?.description);
    const [imageLink, setImageLink] = useState(args.main?.link);

    const onSelect = (item: IProductImages) => {
        setId(item.id);
        setDescription(item.description);
        setImageLink(item.link);
    };

    const onGetNext = useCallback(() => {
        if (data) {
            let index = data.findIndex((item) => item.id == id);
            if (Number.isInteger(index)) {
                index = index == data.length - 1 ? 0 : index + 1;
                onSelect(data[index]);
            }
        }
    }, [data, id]);

    if (dataProp.isLoading || !data) return <Loader />;
    return (
        <Stack direction={'column'} spacing={2} alignItems={'center'}>
            <BorderedImage
                content={getImagePath(imageLink)}
                variant={BorderColor[border!]}
                border={30}
                style={{
                    height: 'fit-content',
                    width: 'fit-content',
                    maxWidth: '100%',
                    maxHeight: '50vh',
                }}
                onClick={onGetNext}
            />
            <Typography variant="h4">{description}</Typography>
            <ImageList variant="masonry" cols={3} gap={8}>
                {data.map((item, index) => (
                    <ImageListItem key={item.id} onClick={() => onSelect(item)}>
                        <BorderedImage
                            content={getImagePath(item.link)}
                            variant={BorderColor[border_small!]}
                            border={5}
                            onClick={onGetNext}
                            style={{ height: '15vh' }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Stack>
    );
};
