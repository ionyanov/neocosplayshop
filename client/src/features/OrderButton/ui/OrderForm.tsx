import { FC, useCallback, useState } from 'react';
import { Alert, Button, Grid, TextField } from '@mui/material';
import { getSettings } from '@/entities/Settings';
import { Settings } from '@/shared/types/enums';
import { useMakeOrderMutation } from '../model/order.api';

interface OrderFormProps {
    onClose?: () => void;
}

export const OrderForm: FC<OrderFormProps> = (args) => {
    const [makeData] = useMakeOrderMutation();
    const [email, setEmail] = useState('');
    const [emailText, setEmailText] = useState(
        getSettings(Settings.ORDER_TEXT).replace(
            '[link]',
            window.location.href,
        ),
    );
    const [error, setError] = useState('');

    const onMakeOrder = useCallback(() => {
        console.log(emailText.replace(/(\n)/gm, '<br/>'));
        if (!email) setError('Need email!');
        else
            makeData({
                email: email,
                text: emailText.replace(/(\n)/gm, '<br/>'),
            })
                .catch((e) => console.log(e))
                .then((resp) => {
                    if (resp.error) setError(resp.error.data);
                    else if (args.onClose) args.onClose();
                });
    }, [email, emailText]);

    return (
        <Grid
            container
            spacing={1}
            padding={'10px 20px 10px 5px'}
            alignItems={'center'}>
            <Grid item xs={12} md={10}>
                <Grid container alignItems={'center'} spacing={1}>
                    <Grid item xs={2} md={1} textAlign={'end'}>
                        TO:
                    </Grid>
                    <Grid item xs={10} md={11}>
                        <TextField value={'NeoCosplayShop'} fullWidth />
                    </Grid>
                    <Grid item xs={2} md={1} textAlign={'end'}>
                        FROM:
                    </Grid>
                    <Grid item xs={10} md={11}>
                        <TextField
                            value={email}
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && (
                            <Alert variant="outlined" severity="error">
                                {error}
                            </Alert>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button fullWidth variant="outlined" onClick={onMakeOrder}>
                    SEND
                </Button>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    fullWidth
                    multiline
                    minRows={10}
                />
            </Grid>
        </Grid>
    );
};
