import { type FC, Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAuthData } from '@/entities/User';
import { getRouteProfile } from '@/shared/const/router';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export const LoginModal: FC<LoginModalProps> = (props) => {
    const navigate = useNavigate();
    const user = useSelector(getUserAuthData);

    const onSuccess = useCallback(() => {
        props.onClose?.();
        if (user) {
            navigate(getRouteProfile(user.id));
        }
    }, [navigate, props, user]);
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} lazy>
            <Suspense fallback={<Loader />}>
                <LoginFormAsync onSuccess={onSuccess} />
            </Suspense>
        </Modal>
    );
};
