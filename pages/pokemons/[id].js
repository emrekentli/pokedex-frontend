import React, {useEffect, useRef, useState} from 'react';
import {Toast} from 'primereact/toast';
import PokemonService from '../../data/service/api-calls/PokemonService';
import {useRouter} from "next/router";
import {ProgressBar} from "primereact/progressbar";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import TypeService from "../../data/service/api-calls/TypeService";
import StatService from "../../data/service/api-calls/StatService";
import Abilities from "../abilities";
import {InputNumber} from "primereact/inputnumber";

const Pokemons = () => {

    const [typeDialog, setTypeDialog] = useState(false);
    const [statDialog, setStatDialog] = useState(false);

    const [abilityDialog, setAbilityDialog] = useState(false);
    const [abilityComponentDialog, setAbilityComponentDialog] = useState(false);
    const [stats, setStats] = useState([]);
    const [pokemon, setPokemon] = useState({
        type: null,
        types: [],
        stats: [],
        abilities: [],
        name: null
    });
    const [deleteTypeDialog, setDeleteTypeDialog] = useState(false);
    const [deleteAbilityDialog, setDeleteAbilityDialog] = useState(false);
    const [deleteStatDialog, setDeleteStatDialog] = useState(false);
    const [type, setType] = useState(null);
    const [ability, setAbility] = useState({
        name: ""
    });
    const [stat, setStat] = useState({
       statId: null,
        stat:{
            name: ""
        },
        statPoint:0
    });
    const toast = useRef(null);
    const router = useRouter();
    const [id, setId] = useState(router.query.id);
    const [editMode, setEditMode] = useState(false);
    React.useEffect(() => {
        if (router.isReady) {

            fetchPokemon(router.query.id);
            setId(router.query.id);
        }
    }, [router.isReady]);
    const pokemonService = new PokemonService();
    const setAbilityOnEditMode = (ability) => {
        if(ability){

            setAbility({...ability});
            setAbilityComponentDialog(false);
        }
    }
    const fetchPokemon = (id) => {

        pokemonService.getPokemon(id).then((data) => {
            setPokemon(data);
        });
    }

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
    }
    const getTypeIcon = (typeName) => {
        try {
            return `/icons/${typeName.toLowerCase()}.png`;
        } catch (error) {
            return null;
        }
    }
    const confirmDeleteType = (type) => {
        setType(type);
        setDeleteTypeDialog(true);
    };
    const deleteType = () => {
        pokemonService.deleteType(id, type).then(data => {
            pokemon.types = pokemon.types.filter((val) => val.id !== type.id);
            setPokemon({...pokemon, types: pokemon.types});
            setDeleteTypeDialog(false);
            toast.current.show({severity: 'success', summary: 'Successful', detail: 'Type Deleted', life: 3000});
        }).catch(error => {
                toast.current.show({severity: 'danger', summary: 'Warn Message', detail: 'Message Detail', life: 3000});
            }
        );
    };
    const typeService = new TypeService();
    const statService = new StatService();
    const [selectedType, setSelectedType] = useState(null);
    const [selectedStat, setSelectedStat] = useState(null);
    const fetchTypes = () => {
        typeService.getTypes({
            page: 0,
            size: 100,
        }).then(data => {
            setTypes(data.items.content);
        });
    }
    const fetchStats = () => {
        statService.getStats({
            page: 0,
            size: 100,
        }).then(data => {
            setStats(data.items.content);
        });
    }
    const valueTemplate = (value) => {
        return (
            <React.Fragment>
                {value}
            </React.Fragment>
        );
    };
    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetchStats();
        fetchTypes();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    const hideDeleteTypeDialog = () => {
        setDeleteTypeDialog(false);
    };

    const deleteTypeDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteTypeDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteType}/>
        </>
    );
    // STAT
    const confirmDeleteStat = (stat) => {
        setStat(stat);
        setDeleteStatDialog(true);
    };
    const deleteStat = () => {
        pokemonService.deleteStat(id, stat).then(data => {
            pokemon.stats = pokemon.stats.filter((val) => val.id !== stat.id);
            setDeleteStatDialog(false);
            toast.current.show({severity: 'success', summary: 'Successful', detail: 'Stat Deleted', life: 3000});
        }).catch(error => {
                toast.current.show({severity: 'danger', summary: 'Warn Message', detail: 'Message Detail', life: 3000});
            }
        );
    };
    const hideDeleteStatDialog = () => {
        setDeleteStatDialog(false);
    };

    const deleteStatDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteStatDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteStat}/>
        </>
    );

    //Ability
    const confirmDeleteAbility = (ability) => {
        setAbility(ability);
        setDeleteAbilityDialog(true);
    };
    const deleteAbility = () => {
        pokemonService.deleteAbility(id, ability).then(data => {
            pokemon.abilities = pokemon.abilities.filter((val) => val.id !== ability.id);
            setDeleteAbilityDialog(false);
            toast.current.show({severity: 'success', summary: 'Successful', detail: 'Ability Deleted', life: 3000});
        }).catch(error => {
                toast.current.show({severity: 'danger', summary: 'Warn Message', detail: 'Message Detail', life: 3000});
            }
        );
    };
    const saveType = () => {

        if (selectedType) {
            pokemonService.addType(id, selectedType).then(data => {
                console.log(data)
                setTypeDialog(false);
                setPokemon(data);
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'Type Added', life: 3000});
            }).catch(error => {
                toast.current.show({severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000});
            });
        }
    };
    const saveAbility = () => {
        if (ability) {
            pokemonService.addAbility(id, ability).then(data => {
                setAbilityDialog(false);
                setPokemon(data);
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'Ability Added', life: 3000});
            }).catch(error => {
                toast.current.show({severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000});
            });
        }
    };
    const saveStat = () => {
        console.log(stat, selectedStat)
        if (stat && selectedStat) {
            const request = {
                statId: selectedStat.id,
                statPoint: stat.statPoint
            }
            pokemonService.addStat(id, request).then(data => {
                setStatDialog(false);
                setPokemon(data);
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'Stat Added', life: 3000});
            }).catch(error => {
                console.log(error)
                toast.current.show({severity: 'warn', summary: 'Warn Message', detail: "Error!", life: 3000});
            });
        }
    };
    const hideTypeDialog = () => {
        setTypeDialog(false);
    };
    const hideAbilityDialog = () => {
        setAbilityDialog(false);
    };
    const hideStatDialog = () => {
        setStatDialog(false);
    };
    const hideAbilityComponentDialog = () => {
        setAbilityComponentDialog(false);
    };
    const typeDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideTypeDialog}/>
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveType}/>
        </>
    );
    const openNewType = () => {
        setType(null);
        setTypeDialog(true);
    };
    const openNewAbility = () => {
        setAbility(null);
        setAbilityDialog(true);
    };
    const onInputChange = (e, name) => {
        const val =( e.target?.value || e.value)|| '';
        setStat(prevStat => ({
            ...prevStat,
            [name]: val
        }));
    };
    const openNewStat = () => {
        setStat(null);
        setStatDialog(true);
    };
    const hideDeleteAbilityDialog = () => {
        setDeleteAbilityDialog(false);
    };

    const deleteAbilityDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAbilityDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteAbility}/>
        </>
    );
    const abilityDialogFooter =  (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideAbilityDialog}/>
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveAbility}/>
        </>
    );
    const statDialogFooter =  (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideStatDialog}/>
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveStat}/>
        </>
    );
    const setSelectedPokemonStat = (value) => {
        setSelectedStat(value);
        setStat({...stat, statId: value.id})
    };
    return (
        <div className="grid card my-4">
            <div className="col-12 lg:col-6">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2"
                        onClick={() => setEditMode(!editMode)}/>

                <div className="flex">
                    <Toast ref={toast}/>
                    <div className="pl-3 w-10"><img
                        src={pokemon?.imageUrl}
                        className="w-full" alt="product-overview"/></div>
                </div>
            </div>
            <div className="col-12 lg:col-6 py-3 lg:pl-6">
                <div
                    className="flex align-items-center text-xl font-medium text-900 mb-4">{capitalizeFirstLetter(pokemon?.name)}
                </div>
                <div className="flex align-items-center mb-5">
                    {pokemon?.types.map((type) => (
                        <div key={type.id} className="flex align-items-center gap-2 flex-column mr-5">
                            <img className=" h-4rem mb-2 mt-2" src={getTypeIcon(type.name)} alt={type.name}/>
                            {capitalizeFirstLetter(type.name)}
                            {editMode && <Button icon="pi pi-times" className="p-button-rounded p-button-danger mr-2"
                                                 onClick={() => confirmDeleteType(type)}/>}
                        </div>
                    ))}

                </div>
                <div className="font-bold text-900 mb-3">Stats</div>
                {pokemon?.stats.map((stat) => (
                        <div key={stat.id} className="flex align-items-center mb-3">
                            <div className="w-2 mr-3">{capitalizeFirstLetter(stat.stat.name)}</div>
                            <div className="w-full">
                                <ProgressBar value={stat.statPoint} displayValueTemplate={valueTemplate}/>
                            </div>
                            {editMode && <Button icon="pi pi-times" className="p-button-icon  p-button-danger ml-3 p-0"
                                                 onClick={() => confirmDeleteStat(stat)}/>}

                        </div>
                    )
                )}
                <div className="font-bold text-900 mb-3">Abilities</div>
                {pokemon?.abilities.map((ability) => (
                        <div key={ability.id} className="flex align-items-center mb-3">
                            <div className="w-3 mr-3">{capitalizeFirstLetter(ability.name)}</div>
                            {editMode && <Button icon="pi pi-times" className="p-button-icon  p-button-danger ml-3 p-1"
                                                 onClick={() => confirmDeleteAbility(ability)}/>}

                        </div>
                    )
                )}
                <div className="flex align-items-center justify-content-between">
                    {editMode && <Button label="Add Type" className="p-button  w-full p-button-success mr-2"
                                         onClick={() => openNewType()}/>}
                    {editMode && <Button label="Add Ability" className="p-button w-full p-button-secondary mr-2"
                                         onClick={() => openNewAbility()}/>}
                    {editMode && <Button label="Add Stat" className="p-button w-full p-button-warning"
                                         onClick={() => openNewStat()}/>}
                </div>
            </div>
            <Dialog visible={deleteTypeDialog} style={{width: '450px'}} header="Confirm" modal
                    footer={deleteTypeDialogFooter} onHide={hideDeleteTypeDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {type && (
                        <span>
                                    Are you sure you want to delete <b>{type.name}</b>?
                                </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteStatDialog} style={{width: '450px'}} header="Confirm" modal
                    footer={deleteStatDialogFooter} onHide={hideDeleteStatDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {stat && (
                        <span>
                                    Are you sure you want to delete <b>{stat.stat?.name}</b>?
                                </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteAbilityDialog} style={{width: '450px'}} header="Confirm" modal
                    footer={deleteAbilityDialogFooter} onHide={hideDeleteAbilityDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {ability && (
                        <span>
                                    Are you sure you want to delete <b>{ability.name}</b>?
                                </span>
                    )}
                </div>
            </Dialog>
            <Dialog visible={typeDialog} style={{width: '450px'}} header="Type" modal className="p-fluid"
                    footer={typeDialogFooter} onHide={hideTypeDialog}>
                <div className="field">
                    <label htmlFor="type">Type</label>
                    <Dropdown value={selectedType} onChange={(e) => {
                        setSelectedType(e.value);
                    }} options={types} optionLabel="name"
                              placeholder="Select a Type" className="w-full "/>
                    { <small className="p-invalid">Type is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={abilityDialog} style={{width: '450px'}} header="Ability" modal className="p-fluid"
                    footer={abilityDialogFooter} onHide={hideAbilityDialog}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={ability?.name} readOnly  onClick={setAbilityComponentDialog}/>
                </div>
            </Dialog>

            <Dialog visible={statDialog} style={{width: '450px'}} header="Stat" modal className="p-fluid"
                    footer={statDialogFooter} onHide={hideStatDialog}>
                <div className="field">
                    <label htmlFor="statPoint">Stat</label>
                <Dropdown value={selectedStat} onChange={(e) => {
                    setSelectedPokemonStat(e.value);
                }} options={stats} optionLabel="name"
                          placeholder="Select a Stat" className="w-full "/>
                </div>
                <div className="field">
                    <label htmlFor="statPoint">Stat Point</label>
                    <InputNumber id="statPoint" value={stat?.statPoint} onChange={(e) => onInputChange(e, 'statPoint')}/>
                </div>
            </Dialog>

            <Dialog visible={abilityComponentDialog}  onHide={hideAbilityComponentDialog} style={{width: '80%'}} header="Ability" modal>
                <div className="field">
                    <Abilities isSelect={true} setAbility={setAbilityOnEditMode}></Abilities>
                </div>
            </Dialog>
        </div>
    );
};
export default Pokemons;
