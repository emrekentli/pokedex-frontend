import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { Route, Routes, useLocation } from 'react-router-dom';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppConfig from './AppConfig';
import AppSearch from './AppSearch';
import AppRightMenu from './AppRightMenu';
import AppBreadcrumb from './AppBreadcrumb';

import Dashboard from './components/Dashboard';
import FormLayoutDemo from './components/FormLayoutDemo';
import InputDemo from './components/InputDemo';
import FloatLabelDemo from './components/FloatLabelDemo';
import ButtonDemo from './components/ButtonDemo';
import TableDemo from './components/TableDemo';
import ListDemo from './components/ListDemo';
import TreeDemo from './components/TreeDemo';
import PanelDemo from './components/PanelDemo';
import OverlayDemo from './components/OverlayDemo';
import MediaDemo from './components/MediaDemo';
import MenuDemo from './components/MenuDemo';
import MessagesDemo from './components/MessagesDemo';
import FileDemo from './components/FileDemo';
import ChartDemo from './components/ChartDemo';
import MiscDemo from './components/MiscDemo';
import Documentation from './components/Documentation';
import BlocksDemo from './components/BlocksDemo';
import IconsDemo from './utilities/IconsDemo';
import CrudDemo from './pages/CrudDemo';
import CalendarDemo from './pages/CalendarDemo';
import Invoice from './pages/Invoice';
import Help from './pages/Help';
import EmptyPage from './pages/EmptyPage';
import InvalidStateDemo from './components/InvalidStateDemo';
import TimelineDemo from './pages/TimelineDemo';
import Types from './pages/Types';
import Stats from './pages/Stats';
import Abilities from './pages/Abilities';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';

const App = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('static');
    const [colorScheme, setColorScheme] = useState('light');
    const [menuTheme, setMenuTheme] = useState('layout-sidebar-darkgray');
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);
    const [topbarNotificationMenuActive, setTopbarNotificationMenuActive] = useState(false);
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const [logoColor, setLogoColor] = useState('white');
    const [componentTheme, setComponentTheme] = useState('blue');
    const [logoUrl, setLogoUrl] = useState('assets/layout/images/logo-dark.svg');
    const copyTooltipRef = useRef();
    const location = useLocation();

    let menuClick = false;
    let searchClick = false;
    let userMenuClick = false;
    let notificationMenuClick = false;
    let rightMenuClick = false;
    let configClick = false;

    const breadcrumb = [
        { path: '/', parent: 'Dashboard', label: 'Dashboard' },
        { path: '/formlayout', parent: 'UI Kit', label: 'Form Layout' },
        { path: '/input', parent: 'UI Kit', label: 'Input' },
        { path: '/floatlabel', parent: 'UI Kit', label: 'Float Label' },
        { path: '/invalidstate', parent: 'UI Kit', label: 'Invalid State' },
        { path: '/button', parent: 'UI Kit', label: 'Button' },
        { path: '/table', parent: 'UI Kit', label: 'Table' },
        { path: '/list', parent: 'UI Kit', label: 'List' },
        { path: '/tree', parent: 'UI Kit', label: 'Tree' },
        { path: '/panel', parent: 'UI Kit', label: 'Panel' },
        { path: '/overlay', parent: 'UI Kit', label: 'Overlay' },
        { path: '/media', parent: 'UI Kit', label: 'Media' },
        {path:'/abilities', parent: 'Settings', label: 'Abilities'},
        { path: '/menu', parent: 'UI Kit', label: 'Menu' },
        { path: '/menu/seat', parent: 'UI Kit', label: 'Menu' },
        { path: '/menu/payment', parent: 'UI Kit', label: 'Menu' },
        { path: '/menu/confirmation', parent: 'UI Kit', label: 'Menu' },
        { path: '/messages', parent: 'UI Kit', label: 'Messages' },
        { path: '/file', parent: 'UI Kit', label: 'File' },
        { path: '/chart', parent: 'UI Kit', label: 'Charts' },
        { path: '/misc', parent: 'UI Kit', label: 'Misc' },
        { path: '/icons', parent: 'Utilities', label: 'Icons' },
        { path: '/blocks', parent: 'PrimeBlocks', label: 'Blocks' },
        { path: '/crud', parent: 'Utilities', label: 'Crud' },
        { path: '/types', parent: 'Settings', label: 'Types' },
        { path: '/stats', parent: 'Settings', label: 'Stats' },
        { path: '/calendar', parent: 'PrimeBlocks', label: 'Calendar' },
        { path: '/timeline', parent: 'Pages', label: 'Timeline' },
        { path: '/invoice', parent: 'Pages', label: 'Invoice' },
        { path: '/help', parent: 'Pages', label: 'Help' },
        { path: '/empty', parent: 'Pages', label: 'Empty Page' },
        { path: '/documentation', parent: 'Pages', label: 'Documentation' }
    ];

    const menu = [
        {
            label: 'Favorites',
            icon: 'pi pi-fw pi-home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
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

    let meta = breadcrumb.find((obj) => {
        return obj.path === location.pathname;
    });

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const changeMenuTheme = (name, logoColor, componentTheme) => {
        onMenuThemeChange(name);
        changeStyleSheetUrl('theme-css', componentTheme, 2);
        setComponentTheme(componentTheme);

        const appLogoLink = document.getElementById('app-logo');
        const appLogoUrl = `assets/layout/images/logo-${logoColor === 'dark' ? 'dark' : 'white'}.svg`;
        const horizontalLogoLink = document.getElementById('logo-horizontal');
        const horizontalLogoUrl = `assets/layout/images/logo-${logoColor === 'dark' ? 'dark' : 'white'}.svg`;

        if (appLogoLink) {
            appLogoLink.src = appLogoUrl;
        }
        if (horizontalLogoLink) {
            horizontalLogoLink.src = horizontalLogoUrl;
        }
        setLogoColor(logoColor);
    };

    const changeComponentTheme = (theme) => {
        setComponentTheme(theme);
        changeStyleSheetUrl('theme-css', theme, 3);
    };

    const changeColorScheme = (e) => {
        setColorScheme(e.value);

        const scheme = e.value;
        changeStyleSheetUrl('layout-css', 'layout-' + scheme + '.css', 1);
        changeStyleSheetUrl('theme-css', 'theme-' + scheme + '.css', 1);

        changeLogo(scheme);
    };

    const changeStyleSheetUrl = (id, value, from) => {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute('href').split('/');

        if (from === 1) {
            // which function invoked this function
            urlTokens[urlTokens.length - 1] = value;
        } else if (from === 2) {
            // which function invoked this function
            if (value !== null) {
                urlTokens[urlTokens.length - 2] = value;
            }
        } else if (from === 3) {
            // which function invoked this function
            urlTokens[urlTokens.length - 2] = value;
        }

        const newURL = urlTokens.join('/');

        replaceLink(element, newURL);
    };

    const changeLogo = (scheme) => {
        const appLogoLink = document.getElementById('app-logo');
        const mobileLogoLink = document.getElementById('logo-mobile');
        const invoiceLogoLink = document.getElementById('invoice-logo');
        const footerLogoLink = document.getElementById('footer-logo');
        const horizontalLogoLink = document.getElementById('logo-horizontal');
        setLogoUrl(`assets/layout/images/logo-${scheme === 'light' ? 'dark' : 'white'}.svg`);

        if (appLogoLink) {
            appLogoLink.src = `assets/layout/images/logo-${scheme === 'light' ? logoColor : 'white'}.svg`;
        }

        if (horizontalLogoLink) {
            horizontalLogoLink.src = `assets/layout/images/logo-${scheme === 'light' ? logoColor : 'white'}.svg`;
        }

        if (mobileLogoLink) {
            mobileLogoLink.src = logoUrl;
        }

        if (invoiceLogoLink) {
            invoiceLogoLink.src = logoUrl;
        }

        if (footerLogoLink) {
            footerLogoLink.src = logoUrl;
        }
    };

    const replaceLink = (linkElement, href) => {
        if (isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                const _linkElement = document.getElementById(id);
                _linkElement && _linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    };

    const isIE = () => {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            onSearchHide();
        }

        if (!userMenuClick) {
            setTopbarUserMenuActive(false);
        }

        if (!notificationMenuClick) {
            setTopbarNotificationMenuActive(false);
        }

        if (!rightMenuClick) {
            setRightMenuActive(false);
        }

        if (!menuClick) {
            if (isSlim() || isHorizontal()) {
                setMenuActive(false);
            }

            if (overlayMenuActive || staticMenuMobileActive) {
                hideOverlayMenu();
            }

            unblockBodyScroll();
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        searchClick = false;
        configClick = false;
        userMenuClick = false;
        rightMenuClick = false;
        notificationMenuClick = false;
        menuClick = false;
    };

    const onMenuClick = () => {
        menuClick = true;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarUserMenuActive(false);
        setTopbarNotificationMenuActive(false);
        setRightMenuActive(false);

        if (isOverlay()) {
            setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
        }

        if (isDesktop()) {
            setStaticMenuDesktopInactive((prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive);
        } else {
            setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
        }

        event.preventDefault();
    };

    const onMenuitemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();

            if (isSlim() || isHorizontal()) {
                setMenuActive(false);
            }
        }
    };

    const onRootMenuitemClick = () => {
        setMenuActive((prevMenuActive) => !prevMenuActive);
    };

    const onMenuThemeChange = (name) => {
        setMenuTheme('layout-sidebar-' + name);
    };

    const onMenuModeChange = (e) => {
        setMenuMode(e.value);
        if (e.value === 'static') {
            setStaticMenuDesktopInactive(false);
        }
    };

    const onTopbarUserMenuButtonClick = (event) => {
        userMenuClick = true;
        setTopbarUserMenuActive((prevTopbarUserMenuActive) => !prevTopbarUserMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const onTopbarNotificationMenuButtonClick = (event) => {
        notificationMenuClick = true;
        setTopbarNotificationMenuActive((prevTopbarNotificationMenuActive) => !prevTopbarNotificationMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const toggleSearch = () => {
        setSearchActive((prevSearchActive) => !prevSearchActive);
        searchClick = true;
    };

    const onSearchClick = () => {
        searchClick = true;
    };

    const onSearchHide = () => {
        setSearchActive(false);
        searchClick = false;
    };

    const onRightMenuClick = () => {
        rightMenuClick = true;
    };

    const onRightMenuButtonClick = (event) => {
        rightMenuClick = true;
        setRightMenuActive((prevRightMenuActive) => !prevRightMenuActive);
        hideOverlayMenu();
        event.preventDefault();
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive((prevConfigActive) => !prevConfigActive);
        configClick = true;
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
        unblockBodyScroll();
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isOverlay = () => {
        return menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 1091;
    };

    const containerClassName = classNames(
        'layout-wrapper',
        {
            'layout-overlay': menuMode === 'overlay',
            'layout-static': menuMode === 'static',
            'layout-slim': menuMode === 'slim',
            'layout-horizontal': menuMode === 'horizontal',
            'layout-sidebar-dim': colorScheme === 'dim',
            'layout-sidebar-dark': colorScheme === 'dark',
            'layout-overlay-active': overlayMenuActive,
            'layout-mobile-active': staticMenuMobileActive,
            'layout-static-inactive': staticMenuDesktopInactive && menuMode === 'static',
            'p-input-filled': inputStyle === 'filled',
            'p-ripple-disabled': !ripple
        },
        colorScheme === 'light' ? menuTheme : ''
    );

    return (
        <div className={containerClassName} data-theme={colorScheme} onClick={onDocumentClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <div className="layout-content-wrapper">
                <AppTopbar
                    meta={meta}
                    topbarNotificationMenuActive={topbarNotificationMenuActive}
                    topbarUserMenuActive={topbarUserMenuActive}
                    onMenuButtonClick={onMenuButtonClick}
                    onSearchClick={toggleSearch}
                    onTopbarNotification={onTopbarNotificationMenuButtonClick}
                    onTopbarUserMenu={onTopbarUserMenuButtonClick}
                    onRightMenuClick={onRightMenuButtonClick}
                    onRightMenuButtonClick={onRightMenuButtonClick}
                    menu={menu}
                    menuMode={menuMode}
                    menuActive={menuActive}
                    staticMenuMobileActive={staticMenuMobileActive}
                    onMenuClick={onMenuClick}
                    onMenuitemClick={onMenuitemClick}
                    onRootMenuitemClick={onRootMenuitemClick}
                ></AppTopbar>

                <div className="layout-content">
                    <div className="layout-breadcrumb viewname" style={{ textTransform: 'uppercase' }}>
                        <AppBreadcrumb meta={meta} />
                    </div>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/formlayout" element={<FormLayoutDemo />} />
                        <Route path="/input" element={<InputDemo />} />
                        <Route path="/floatlabel" element={<FloatLabelDemo />} />
                        <Route path="/invalidstate" element={<InvalidStateDemo />} />
                        <Route path="/button" element={<ButtonDemo />} />
                        <Route path="/table" element={<TableDemo />} />
                        <Route path="/list" element={<ListDemo />} />
                        <Route path="/tree" element={<TreeDemo />} />
                        <Route path="/panel" element={<PanelDemo />} />
                        <Route path="/overlay" element={<OverlayDemo />} />
                        <Route path="/media" element={<MediaDemo />} />
                        <Route path="/menu/*" element={<MenuDemo />} />
                        <Route path="/messages" element={<MessagesDemo />} />
                        <Route path="/abilities" element={<Abilities />} />
                        <Route path="/file" element={<FileDemo />} />
                        <Route path="/chart" element={<ChartDemo colorMode={colorScheme} location={location} />} />
                        <Route path="/misc" element={<MiscDemo />} />
                        <Route path="/icons" element={<IconsDemo />} />
                        <Route path="/crud" element={<CrudDemo />} />
                        <Route path="/types" element={<Types />} />
                        <Route path="/stats" element={<Stats />} />
                        <Route path="/blocks" element={<BlocksDemo />} />
                        <Route path="/calendar" element={<CalendarDemo />} />
                        <Route path="/timeline" element={<TimelineDemo />} />
                        <Route path="/invoice" element={<Invoice logoUrl={logoUrl} location={location} />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/empty" element={<EmptyPage />} />
                        <Route path="/documentation" element={<Documentation />} />
                    </Routes>
                </div>

                <AppFooter />
            </div>

            <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuClick={onRightMenuClick}></AppRightMenu>

            <AppConfig
                configActive={configActive}
                menuMode={menuMode}
                onMenuModeChange={onMenuModeChange}
                colorScheme={colorScheme}
                changeColorScheme={changeColorScheme}
                menuTheme={menuTheme}
                changeMenuTheme={changeMenuTheme}
                componentTheme={componentTheme}
                changeComponentTheme={changeComponentTheme}
                onConfigClick={onConfigClick}
                onConfigButtonClick={onConfigButtonClick}
                rippleActive={ripple}
                onRippleChange={onRippleChange}
                inputStyle={inputStyle}
                onInputStyleChange={onInputStyleChange}
            ></AppConfig>

            <AppSearch searchActive={searchActive} onSearchClick={onSearchClick} onSearchHide={onSearchHide} />
        </div>
    );
};

export default App;
