import React, {useEffect, useRef, useState} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import TypeService from '../../data/service/api-calls/TypeService';
import {Paginator} from 'primereact/paginator';

const Types = () => {
    let emptyType = {
        id: null,
        name: '',
        created:null
    };

    const [types, setTypes] = useState(null);
    const [typeDialog, setTypeDialog] = useState(false);
    const [deleteTypeDialog, setDeleteTypeDialog] = useState(false);
    const [deleteTypesDialog, setDeleteTypesDialog] = useState(false);
    const [type, setType] = useState(emptyType);
    const [selectedTypes, setSelectedTypes] = useState(null);
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
    const typeService = new TypeService();
    useEffect(() => {
        getTypes(filter);
        // eslint-disable-next-line
    }, []);

    const getTypes = (filter) => {
        typeService.getTypes(filter).then((data) => {
            setTotalElements(data.data.data.items.totalElements);
            setTypes(data.data.data.items.content);
            });
        }
    const openNew = () => {
        setType(emptyType);
        setSubmitted(false);
        setTypeDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setTypeDialog(false);
    };

    const hideDeleteTypeDialog = () => {
        setDeleteTypeDialog(false);
    };

    const hideDeleteTypesDialog = () => {
        setDeleteTypesDialog(false);
    };

    const saveType = () => {
        setSubmitted(true);

        if (type.name.trim()) {
          let _types = [...types];
          let _type = { ...type };
          if (type.id) {
            typeService.updateType(_type).then(data => {
              const index = findIndexById(type.id);
              _types[index] = data;
              setTypes(_types);
              setTypeDialog(false);
              setType(emptyType);
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Type Updated', life: 3000 });
            }).catch(error => {
                toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
                        });
          } else {
            typeService.createType(_type).then(data => {
              _types.push(data);
              setTypes(_types);
              setTypeDialog(false);
              setType(emptyType);
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Type Created', life: 3000 });
            }).catch(error => {
                toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
            });
          }
        }
      };


    const editType = (type) => {
        setType({ ...type });
        setTypeDialog(true);
    };

    const confirmDeleteType = (type) => {
        setType(type);
        setDeleteTypeDialog(true);
    };

    const deleteType = () => {
        typeService.deleteType(type).then(data => {

            let _types = types.filter((val) => val.id !== type.id);
            setTypes(_types);
            setDeleteTypeDialog(false);
            setType(emptyType);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Type Deleted', life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
        }
        );
    };
    const setNameToFilter = (name) => {
        filter.name = name;
        getTypes(filter);
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < types.length; i++) {
            if (types[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };


    const confirmDeleteSelected = () => {
        setDeleteTypesDialog(true);
    };

    const deleteSelectedTypes = async () => {
        try {
          for (let i = 0; i < selectedTypes.length; i++) {
            await typeService.deleteType(selectedTypes[i]);
          }

          let _types = types.filter((val) => !selectedTypes.includes(val));
          setTypes(_types);
          setDeleteTypesDialog(false);
          setSelectedTypes(null);

          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Types Deleted', life: 3000 });
        } catch (error) {
          console.error('Delete error:', error);
          toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Failed to delete types', life: 3000 });
        }
      };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _type = { ...type };
        _type[`${name}`] = val;

        setType(_type);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedTypes || !selectedTypes.length} />
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



    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editType(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteType(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Types</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setNameToFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const typeDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveType} />
        </>
    );
    const deleteTypeDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteTypeDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteType} />
        </>
    );
    const deleteTypesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteTypesDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedTypes} />
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
        getTypes(updatedFilter);
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>

                    <DataTable
                        ref={dt}
                        value={types}
                        selection={selectedTypes}
                        onSelectionChange={(e) => setSelectedTypes(e.value)}
                        dataKey="id"
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        emptyMessage="No types found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>

                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    <div className="card">
            <Paginator first={first} rows={rows} totalRecords={totalElements} onPageChange={onPageChange} />
        </div>
                    <Dialog visible={typeDialog} style={{ width: '450px' }} header="Type" modal className="p-fluid" footer={typeDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={type.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !type.name })} />
                            {submitted && !type.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteTypeDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteTypeDialogFooter} onHide={hideDeleteTypeDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {type && (
                                <span>
                                    Are you sure you want to delete <b>{type.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteTypesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteTypesDialogFooter} onHide={hideDeleteTypesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {type && <span>Are you sure you want to delete the selected types?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Types;
