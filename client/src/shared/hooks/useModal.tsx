import { useCallback, useEffect, useRef, useState } from 'react';

const ANIMATION_DURATION = 300;

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay?: number;
}

interface UseModalResult {
    isClosing: boolean;
    isMounted: boolean;
    close?: () => void;
}

export function useModal(props: UseModalProps): UseModalResult {
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timeRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (props.isOpen) {
            setIsMounted(true);
        }
    }, [props.isOpen]);

    const close = useCallback(() => {
        if (props.onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                props.onClose?.();
                setIsClosing(false);
            }, props.animationDelay ?? ANIMATION_DURATION);
        }
    }, [props]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close();
            }
        },
        [close],
    );

    useEffect(() => {
        if (props.isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timeRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [props.isOpen, onKeyDown]);

    return {
        isClosing,
        isMounted,
        close,
    };
}
