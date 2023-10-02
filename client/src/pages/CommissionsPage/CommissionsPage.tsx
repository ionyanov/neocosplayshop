import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { Stack, Typography } from '@mui/material';
import { Settings } from '@/shared/types/enums';
import * as Icons from '@mui/icons-material';
import { getSettings } from '@/entities/Settings';

const CommissionsPage: FC = () => {
    return (
        <Page showImg>
            <Stack alignItems={'center'} spacing={2}>
                <Typography variant={'h1'}>
                    COSPLAY COMMISSIONS AND CUSTOM ORDER
                </Typography>
                <Typography variant={'h5'}>
                    We accept individual orders, (on characters that are not in
                    our store or your original character). Write us the name of
                    the character, fandom, attach a picture if you have one. We
                    will write the price, production time, payment plan and will
                    be happy to discuss all the details about your cosplay.
                </Typography>
                <Typography variant={'h3'}>For all questions</Typography>
                <Typography variant={'h4'} display={'flex'}>
                    <Icons.AlternateEmail color="secondary" />
                    {getSettings(Settings.EMAIL)}
                </Typography>
                <Typography variant={'h4'} display={'flex'}>
                    <Icons.Instagram color="secondary" />
                    {getSettings(Settings.INSTA_SHORT)}
                </Typography>
                <img
                    src={'/images/main_pallett.jpg'}
                    style={{
                        width: '75%',
                        minHeight: '50px',
                        minWidth: '200px',
                    }}
                />
            </Stack>
        </Page>
    );
};

export default CommissionsPage;
