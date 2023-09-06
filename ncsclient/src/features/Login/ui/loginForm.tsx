import {ChangeEventHandler, type FC, memo, useCallback, useState,} from 'react';
import {useSelector} from 'react-redux';
import {DynamicModuleLoader, type ReducerList,} from '@/shared/components/DynamicModuleLoader';
import {useAppDispatch} from '@/shared/hooks/useAppDispatch';
import {loginByUsername} from '../model/login.services';
import {loginActions, loginReducer} from '../model/login.slice';
import {getError, getIsLoading, getPassword, getUserName,} from '../model/login.selectors';
import {
    Alert,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

export interface LoginFormProps {
    onSuccess?: () => void;
}

const reducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm: FC<LoginFormProps> = memo((props: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    const username = useSelector(getUserName);
    const password = useSelector(getPassword);
    const error = useSelector(getError);
    const isLoading = useSelector(getIsLoading);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const onChangeUserName: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback(
        (event) => {
            dispatch(loginActions.setUserName(event.currentTarget.value));
        },
        [dispatch],
    );

    const onChangePassword: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback(
        (event) => {
            dispatch(loginActions.setPassword(event.currentTarget.value));
        },
        [dispatch],
    );

    const onLogin = useCallback(async () => {
        const [result] = await Promise.all([
            dispatch(loginByUsername({email: username, password})),
        ]);
        if (result.meta.requestStatus === 'fulfilled') {
            props.onSuccess?.();
        }
    }, [dispatch, username, password, props]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Grid
                container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                border={'2px solid black'}>
                <Typography variant="h6">Authorization</Typography>
                <Grid
                    container
                    spacing={2}
                    justifyContent={'space-around'}
                    maxWidth={650}
                    margin={2}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            type="text"
                            label="Email"
                            value={username}
                            onChange={onChangeUserName}
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end">
                                        {showPassword ? (
                                            <VisibilityOff/>
                                        ) : (
                                            <Visibility/>
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            value={password}
                            onChange={onChangePassword}
                        />
                    </FormControl>
                </Grid>
                <Button
                    onClick={onLogin}
                    variant="outlined"
                    disabled={isLoading}>
                    Login
                </Button>
                {error && (
                    <Alert severity="error">Wrong username or password</Alert>
                )}
            </Grid>
        </DynamicModuleLoader>
    );
});
export default LoginForm;
