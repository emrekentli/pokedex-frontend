import React, {useEffect, useRef, useState} from 'react';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import PokemonService from '../../data/service/api-calls/PokemonService';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Accordion, AccordionTab} from 'primereact/accordion';
import {Dropdown} from 'primereact/dropdown';
import TypeService from '../../data/service/api-calls/TypeService';
import {InputNumber} from "primereact/inputnumber";
import {useRouter} from "next/router";
import UserService from "../../data/service/api-calls/UserService";
import {isHaveAdminRole} from "../../data/utills/role-validation/role-validations/AdminRoleValidation";
import * as PropTypes from "prop-types";
import {TabPanel, TabView} from "primereact/tabview";
import Catchlist from "../../demo/components/Catchlist";
import Wishlist from "../../demo/components/Wishlist";

const Profile = () => {


    useEffect(() => {

    }, [])

    return (


        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <TabView>
                        <TabPanel header="Catchlist">
                        <Catchlist></Catchlist>
                        </TabPanel>
                        <TabPanel header="Wishlist">
                            <Wishlist></Wishlist>
                        </TabPanel>

                    </TabView>



                </div>
            </div>
        </div>
    );
};
export default Profile;
