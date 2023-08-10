import React, {useContext} from 'react';
import AppMenuitem from './AppMenuitem';
import {LayoutContext} from './context/layoutcontext';
import {MenuProvider} from './context/menucontext';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model = [
        {

            icon: 'pi pi-fw pi-home',
            items: [
                { label: 'Pokemons', icon: 'pi pi-fw pi-home', to: '/pokemons' },
                { label: 'Users', icon: 'pi pi-fw pi-user', to: '/users' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog', items: [
                { label: 'Types', icon: 'pi pi-fw pi-times', to: '/types' }
                ,  { label: 'Stats', icon: 'pi pi-fw pi-times', to: '/stats' }
                    ,  { label: 'Abilities', icon: 'pi pi-fw pi-times', to: '/abilities' }
                    ,  { label: 'Roles', icon: 'pi pi-fw pi-times', to: '/roles' }
            ] }],
        }
    ];

    return (
            <MenuProvider>
                <ul className="layout-menu">
                    {model.map((item, i) => {
                        return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={i} /> : <li className="menu-separator"></li>;
                    })}
                </ul>
            </MenuProvider>
    );
};

export default AppMenu;
