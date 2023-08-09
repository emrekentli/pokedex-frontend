import React, {useEffect, useRef, useState} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import UserService from '../../data/service/api-calls/UserService';
import {Paginator} from 'primereact/paginator';
import {TabPanel, TabView} from "primereact/tabview";
import PokemonService from "../../data/service/api-calls/PokemonService";

const Profile = (props) => {
    let emptyPokemon = {
        id: null,
        name: '',
        created: null,
        baseExperience: null,
        height: null,
        weight: null,
        imageUrl: '',
        types: [],
        abilities: [],
        stats: []
    };
    const [catchlist, setCatchlist] = useState(null);
    const [pokemonDialog, setPokemonDialog] = useState(false);
    const [deletePokemonDialog, setDeletePokemonDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const [totalElements, setTotalElements] = useState(0);
    const filter = {
        page: 0,
        size: 20,
        sort: 'created,desc',
        name: null
    };
    const pokemonService = new PokemonService();
    useEffect(() => {
        getCatchlist(filter);
        // eslint-disable-next-line
    }, []);

    const getCatchlist = (filter) => {

        }

    const hideDialog = () => {
        setSubmitted(false);
        setPokemonDialog(false);
    };

    const hideDeletePokemonDialog = () => {
        setDeletePokemonDialog(false);
    };

    const confirmDeletePokemon = (pokemon) => {
        setPokemon(pokemon);
        setDeletePokemonDialog(true);
    };

    const deletePokemon = () => {
        pokemonService.deleteFromCatchlist(user).then(data => {
            let _catchlist = catchlist.filter((val) => val.id !== user.id);
            setCatchlist(_catchlist);
            setDeletePokemonDialog(false);
            setUser(emptyUser);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
        }
        );
    };
    const setNameToFilter = (name) => {
        filter.name = name;
        getCatchlist(filter);
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < catchlist.length; i++) {
            if (catchlist[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

   
    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    };

    const deleteSelectedUsers = async () => {
        try {
          for (const element of selectedUsers) {
              await pokemonService.deleteUser(element);
          }
      
          let _users = catchlist.filter((val) => !selectedUsers.includes(val));
          setCatchlist(_users);
          setDeleteUsersDialog(false);
          setSelectedUsers(null);
      
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
        } catch (error) {
          console.error('Delete error:', error);
          toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Failed to delete catchlist', life: 3000 });
        }
      };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;

        setUser(_user);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedUsers || !selectedUsers.length} />
                </div>
            </React.Fragment>
        );
    };



    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.fullName}
            </>
        );
    };
    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };
    const usernameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Username</span>
                {rowData.userName}
            </>
        );
    };
    const phoneNumberBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Phone Number</span>
                {rowData.phoneNumber}
            </>
        );
    };



    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                { !props.isSelect && <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                         onClick={() => editUser(rowData)}/>}
                { !props.isSelect && <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeletePokemon(rowData)} /> }
                { props.isSelect && <Button label="Select" className="p-button-rounded p-button-success mt-2"
                         onClick={() => props.setUser(rowData)}/>}
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Users</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText user="search" onInput={(e) => setNameToFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const userDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveUser} />
        </>
    );
    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePokemonDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletePokemon} />
        </>
    );
    const deleteUsersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUsersDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedUsers} />
        </>
    );
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        const updatedFilter = {
            ...filter,
            page: event.first / event.rows, // Yeni sayfa numarası
            size: event.rows // Yeni boyut
        };
        getCatchlist(updatedFilter);
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <TabView>
                        <TabPanel header="Catchlist">
                            <Toast ref={toast} />
                            <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>

                            <DataTable
                                ref={dt}
                                value={catchlist}
                                selection={selectedUsers}
                                onSelectionChange={(e) => setSelectedUsers(e.value)}
                                dataKey="id"
                                rows={10}
                                rowsPerPageOptions={[5, 10, 25]}
                                className="datatable-responsive"
                                emptyMessage="No users found."
                                header={header}
                                responsiveLayout="scroll"
                            >
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                                <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                                <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                                <Column field="userName" header="Username" sortable body={usernameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                                <Column field="phoneNumber" header="Phone Number" sortable body={phoneNumberBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                                <Column body={actionBodyTemplate}></Column>
                            </DataTable>
                            <Paginator first={first} rows={rows} totalRecords={totalElements} onPageChange={onPageChange} />
                        </TabPanel>
                        <TabPanel header="Header II">
                            <p className="m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                                ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </TabPanel>

                    </TabView>
                </div>

                    <Dialog visible={pokemonDialog} style={{ width: '450px' }} header="User" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={user.fullName} onChange={(e) => onInputChange(e, 'fullName')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.fullName })} />
                            {submitted && !user.fullName && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Username</label>
                            <InputText id="name" value={user.userName} onChange={(e) => onInputChange(e, 'userName')} required  className={classNames({ 'p-invalid': submitted && !user.userName })} />
                            {submitted && !user.userName && <small className="p-invalid">userName is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Phone Number</label>
                            <InputText id="name" value={user.phoneNumber} onChange={(e) => onInputChange(e, 'phoneNumber')} required  className={classNames({ 'p-invalid': submitted && !user.phoneNumber })} />
                            {submitted && !user.phoneNumber && <small className="p-invalid">phoneNumber is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Email</label>
                            <InputText id="name" value={user.email} onChange={(e) => onInputChange(e, 'email')} required  className={classNames({ 'p-invalid': submitted && !user.email })} />
                            {submitted && !user.email && <small className="p-invalid">Name is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePokemonDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeletePokemonDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && (
                                <span>
                                    Are you sure you want to delete <b>{user.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span>Are you sure you want to delete the selected users?</span>}
                        </div>
                    </Dialog>
            </div>
        </div>
    );
};

export default Profile;
