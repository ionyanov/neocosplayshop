import * as React from 'react';
import { FC } from 'react';
import { getSettingsQuery } from '../model/api/settingsApi';
import { AppBar, Fab, styled, Toolbar } from '@mui/material';
import { Settings } from '@/shared/types/settings';
import * as Icons from '@mui/icons-material';

const StyledFab = styled(Fab)({
    left: 30,
    right: 0,
    margin: '10px',
    backgroundColor: '#fa9696',
});

export const SettingsList: FC = (props) => {
    const { data, isLoading } = getSettingsQuery();
    if (!isLoading) {
        return (
            <AppBar position='fixed' color='transparent' sx={{ top: 'auto', bottom: 0, boxShadow: 'none' }}>
                <Toolbar>
                    <StyledFab variant='circular' href={data[Settings.INSTA]}>
                        <Icons.Instagram fontSize='large' sx={{ color: 'white', backgroundColor: '#fa9696' }} />
                    </StyledFab>
                    <StyledFab variant='circular' href={data[Settings.BOOSTY]}>
                        <Icons.Bed fontSize='large' sx={{ color: 'white', backgroundColor: '#fa9696' }} />
                    </StyledFab>
                    <StyledFab variant='circular' href={data[Settings.EMAIL]} size={'large'}>
                        <Icons.AlternateEmail fontSize='large' sx={{ color: 'white', backgroundColor: '#fa9696' }} />
                    </StyledFab>
                </Toolbar>
            </AppBar>
        );
    }
    return (
        <></>
    );

};