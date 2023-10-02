import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { Typography } from '@mui/material';
import { ProductLinePopular, ProductLineSales } from '@/entities/Product';

const MainPage: FC = () => {
    return (
        <Page showImg>
            <Typography align={'center'} variant={'h1'}>
                WORLDWIDE SHIPPING
            </Typography>
            <ProductLinePopular />
            <ProductLineSales />
            <Typography align={'center'} variant={'h2'}>
                Follow us on Instagram
            </Typography>
        </Page>
    );
};

export default MainPage;
