import React from 'react';
import LoginLayout from '../../components/login-layout';

function layout({ children }) {
    return (
        <LoginLayout>
            {children}
        </LoginLayout>
    );
}

export default layout;