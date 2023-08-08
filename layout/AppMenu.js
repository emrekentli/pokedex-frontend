import React, {useContext} from 'react';
import AppMenuitem from './AppMenuitem';
import {LayoutContext} from './context/layoutcontext';
import {MenuProvider} from './context/menucontext';
import Link from 'next/link';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model = [
        {
            label: 'Favorites',
            icon: 'pi pi-fw pi-home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Pokemons', icon: 'pi pi-fw pi-home', to: '/pokemons' },
            { label: 'Settings', icon: 'pi pi-fw pi-home', items: [
                { label: 'Types', icon: 'pi pi-fw pi-home', to: '/types' }
                ,  { label: 'Stats', icon: 'pi pi-fw pi-home', to: '/stats' }
                ,  { label: 'Abilities', icon: 'pi pi-fw pi-home', to: '/abilities' }
            ] }],
        },

        {
            label: 'Components',
            icon: 'pi pi-fw pi-align-left',
            items: [
                {
                    label: 'Submenu 1',
                    icon: 'pi pi-fw pi-align-left',
                    items: [
                        { separator: true },
                        {
                            label: 'UI Kit',
                            icon: 'pi pi-fw pi-id-card',
                            items: [
                                { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
                                { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input' },
                                { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/floatlabel' },
                                { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/invalidstate' },
                                { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button', className: 'rotated-icon' },
                                { label: 'Table', icon: 'pi pi-fw pi-table', to: '/table' },
                                { label: 'List', icon: 'pi pi-fw pi-list', to: '/list' },
                                { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree' },
                                { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel' },
                                { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay' },
                                { label: 'Media', icon: 'pi pi-fw pi-image', to: '/media' },
                                { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu' },
                                { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages' },
                                { label: 'File', icon: 'pi pi-fw pi-file', to: '/file' },
                                { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },
                                { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc' }
                            ]
                        },
                        { separator: true },
                        {
                            label: 'PrimeBlocks',
                            icon: 'pi pi-fw pi-prime',
                            items: [
                                { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW', badgeStyle: { width: '40px' } },
                                { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-react', target: '_blank' }
                            ]
                        },
                        { separator: true },
                        {
                            label: 'Utilities',
                            icon: 'pi pi-fw pi-compass',
                            items: [
                                { label: 'Icons', icon: 'pi pi-fw pi-prime', to: '/icons' },
                                { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://www.primefaces.org/primeflex', target: '_blank' }
                            ]
                        },
                        {
                            label: 'Pages',
                            icon: 'pi pi-fw pi-pencil',
                            items: [
                                { label: 'Crud', icon: 'pi pi-fw pi-pencil', to: '/crud' },
                                { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', to: '/calendar' },
                                { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline' },
                                { label: 'Landing', icon: 'pi pi-fw pi-user-plus', url: 'assets/pages/landing.html', target: '_blank' },
                                { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login' },
                                { label: 'Invoice', icon: 'pi pi-fw pi-dollar', to: '/invoice' },
                                { label: 'Help', icon: 'pi pi-fw pi-question-circle', to: '/help' },
                                { label: 'Error', icon: 'pi pi-fw pi-times-circle', to: '/error' },
                                { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound' },
                                { label: 'Access Denied', icon: 'pi pi-fw pi-lock', to: '/access' },
                                { label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty' }
                            ]
                        },
                        { separator: true }
                    ]
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.i} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
