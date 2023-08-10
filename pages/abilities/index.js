import React, {useEffect, useRef, useState} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import AbilityService from '../../data/service/api-calls/AbilityService';
import {Paginator} from 'primereact/paginator';

const Abilities = (props) => {
    let emptyAbility = {
        id: null,
        name: '',
        created:null
    };

    const [abilities, setAbilities] = useState(null);
    const [abilityDialog, setAbilityDialog] = useState(false);
    const [deleteAbilityDialog, setDeleteAbilityDialog] = useState(false);
    const [deleteAbilitiesDialog, setDeleteAbilitiesDialog] = useState(false);
    const [ability, setAbility] = useState(emptyAbility);
    const [selectedAbilities, setSelectedAbilities] = useState(null);
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
    const abilityService = new AbilityService();
    useEffect(() => {
        getAbilities(filter);
        // eslint-disable-next-line
    }, []);

    const getAbilities = (filter) => {
        abilityService.get(filter).then((data) => {
            setTotalElements(data.data?.data.items.totalElements);
            setAbilities(data.data?.data.items.content);
            });
        }
    const openNew = () => {
        setAbility(emptyAbility);
        setSubmitted(false);
        setAbilityDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setAbilityDialog(false);
    };

    const hideDeleteAbilityDialog = () => {
        setDeleteAbilityDialog(false);
    };

    const hideDeleteAbilitiesDialog = () => {
        setDeleteAbilitiesDialog(false);
    };

    const saveAbility = () => {
        setSubmitted(true);
        if (ability.name.trim()) {
          let _abilities = [...abilities];
          let _ability = { ...ability };
          if (ability.id) {
            abilityService.update(_ability).then(data => {
              const index = findIndexById(ability.id);
              _abilities[index] = data.data.data;
              setAbilities(_abilities);
              setAbilityDialog(false);
              setAbility(emptyAbility);
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Ability Updated', life: 3000 });
            }).catch(error => {
                toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
                        });
          } else {
            abilityService.create(_ability).then(data => {
              _abilities.push(data.data.data);
              setAbilities(_abilities);
              setAbilityDialog(false);
              setAbility(emptyAbility);
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Ability Created', life: 3000 });
            }).catch(error => {
                toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Error!', life: 3000 });
            });
          }
        }
      };
      

    const editAbility = (ability) => {
        setAbility({ ...ability });
        setAbilityDialog(true);
    };

    const confirmDeleteAbility = (ability) => {
        setAbility(ability);
        setDeleteAbilityDialog(true);
    };

    const deleteAbility = () => {
        abilityService.delete(ability).then(data => {
        
            let _abilities = abilities.filter((val) => val.id !== ability.id);
            setAbilities(_abilities);
            setDeleteAbilityDialog(false);
            setAbility(emptyAbility);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Ability Deleted', life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
        }
        );
    };
    const setNameToFilter = (name) => {
        filter.name = name;
        getAbilities(filter);
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < abilities.length; i++) {
            if (abilities[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

   
    const confirmDeleteSelected = () => {
        setDeleteAbilitiesDialog(true);
    };

    const deleteSelectedAbilities = async () => {
        try {
          for (const element of selectedAbilities) {
              await abilityService.delete(element);
          }
      
          let _abilities = abilities.filter((val) => !selectedAbilities.includes(val));
          setAbilities(_abilities);
          setDeleteAbilitiesDialog(false);
          setSelectedAbilities(null);
      
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Abilities Deleted', life: 3000 });
        } catch (error) {
          console.error('Delete error:', error);
          toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Failed to delete abilities', life: 3000 });
        }
      };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _ability = { ...ability };
        _ability[`${name}`] = val;

        setAbility(_ability);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedAbilities || !selectedAbilities.length} />
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
                { !props.isSelect && <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                         onClick={() => editAbility(rowData)}/>}
                { !props.isSelect && <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteAbility(rowData)} /> }
                { props.isSelect && <Button label="Select" className="p-button-rounded p-button-success mt-2"
                         onClick={() => props.setAbility(rowData)}/>}
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Abilities</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText ability="search" onInput={(e) => setNameToFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const abilityDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveAbility} />
        </>
    );
    const deleteAbilityDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAbilityDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteAbility} />
        </>
    );
    const deleteAbilitiesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAbilitiesDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedAbilities} />
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
        getAbilities(updatedFilter);
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>

                    <DataTable
                        ref={dt}
                        value={abilities}
                        selection={selectedAbilities}
                        onSelectionChange={(e) => setSelectedAbilities(e.value)}
                        dataKey="id"
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        emptyMessage="No abilities found."
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
                    <Dialog visible={abilityDialog} style={{ width: '450px' }} header="Ability" modal className="p-fluid" footer={abilityDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={ability.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !ability.name })} />
                            {submitted && !ability.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteAbilityDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAbilityDialogFooter} onHide={hideDeleteAbilityDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {ability && (
                                <span>
                                    Are you sure you want to delete <b>{ability.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteAbilitiesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAbilitiesDialogFooter} onHide={hideDeleteAbilitiesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {ability && <span>Are you sure you want to delete the selected abilities?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Abilities;
