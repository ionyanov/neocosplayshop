import React, { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { ProductLine } from '@/entities/Product/';
import { Typography } from '@mui/material';
import { MainPicture } from '@/shared/ui';

const MainPage: FC = () => {
    return (
        <Page>
            <MainPicture />
            <Typography align={'center'} variant={'h1'}>
                WORLDWIDE SHIPPING
            </Typography>
            <ProductLine
                items={[]}
                width={200}
                height={300}
                title={'Popular'}
            />
            <ProductLine items={[]} gap={50} width={350} title={'On sale'} />
            <Typography align={'center'} variant={'h2'}>
                Follow us on Instagram
            </Typography>
        </Page>
    );
};

export default MainPage;
