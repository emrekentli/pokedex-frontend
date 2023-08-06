import React, {useState, useEffect, useRef} from 'react';
import {classNames} from 'primereact/utils';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import PokemonService from '../service/PokemonService';
import {Paginator} from 'primereact/paginator';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';

const Pokemons = () => {
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
    const [layout, setLayout] = useState('grid');
    const [pokemons, setPokemons] = useState(null);
    const [pokemonDialog, setPokemonDialog] = useState(false);
    const [deletePokemonDialog, setDeletePokemonDialog] = useState(false);
    const [deletePokemonsDialog, setDeletePokemonsDialog] = useState(false);
    const [pokemon, setPokemon] = useState(emptyPokemon);
    const [selectedPokemons, setSelectedPokemons] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const [totalElements, setTotalElements] = useState(0);
    const filter = {
        page: 0,
        size: 12,
        sort: 'imageUrl,asc',
        name: null
    };
    const pokemonService = new PokemonService();
    useEffect(() => {
        getPokemons(filter);
        // eslint-disable-next-line
    }, []);

    const getPokemons = (filter) => {
        pokemonService.getPokemons(filter).then((data) => {
            setTotalElements(data.items.totalElements);
            setPokemons(data.items.content);
        });
    }
    const openNew = () => {
        setPokemon(emptyPokemon);
        setSubmitted(false);
        setPokemonDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPokemonDialog(false);
    };

    const hideDeletePokemonDialog = () => {
        setDeletePokemonDialog(false);
    };

    const hideDeletePokemonsDialog = () => {
        setDeletePokemonsDialog(false);
    };

    const savePokemon = () => {
        setSubmitted(true);

        if (pokemon.name.trim()) {
            let _pokemons = [...pokemons];
            let _pokemon = {...pokemon};
            if (pokemon.id) {
                pokemonService.updatePokemon(_pokemon).then(data => {
                    const index = findIndexById(pokemon.id);
                    _pokemons[index] = data;
                    setPokemons(_pokemons);
                    setPokemonDialog(false);
                    setPokemon(emptyPokemon);
                    toast.current.show({severity: 'success', summary: 'Successful', detail: 'Pokemon Updated', life: 3000});
                }).catch(error => {
                    toast.current.show({severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000});
                });
            } else {
                pokemonService.createPokemon(_pokemon).then(data => {
                    _pokemons.push(data);
                    setPokemons(_pokemons);
                    setPokemonDialog(false);
                    setPokemon(emptyPokemon);
                    toast.current.show({severity: 'success', summary: 'Successful', detail: 'Pokemon Created', life: 3000});
                }).catch(error => {
                    toast.current.show({severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000});
                });
            }
        }
    };


    const editPokemon = (pokemon) => {
        pokemon.name = capitalizeFirstLetter(pokemon.name);
        setPokemon({...pokemon});
        setPokemonDialog(true);
    };

    const confirmDeletePokemon = (pokemon) => {
        setPokemon(pokemon);
        setDeletePokemonDialog(true);
    };

    const deletePokemon = () => {
        pokemonService.deletePokemon(pokemon).then(data => {

            let _pokemons = pokemons.filter((val) => val.id !== pokemon.id);
            setPokemons(_pokemons);
            setDeletePokemonDialog(false);
            setPokemon(emptyPokemon);
            toast.current.show({severity: 'success', summary: 'Successful', detail: 'Pokemon Deleted', life: 3000});
        }).catch(error => {
                toast.current.show({severity: 'danger', summary: 'Warn Message', detail: 'Message Detail', life: 3000});
            }
        );
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < pokemons.length; i++) {
            if (pokemons[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };


    const confirmDeleteSelected = () => {
        setDeletePokemonsDialog(true);
    };

    const deleteSelectedPokemons = async () => {
        try {
            for (const element of selectedPokemons) {
                await pokemonService.deletePokemon(element);
            }

            let _pokemons = pokemons.filter((val) => !selectedPokemons.includes(val));
            setPokemons(_pokemons);
            setDeletePokemonsDialog(false);
            setSelectedPokemons(null);

            toast.current.show({severity: 'success', summary: 'Successful', detail: 'Pokemons Deleted', life: 3000});
        } catch (error) {
            console.error('Delete error:', error);
            toast.current.show({severity: 'danger', summary: 'Error', detail: 'Failed to delete pokemons', life: 3000});
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _pokemon = {...pokemon};
        _pokemon[`${name}`] = val;

        setPokemon(_pokemon);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew}/>
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedPokemons || !selectedPokemons.length}/>
                </div>
            </React.Fragment>
        );
    };
    const pokemonDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={savePokemon}/>
        </>
    );
    const deletePokemonDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePokemonDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletePokemon}/>
        </>
    );
    const deletePokemonsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePokemonsDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedPokemons}/>
        </>
    );
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(12);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        const updatedFilter = {
            ...filter,
            page: event.first / event.rows,
            size: event.rows
        };
        getPokemons(updatedFilter);
    };
    const listItem = (pokemon) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${pokemon.imageUrl}`} alt={pokemon.name}/>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{pokemon.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{pokemon.category}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${pokemon.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={pokemon.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    const getTypeIcon = (typeName) => {
        try {
            console.log(typeName)
            return `assets/icons/${typeName.toLowerCase()}.png`;
        } catch (error) {
            return null;
        }
    }
    const gridItem = (pokemon) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">

                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9  h-10rem" src={`${pokemon.imageUrl}`} alt={pokemon.name}/>
                        <div className="text-2xl font-bold">{capitalizeFirstLetter(pokemon.name)}</div>

                            <div className="flex justify-content-evenly w-full">
                                {pokemon.types.map((type) => (
                                    <div className="flex align-items-center gap-2  flex-column">
                                        <img className="w-12  h-4rem mb-2 mt-2" src={getTypeIcon(type.name)} alt={type.name}/>
                                        {capitalizeFirstLetter(type.name)}
                                    </div>
                                ))}
                            </div>
                        <div className="text-xl">Abilities : {pokemon.abilities.map((ability) => capitalizeFirstLetter(ability.name)).join(" - ")}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editPokemon(pokemon)}/>
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeletePokemon(pokemon)}/>
                    </div>

                </div>
            </div>
        );
    };
    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product);
        else if (layout === 'grid') return gridItem(product);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)}/>
            </div>
        );
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast}/>
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataView value={pokemons} itemTemplate={itemTemplate} layout={layout} header={header()}/>
                    <div className="card">
                        <Paginator first={first} rows={rows} totalRecords={totalElements} onPageChange={onPageChange}/>
                    </div>
                    <Dialog visible={pokemonDialog} style={{width: '450px'}} header="Pokemon" modal className="p-fluid" footer={pokemonDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={pokemon.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({'p-invalid': submitted && !pokemon.name})}/>
                            {submitted && !pokemon.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePokemonDialog} style={{width: '450px'}} header="Confirm" modal footer={deletePokemonDialogFooter} onHide={hideDeletePokemonDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                            {pokemon && (
                                <span>
                                    Are you sure you want to delete <b>{pokemon.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePokemonsDialog} style={{width: '450px'}} header="Confirm" modal footer={deletePokemonsDialogFooter} onHide={hideDeletePokemonsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                            {pokemon && <span>Are you sure you want to delete the selected pokemons?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};
export default Pokemons;
