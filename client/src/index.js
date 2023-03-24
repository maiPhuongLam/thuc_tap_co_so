import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { ErrorBoundary } from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import { AuthContextProvider } from './store/AuthContext';
import { ChatConetextProvider } from './store/ChatContext';
import { SocketContextProvider } from './store/SocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <SocketContextProvider>
                <ChatConetextProvider>
                    <ErrorBoundary>
                        <GlobalStyles>
                            <App />
                        </GlobalStyles>
                    </ErrorBoundary>
                </ChatConetextProvider>
            </SocketContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
