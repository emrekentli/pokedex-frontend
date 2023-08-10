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
import RoleService from '../../data/service/api-calls/RoleService';
import {Dropdown} from "primereact/dropdown";
import {Accordion, AccordionTab} from "primereact/accordion";

const Users = (props) => {

    let emptyUser = {
        id: null,
        fullName: '',
        email: '',
        phoneNumber: '',
        userName: '',
        created:null
    };
    const [isDelete, setIsDelete] = useState(false);
    const [users, setUsers] = useState(null);
    const [roles, setRoles] = useState(null);
    const [userDialog, setUserDialog] = useState(false);
    const [roleDialog, setRoleDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const [totalElements, setTotalElements] = useState(0);
    const [role, setRole] = useState(null);
    const roleService = new RoleService();
    const [filter, setFilter] = useState({
        page: 0,
        size: 20,
        sort: 'created,asc',
        userName: null,
        fullName: null,
        email: null,
        phoneNumber: null
    });
    const clearFilters = () => {
        setFilter({
            page: 0,
            size: 20,
            sort: 'created,asc',
            userName: null,
            fullName: null,
            email: null,
            phoneNumber: null
        });
    };
    const userService = new UserService();
    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, [filter]);
    useEffect(() => {
        const getRoles = () => {
            roleService.getRoles({
                page: 0,
                size: 100
            }).then((data) => {
                console.log(data.data?.data.items.content)
                setRoles(data.data?.data.items.content);
            });
        };
        getRoles();
        // eslint-disable-next-line
    }, []);
    const getUsers = () => {
        userService.getUsers(filter).then((data) => {
            setTotalElements(data.data?.data.items.totalElements);
            setUsers(data.data?.data.items.content);
            });
        }
    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const openRoleDialog = (user) => {
        setUser(user);
        setIsDelete(false);
        setRoleDialog(true);
    };

    const openDeleteRoleDialog = (user) => {
        setUser(user);
        setIsDelete(true);
        setRoleDialog(true);
    };
    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };
    const hideRoleDialog = () => {
        setRoleDialog(false);
    };
    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    };

    const saveUser = () => {
        setSubmitted(true);

        if (user.fullName.trim() && user.email.trim() && user.phoneNumber.trim() && user.userName.trim()) {
          let _users = [...users];
          let _user = { ...user };
          if (user.id) {
            userService.updateUser(_user).then(data => {
              const index = findIndexById(user.id);
              _users[index] = data.data.data;
              setUsers(_users);
              setUserDialog(false);
              setUser(emptyUser);
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
            }).catch(error => {
                toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
                        });
          } else {
            userService.createUser(_user).then(data => {
              _users.push(data.data.data);
              setUsers(_users);
              setUserDialog(false);
              setUser(emptyUser);
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            }).catch(error => {
                toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Error!', life: 3000 });
            });
          }
        }
      };

    const saveUserRole  = () => {
        setSubmitted(true);
        console.log(role);
        console.log(user);
        if (role) {
            let _users = [...users];
            let _user = { ...user };
            if (user.id) {
                userService.addRoleToUser(_user,role).then(data => {
                    const index = findIndexById(user.id);
                    _users[index] = data.data.data;
                    setUsers(_users);
                    setRoleDialog(false);
                    setUser(emptyUser);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                }).catch(error => {
                    toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
                });
            }
        }
    };

    const deleteUserRole  = () => {
        setSubmitted(true);
        console.log(role);
        console.log(user);
        if (role) {
            let _users = [...users];
            let _user = { ...user };
            if (user.id) {
                userService.deleteRoleToUser(_user,role).then(data => {
                    const index = findIndexById(user.id);
                    _users[index] = data.data.data;
                    setUsers(_users);
                    setRoleDialog(false);
                    setUser(emptyUser);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                }).catch(error => {
                    toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
                });
            }
        }
    };
    const editUser = (user) => {
        setUser({ ...user });
        setUserDialog(true);
    };

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const deleteUser = () => {
        userService.deleteUser(user).then(data => {

            let _users = users.filter((val) => val.id !== user.id);
            setUsers(_users);
            setDeleteUserDialog(false);
            setUser(emptyUser);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
        }
        );
    };
    const setNameToFilter = (name) => {
        filter.name = name;
        getUsers(filter);
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
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
              await userService.deleteUser(element);
          }

          let _users = users.filter((val) => !selectedUsers.includes(val));
          setUsers(_users);
          setDeleteUsersDialog(false);
          setSelectedUsers(null);

          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
        } catch (error) {
          console.error('Delete error:', error);
          toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Failed to delete users', life: 3000 });
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
    const rolesBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Roles</span>
                {rowData.roles?.map((role) => role.name).join(', ')}
            </>
        );
    };



    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                { !props.isSelect && <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                                             onClick={() => editUser(rowData)}/>}
                { !props.isSelect && <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mr-2" onClick={() => confirmDeleteUser(rowData)} /> }
                { !props.isSelect && <Button icon="pi pi-plus" className="p-button-rounded p-button-warning mr-2" onClick={() => openRoleDialog(rowData)} /> }
                { !props.isSelect && <Button icon="pi pi-times" className="p-button-rounded p-button-dagner mr-2" onClick={() => openDeleteRoleDialog(rowData)} /> }

                { props.isSelect && <Button label="Select" className="p-button-rounded p-button-success mr-2"
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
    const roleDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideRoleDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveUserRole} />
        </>
    );
    const deleteRoleDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideRoleDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={deleteUserRole} />
        </>
    );
    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
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
        getUsers(updatedFilter);
    };
    const handleUsernameChange = (e) => {
        const { value } = e.target;
        setFilter({ ...filter, userName: value });
    };
    const handleEmailChange = (e) => {
        const { value } = e.target;
        setFilter({ ...filter, email: value });
    };
    const handlePhoneNumberChange = (e) => {
        const { value } = e.target;
        setFilter({ ...filter, phoneNumber: value });
    };
    const handleFullNameChange = (e) => {
        const { value } = e.target;
        setFilter({ ...filter, fullName: value });
    };
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Accordion activeIndex={0} className="mb-4">
                        <AccordionTab header="Filter">
                            <form >
                                <div style={{ minHeight: '40px', gap: '20px' }} className="flex mb-3 ">
                                    <InputText
                                        value={filter.userName}
                                        placeholder="userName"
                                        onChange={handleUsernameChange}
                                        style={{width:'100%'}}
                                    />
                                    <InputText
                                        value={filter.email}
                                        placeholder="Email"
                                        onChange={handleEmailChange}
                                        style={{width:'100%'}}
                                    />
                                    <InputText
                                        value={filter.height}
                                        placeholder="phoneNumber"
                                        onChange={handlePhoneNumberChange}
                                        style={{width:'100%'}}
                                    />
                                    <InputText
                                        value={filter.fullName}
                                        placeholder="fullName"
                                        onChange={handleFullNameChange}
                                        style={{width:'100%'}}
                                    />
                                </div>
                                <div style={{ minHeight: '40px', gap: '20px' }} className="input-group-filter mb-3">
                                    <div className='flex mb-2'>
                                        <Button
                                            label="Clear"
                                            icon="pi pi-times"
                                            className="p-button-danger w-full mr-2"
                                            onClick={clearFilters}
                                        />
                                        <Button
                                            label="Filter"
                                            icon="pi pi-times"
                                            onClick={getUsers}
                                            className="p-button-secondary w-full mr-2"
                                        />
                                    </div>
                                </div>
                            </form>
                        </AccordionTab>
                    </Accordion>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>

                    <DataTable
                        ref={dt}
                        value={users}
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
                        <Column field="role" header="Roles" sortable body={rolesBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    <div className="card">
            <Paginator first={first} rows={rows} totalRecords={totalElements} onPageChange={onPageChange} />
        </div>
                    <Dialog visible={userDialog} style={{ width: '450px' }} header="User" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
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

                    <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
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

                    <Dialog visible={roleDialog} style={{ width: '450px' }} header="User" modal className="p-fluid" footer={!isDelete ? roleDialogFooter : deleteRoleDialogFooter} onHide={hideRoleDialog}>
                        <div className="field">
                        <Dropdown value={role} onChange={(e) => {
                            setRole(e.value);
                        }} options={roles} optionLabel="name"
                                  placeholder="Select a Role" className="w-full" />
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Users;
