import { FC, useCallback, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    Drawer,
    FormControl,
    TextField,
} from '@mui/material';
import { OrderForm } from './OrderForm';
import { detectMobileDevice } from '@/shared/lib';

interface OrderButtonProps {}

export const OrderButton: FC<OrderButtonProps> = (args) => {
    const [open, setOpen] = useState(false);

    const onShow = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    let form = detectMobileDevice() ? (
        <Drawer anchor="bottom" open={open} onClose={onShow}>
            <OrderForm onClose={onShow} />
        </Drawer>
    ) : (
        <Dialog maxWidth="xl" onClose={onShow} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <OrderForm onClose={onShow} />
        </Dialog>
    );

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={onShow}>
                Make order
            </Button>
            {form}
        </>
    );
};
