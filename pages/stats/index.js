import React, {useEffect, useRef, useState} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import StatService from '../../data/service/api-calls/StatService';
import {Paginator} from 'primereact/paginator';

const Stats = () => {
    let emptyStat = {
        id: null,
        name: '',
        created:null
    };

    const [stats, setStats] = useState(null);
    const [statDialog, setStatDialog] = useState(false);
    const [deleteStatDialog, setDeleteStatDialog] = useState(false);
    const [deleteStatsDialog, setDeleteStatsDialog] = useState(false);
    const [stat, setStat] = useState(emptyStat);
    const [selectedStats, setSelectedStats] = useState(null);
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
    const statService = new StatService();
    useEffect(() => {
        getStats(filter);
        // eslint-disable-next-line
    }, []);

    const getStats = (filter) => {
        statService.getStats(filter).then((data) => {
            setTotalElements(data.items.totalElements);
            setStats(data.items.content);
            });
        }
    const openNew = () => {
        setStat(emptyStat);
        setSubmitted(false);
        setStatDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setStatDialog(false);
    };

    const hideDeleteStatDialog = () => {
        setDeleteStatDialog(false);
    };

    const hideDeleteStatsDialog = () => {
        setDeleteStatsDialog(false);
    };

    const saveStat = () => {
        setSubmitted(true);
      
        if (stat.name.trim()) {
          let _stats = [...stats];
          let _stat = { ...stat };
          if (stat.id) {
            statService.updateStat(_stat).then(data => {
              const index = findIndexById(stat.id);
              _stats[index] = data;
              setStats(_stats);
              setStatDialog(false);
              setStat(emptyStat);
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Stat Updated', life: 3000 });
            }).catch(error => {
                toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
                        });
          } else {
            statService.createStat(_stat).then(data => {
              _stats.push(data);
              setStats(_stats);
              setStatDialog(false);
              setStat(emptyStat);
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Stat Created', life: 3000 });
            }).catch(error => {
                toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
            });
          }
        }
      };
      

    const editStat = (stat) => {
        setStat({ ...stat });
        setStatDialog(true);
    };

    const confirmDeleteStat = (stat) => {
        setStat(stat);
        setDeleteStatDialog(true);
    };

    const deleteStat = () => {
        statService.deleteStat(stat).then(data => {
        
            let _stats = stats.filter((val) => val.id !== stat.id);
            setStats(_stats);
            setDeleteStatDialog(false);
            setStat(emptyStat);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Stat Deleted', life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Warn Message', detail: 'Message Detail', life: 3000 });
        }
        );
    };
    const setNameToFilter = (name) => {
        filter.name = name;
        getStats(filter);
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < stats.length; i++) {
            if (stats[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

   
    const confirmDeleteSelected = () => {
        setDeleteStatsDialog(true);
    };

    const deleteSelectedStats = async () => {
        try {
          for (let i = 0; i < selectedStats.length; i++) {
            await statService.deleteStat(selectedStats[i]);
          }
      
          let _stats = stats.filter((val) => !selectedStats.includes(val));
          setStats(_stats);
          setDeleteStatsDialog(false);
          setSelectedStats(null);
      
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Stats Deleted', life: 3000 });
        } catch (error) {
          console.error('Delete error:', error);
          toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Failed to delete stats', life: 3000 });
        }
      };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _stat = { ...stat };
        _stat[`${name}`] = val;

        setStat(_stat);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedStats || !selectedStats.length} />
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editStat(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteStat(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Stats</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText stat="search" onInput={(e) => setNameToFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const statDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveStat} />
        </>
    );
    const deleteStatDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteStatDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteStat} />
        </>
    );
    const deleteStatsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteStatsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedStats} />
        </>
    );
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        const updatedFilter = {
            ...filter,
            page: event.first / event.rows,
            size: event.rows 
        };
        getStats(updatedFilter);
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>

                    <DataTable
                        ref={dt}
                        value={stats}
                        selection={selectedStats}
                        onSelectionChange={(e) => setSelectedStats(e.value)}
                        dataKey="id"
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        emptyMessage="No stats found."
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
                    <Dialog visible={statDialog} style={{ width: '450px' }} header="Stat" modal className="p-fluid" footer={statDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={stat.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !stat.name })} />
                            {submitted && !stat.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteStatDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteStatDialogFooter} onHide={hideDeleteStatDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {stat && (
                                <span>
                                    Are you sure you want to delete <b>{stat.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteStatsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteStatsDialogFooter} onHide={hideDeleteStatsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {stat && <span>Are you sure you want to delete the selected stats?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Stats;
