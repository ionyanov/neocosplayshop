import CssBaseline from '@mui/material/CssBaseline';
import { Box, ThemeProvider, Toolbar } from '@mui/material';
import { NCSTheme } from './providers/Theme/NCSTheme';
import { Navbar } from '@/widgets/Navbar';
import { AppRouter } from '@/app/providers/AppRouter';
import { ContactsLine } from '@/entities/Settings/ui/ContactsLine';

function App() {
    return (
        <ThemeProvider theme={NCSTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Navbar />
                <Box component="main" sx={{ width: '100%' }}>
                    <Toolbar />
                    <AppRouter />
                    <Toolbar />
                </Box>
                <ContactsLine />
            </Box>
        </ThemeProvider>
    );
}

export default App;
