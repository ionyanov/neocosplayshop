import './App.css';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { NCSTheme } from './providers/Theme/NCSTheme';
import { MainLayout } from '@/shared/ui';
import { Navbar } from '@/widgets/Navbar';
import { ContactsLine } from '@/widgets/ContactsLine';
import { AppRouter } from '@/app/providers/AppRouter';

function App() {
    return (
        <ThemeProvider theme={NCSTheme}>
            <Box sx={{ display: 'flex' }}>
                <Navbar />
                <Box component="main">
                    <CssBaseline />
                    <AppRouter />
                </Box>
                <ContactsLine />
            </Box>
            {/*<MainLayout
                header={<Navbar />}
                content={<AppRouter />}
                footer={<ContactsLine />}
            />*/}
        </ThemeProvider>
    );
}

export default App;
