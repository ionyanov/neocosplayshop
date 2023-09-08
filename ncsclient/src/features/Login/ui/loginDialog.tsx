import { Backdrop, Dialog, DialogContent, DialogTitle } from '@mui/material';
import LoginForm from './loginForm';

export const LoginDialog = (props: { open: boolean; onClose: () => void }) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullWidth={true}
            maxWidth={'xs'}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <LoginForm onSuccess={props.onClose} />
            </DialogContent>
        </Dialog>
    );
};
