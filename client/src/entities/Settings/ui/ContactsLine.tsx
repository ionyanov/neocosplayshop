import { FC } from 'react';
import { AppBar, Fab, styled, Toolbar } from '@mui/material';
import { Settings } from '@/shared/types/settings';
import { useInitSettingsQuery } from '../model/settings.api';

const StyledFab = styled(Fab)({
    left: 30,
    right: 0,
    margin: '10px',
    backgroundColor: '#fa9696',
});

export const ContactsLine: FC = () => {
    const { data, isLoading } = useInitSettingsQuery();

    if (isLoading) return <></>;

    return (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                <StyledFab variant="circular" href={data?.[Settings.INSTA]}>
                    <img
                        src={'/image/itstagramm.png'}
                        style={{ width: '100%' }}
                    />
                </StyledFab>
                <StyledFab variant="circular" href={data?.[Settings.BOOSTY]}>
                    <img src={'/image/boosty.png'} style={{ width: '100%' }} />
                </StyledFab>
                <StyledFab
                    variant="circular"
                    href={`mailto:${data?.[Settings.EMAIL]}`}
                    size={'large'}>
                    <img src={'/image/email.png'} style={{ width: '100%' }} />
                </StyledFab>
            </Toolbar>
        </AppBar>
    );
};
