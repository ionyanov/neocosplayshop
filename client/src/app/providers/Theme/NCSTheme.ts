import { createTheme } from '@mui/material';

enum COLORS {
    PING_LIGHT = '#f8e0e5',
    PING_MIDDLE = '#f8a9d1',
    PING_DARK = '#f99695',
    GREEN_LIGHT = '#c0eac2',
    GREEN_DARK = '#314f33',
}

export const NCSTheme = createTheme({
    palette: {
        primary: {
            main: COLORS.GREEN_DARK,
            contrastText: COLORS.PING_DARK,
            light: COLORS.GREEN_LIGHT,
            dark: COLORS.GREEN_DARK,
        },
        secondary: {
            main: COLORS.PING_DARK,
            contrastText: COLORS.PING_DARK,
            light: COLORS.PING_LIGHT,
            dark: COLORS.PING_DARK,
        },
        action: {
            active: `${COLORS.PING_MIDDLE}50`,
            hover: `${COLORS.PING_MIDDLE}40`,
            focus: 'none',
            selected: 'none',
        },
        background: {
            default: COLORS.PING_LIGHT,
        },
        text: {
            primary: COLORS.GREEN_DARK,
            secondary: COLORS.PING_DARK,
            disabled: COLORS.PING_LIGHT,
        },
    },
    typography: {
        fontFamily: 'Nanum Gothic Coding',
        fontSize: 14,
        h1: {
            fontSize: '2.5rem',
        },
        h2: {
            fontSize: '2rem',
        },
        h3: {
            fontSize: '1.5rem',
        },
        h4: {
            fontSize: '1.2rem',
        },
        button: {
            color: COLORS.GREEN_DARK,
        },
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 'bold'
                },
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '100%',
                    backgroundImage: 'url("/image/fon.png")',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: '10px',
                        height: '10px',
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        backgroundColor: COLORS.PING_MIDDLE,
                        borderRadius: '10px',
                    },
                    '*::-webkit-scrollbar-track': {
                        backgroundColor: COLORS.PING_LIGHT,
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: COLORS.PING_MIDDLE,
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: COLORS.GREEN_DARK,
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: COLORS.PING_DARK,
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: COLORS.PING_DARK,
                    },
                },
                '& #root': {
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '100vh',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    background: `${COLORS.PING_LIGHT}dd`,
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    background: 'transparent',
                    '&:hover': {
                        color: COLORS.GREEN_DARK,
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: COLORS.GREEN_DARK,
                    textTransform: 'unset',
                    fontSize: '1.5rem',
                    '&:hover': {
                        fontWeight: 'bold',
                    },
                    '& .active': {
                        fontWeight: 'bold',
                    },
                },
                containedSecondary: {
                    fontWeight: 'bold',
                },
            },
        },
    },
});