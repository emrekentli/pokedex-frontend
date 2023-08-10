import React, {useEffect} from 'react';
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
