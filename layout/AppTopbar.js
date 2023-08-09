import Link from 'next/link';
import {classNames} from 'primereact/utils';
import React, {forwardRef, useContext, useImperativeHandle, useRef} from 'react';
import {LayoutContext} from './context/layoutcontext';
import {TieredMenu} from "primereact/tieredmenu";
import {AuthenticationStore} from "../data/service/store/AuthenticationStore";
import {useRouter} from "next/router";

const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const menu = useRef(null);
    const authenticationStore = new AuthenticationStore();
    const router = useRouter();

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));
    const items = [
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
                authenticationStore.setToken(null);
                authenticationStore.setRoles(null);
                router.push("/auth/login");
            }
        }
    ];

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo.png`}  height={'35px'} width={'true'} alt="logo" />
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button" onClick={(e) => menu.current.toggle(e)} >
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
            </div>
        </div>
    );
});

export default AppTopbar;
