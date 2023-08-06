import React from 'react';
import { classNames } from 'primereact/utils';
import { RadioButton } from 'primereact/radiobutton';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';

const AppConfig = (props) => {
    const menuThemes = [
        {
            name: 'white',
            color: '#ffffff',
            logoColor: 'dark',
            componentTheme: props.componentTheme
        },
        {
            name: 'darkgray',
            color: '#343a40',
            logoColor: 'white',
            componentTheme: props.componentTheme
        },
        {
            name: 'blue',
            color: '#1976d2',
            logoColor: 'white',
            componentTheme: 'blue'
        },
        {
            name: 'bluegray',
            color: '#455a64',
            logoColor: 'white',
            componentTheme: 'lightgreen'
        },
        {
            name: 'brown',
            color: '#5d4037',
            logoColor: 'white',
            componentTheme: 'cyan'
        },
        {
            name: 'cyan',
            color: '#0097a7',
            logoColor: 'white',
            componentTheme: 'cyan'
        },
        {
            name: 'green',
            color: '#388e3C',
            logoColor: 'white',
            componentTheme: 'green'
        },
        {
            name: 'indigo',
            color: '#303f9f',
            logoColor: 'white',
            componentTheme: 'indigo'
        },
        {
            name: 'deeppurple',
            color: '#512da8',
            logoColor: 'white',
            componentTheme: 'deeppurple'
        },
        {
            name: 'orange',
            color: '#F57c00',
            logoColor: 'dark',
            componentTheme: 'orange'
        },
        {
            name: 'pink',
            color: '#c2185b',
            logoColor: 'white',
            componentTheme: 'pink'
        },
        {
            name: 'purple',
            color: '#7b1fa2',
            logoColor: 'white',
            componentTheme: 'purple'
        },
        {
            name: 'teal',
            color: '#00796b',
            logoColor: 'white',
            componentTheme: 'teal'
        }
    ];

    const componentThemes = [
        { name: 'blue', color: '#42A5F5' },
        { name: 'green', color: '#66BB6A' },
        { name: 'lightgreen', color: '#9CCC65' },
        { name: 'purple', color: '#AB47BC' },
        { name: 'deeppurple', color: '#7E57C2' },
        { name: 'indigo', color: '#5C6BC0' },
        { name: 'orange', color: '#FFA726' },
        { name: 'cyan', color: '#26C6DA' },
        { name: 'pink', color: '#EC407A' },
        { name: 'teal', color: '#26A69A' }
    ];

    const onConfigButtonClick = (event) => {
        props.onConfigButtonClick(event);
        event.preventDefault();
    };

    const getMenuThemes = () => {
        if (props.colorScheme === 'light') {
            return (
                <div className="layout-themes">
                    {menuThemes.map((theme) => {
                        const checkStyle = theme.name === 'white' ? 'black' : 'white';
                        return (
                            <div key={theme.name}>
                                <button type="button" className="p-link" style={{ cursor: 'pointer', backgroundColor: theme.color }} onClick={() => props.changeMenuTheme(theme.name, theme.logoColor, theme.componentTheme)} title={theme.name}>
                                    {props.menuTheme === 'layout-sidebar-' + theme.name && (
                                        <span className="check flex align-items-center justify-content-center">
                                            <i className="pi pi-check" style={{ color: checkStyle }}></i>
                                        </span>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return (
            <div>
                <p>Menu themes are only available in light mode and static, slim, overlay menu modes by design as large surfaces can emit too much brightness in dark mode.</p>
            </div>
        );
    };
};

export default AppConfig;
