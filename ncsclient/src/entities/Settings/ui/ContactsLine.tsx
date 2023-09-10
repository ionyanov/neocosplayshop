import { FC, useEffect } from 'react';
import { AppBar, Fab, styled, Toolbar } from '@mui/material';
import { Settings } from '@/shared/types/settings';
import { getSettings, getSettingsIsInit } from '../model/settings.selectors';
import { useSelector } from 'react-redux';
import { initSettings } from '../model/settings.services';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

const StyledFab = styled(Fab)({
    left: 30,
    right: 0,
    margin: '10px',
    backgroundColor: '#fa9696',
});

export const ContactsLine: FC = (props) => {
    const dispatch = useAppDispatch();
    const data = useSelector(getSettings);
    const isInit = useSelector(getSettingsIsInit);

    useEffect(() => {
        dispatch(initSettings());
    }, []);

    if (isInit && data) {
        return (
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <StyledFab variant="circular" href={data[Settings.INSTA]}>
                        <img
                            src={'/image/itstagramm.png'}
                            style={{ width: '100%' }}
                        />
                    </StyledFab>
                    <StyledFab variant="circular" href={data[Settings.BOOSTY]}>
                        <img
                            src={'/image/boosty.png'}
                            style={{ width: '100%' }}
                        />
                    </StyledFab>
                    <StyledFab
                        variant="circular"
                        href={`mailto:${data[Settings.EMAIL]}`}
                        size={'large'}>
                        <img
                            src={'/image/email.png'}
                            style={{ width: '100%' }}
                        />
                    </StyledFab>
                </Toolbar>
            </AppBar>
        );
    }
    return <></>;
};
