import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { Typography } from '@mui/material';
import { Settings } from '@/shared/types/enums';
import * as Icons from '@mui/icons-material';
import { useInitSettingsQuery } from '@/entities/Settings';

const CommissionsPage: FC = () => {
    const { data, isLoading } = useInitSettingsQuery();
    if (isLoading) return <></>;
    return (
        <Page>
            <Typography align={'center'} variant={'h1'}>
                COSPLAY COMMISSIONS AND CUSTOM ORDER
            </Typography>
            <Typography align={'center'}>You can order any wig</Typography>
            <Typography align={'center'}>For all questions</Typography>
            <Typography
                align={'center'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Icons.AlternateEmail
                    fontSize="medium"
                    sx={{ color: 'white', backgroundColor: '#fa9696' }}
                />
                {data?.[Settings.EMAIL]}
            </Typography>
            <Typography
                align={'center'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Icons.Instagram
                    fontSize="medium"
                    sx={{ color: 'white', backgroundColor: '#fa9696' }}
                />
                {data?.[Settings.INSTA]}
            </Typography>
        </Page>
    );
};

export default CommissionsPage;
