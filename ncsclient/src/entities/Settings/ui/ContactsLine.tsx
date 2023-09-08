import { FC, useEffect } from 'react';
import { AppBar, Fab, styled, Toolbar } from '@mui/material';
import { Settings } from '@/shared/types/settings';
import * as Icons from '@mui/icons-material';
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
                        <Icons.Instagram
                            fontSize="large"
                            sx={{
                                color: 'white',
                                backgroundColor: '#fa9696',
                            }}
                        />
                    </StyledFab>
                    <StyledFab variant="circular" href={data[Settings.BOOSTY]}>
                        <Icons.Bed
                            fontSize="large"
                            sx={{
                                color: 'white',
                                backgroundColor: '#fa9696',
                            }}
                        />
                    </StyledFab>
                    <StyledFab
                        variant="circular"
                        href={data[Settings.EMAIL]}
                        size={'large'}>
                        <Icons.AlternateEmail
                            fontSize="large"
                            sx={{
                                color: 'white',
                                backgroundColor: '#fa9696',
                            }}
                        />
                    </StyledFab>
                </Toolbar>
            </AppBar>
        );
    }
    return <></>;
};
