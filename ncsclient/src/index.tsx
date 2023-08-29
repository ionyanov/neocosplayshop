import React from "react";
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './app/App.tsx'
import './index.css'
import {ErrorBoundary} from "@/app/providers/ErrorBoundary";
import {StoreProvider} from "@/app/providers/StoreProvider";

const container = document.getElementById('root');

const root = createRoot(container!);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
export { UserRole } from '@/shared/types/router';