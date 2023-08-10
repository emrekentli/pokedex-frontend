import React, {useEffect, useRef, useState} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import RoleService from '../../data/service/api-calls/RoleService';
import {Paginator} from 'primereact/paginator';

const Roles = (props) => {
    let emptyRole = {
        id: null,
        name: '',
        displayName: '',
    };

    const [roles, setRoles] = useState(null);
    const [roleDialog, setRoleDialog] = useState(false);
    const [deleteRoleDialog, setDeleteRoleDialog] = useState(false);
    const [deleteRolesDialog, setDeleteRolesDialog] = useState(false);
    const [role, setRole] = useState(emptyRole);
    const [selectedRoles, setSelectedRoles] = useState(null);
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
    const roleService = new RoleService();
    useEffect(() => {
        getRoles(filter);
        // eslint-disable-next-line
    }, []);

    const getRoles = (filter) => {
        roleService.getRoles(filter).then((data) => {
            setTotalElements(data.data?.data.items.totalElements);
            setRoles(data.data?.data.items.content);
            });
        }
    const openNew = () => {
        setRole(emptyRole);
        setSubmitted(false);
        setRoleDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setRoleDialog(false);
    };

    const hideDeleteRoleDialog = () => {
        setDeleteRoleDialog(false);
    };

    const hideDeleteRolesDialog = () => {
        setDeleteRolesDialog(false);
    };

    const saveRole = () => {
        setSubmitted(true);
      
        if (role.name.trim() && role.displayName.trim()) {
          let _roles = [...roles];
          let _role = { ...role };
          if (role.id) {
            roleService.updateRole(_role).then(data => {
              const index = findIndexById(role.id);
              _roles[index] = data.data.data;
              setRoles(_roles);
              setRoleDialog(false);
              setRole(emptyRole);
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 3000 });
            }).catch(error => {
                toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'An error occured!', life: 3000 });
                        });
          } else {
            roleService.createRole(_role).then(data => {
              _roles.push(data.data.data);
              setRoles(_roles);
              setRoleDialog(false);
              setRole(emptyRole);
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Role Created', life: 3000 });
            }).catch(error => {
                toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Error!', life: 3000 });
            });
          }
        }
      };
      

    const editRole = (role) => {
        setRole({ ...role });
        setRoleDialog(true);
    };

    const confirmDeleteRole = (role) => {
        setRole(role);
        setDeleteRoleDialog(true);
    };

    const deleteRole = () => {
        roleService.deleteRole(role).then(data => {
        
            let _roles = roles.filter((val) => val.id !== role.id);
            setRoles(_roles);
            setDeleteRoleDialog(false);
            setRole(emptyRole);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Role Deleted', life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Warn Message', detail: 'An error occured!', life: 3000 });
        }
        );
    };
    const setNameToFilter = (name) => {
        filter.name = name;
        getRoles(filter);
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

   
    const confirmDeleteSelected = () => {
        setDeleteRolesDialog(true);
    };

    const deleteSelectedRoles = async () => {
        try {
          for (const element of selectedRoles) {
              await roleService.deleteRole(element);
          }
      
          let _roles = roles.filter((val) => !selectedRoles.includes(val));
          setRoles(_roles);
          setDeleteRolesDialog(false);
          setSelectedRoles(null);
      
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Roles Deleted', life: 3000 });
        } catch (error) {
          console.error('Delete error:', error);
          toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Failed to delete roles', life: 3000 });
        }
      };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _role = { ...role };
        _role[`${name}`] = val;

        setRole(_role);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedRoles || !selectedRoles.length} />
                </div>
            </React.Fragment>
        );
    };



    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };
    const displayNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Display Name</span>
                {rowData.displayName}
            </>
        );
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                { !props.isSelect && <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                         onClick={() => editRole(rowData)}/>}
                { !props.isSelect && <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteRole(rowData)} /> }
                { props.isSelect && <Button label="Select" className="p-button-rounded p-button-success mt-2"
                         onClick={() => props.setRole(rowData)}/>}
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Roles</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText role="search" onInput={(e) => setNameToFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const roleDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveRole} />
        </>
    );
    const deleteRoleDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRoleDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteRole} />
        </>
    );
    const deleteRolesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRolesDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedRoles} />
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
        getRoles(updatedFilter);
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>

                    <DataTable
                        ref={dt}
                        value={roles}
                        selection={selectedRoles}
                        onSelectionChange={(e) => setSelectedRoles(e.value)}
                        dataKey="id"
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        emptyMessage="No roles found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="email" header="Email" sortable body={displayNameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    <div className="card">
            <Paginator first={first} rows={rows} totalRecords={totalElements} onPageChange={onPageChange} />
        </div>
                    <Dialog visible={roleDialog} style={{ width: '450px' }} header="Role" modal className="p-fluid" footer={roleDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={role.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !role.name })} />
                            {submitted && !role.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Display Name</label>
                            <InputText id="name" value={role.displayName} onChange={(e) => onInputChange(e, 'displayName')} required autoFocus className={classNames({ 'p-invalid': submitted && !role.displayName })} />
                            {submitted && !role.displayName && <small className="p-invalid">displayName is required.</small>}
                        </div>

                    </Dialog>

                    <Dialog visible={deleteRoleDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRoleDialogFooter} onHide={hideDeleteRoleDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {role && (
                                <span>
                                    Are you sure you want to delete <b>{role.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteRolesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRolesDialogFooter} onHide={hideDeleteRolesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {role && <span>Are you sure you want to delete the selected roles?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Roles;
