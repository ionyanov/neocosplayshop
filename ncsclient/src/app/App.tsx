import CssBaseline from '@mui/material/CssBaseline';
import { Box, ThemeProvider, Toolbar } from '@mui/material';
import { NCSTheme } from './providers/Theme/NCSTheme';
import { Navbar } from '@/widgets/Navbar';
import { AppRouter } from '@/app/providers/AppRouter';
import { ContactsLine } from '@/entities/Settings/ui/ContactsLine';
import { getUserIsInit, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MainPicture } from '@/shared/ui';

function App() {
    const dispatch = useAppDispatch();
    const isInit = useSelector(getUserIsInit);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    let content = <Box>Loading...</Box>;
    if (isInit) {
        content = (
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Navbar />
                <Box component="main" sx={{ width: '100%' }}>
                    <Toolbar />
                    <MainPicture />
                    <AppRouter />
                    <Toolbar />
                </Box>
                <ContactsLine />
            </Box>
        );
    }

    return (
        <ThemeProvider theme={NCSTheme}>
            <CssBaseline />
            {content}
        </ThemeProvider>
    );
}

export default App;
