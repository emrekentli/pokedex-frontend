import {useRouter} from 'next/router';
import React, {useContext, useEffect, useState} from 'react';
import AppConfig from '../../../layout/AppConfig';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import {LayoutContext} from '../../../layout/context/layoutcontext';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import LoginService from "../../../data/service/api-calls/LoginService";
import {AuthenticationStore} from "../../../data/service/store/AuthenticationStore";

const LoginPage = () => {
    const authenticationStore = new AuthenticationStore();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const loginService = new LoginService();

    useEffect(() => {
            if (authenticationStore.getToken()) {
                console.log("token: " + authenticationStore.getToken());
                router.push("/");
            }
    }, []);



    const login = () => {
        loginService.login({userName:  username, password: password}).then((res) => {
            if (res.status !== 200) {
                console.log("error");
                return;
            }
            authenticationStore.setToken(res.data.data.token);
            authenticationStore.setRoles(res.data.data.roles);
            router.push("/");
        })
    }

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo.png`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Login</div>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText inputid="email1" type="text" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} onChange={(e) => setUsername(e.target.value)} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between gap-5">
                                <div className="flex align-items-center">
                                </div>
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={() => (
                                login()
                            )}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;
