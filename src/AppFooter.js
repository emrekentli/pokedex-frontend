import React from 'react';

const AppFooter = () => {
    return (
        <div className="layout-footer">
            <div className="footer-logo-container">
                <img className="w-full " src="assets/layout/images/logo.png" alt="diamond-layout" />
                <span className="app-name">Pokedex</span>
            </div>
            <span className="copyright">&#169; Emre Kentli - 2023</span>
        </div>
    );
};

export default AppFooter;
