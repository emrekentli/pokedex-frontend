import React, {useEffect, useRef, useState} from 'react';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import PokemonService from '../../data/service/api-calls/PokemonService';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Accordion, AccordionTab} from 'primereact/accordion';
import {Dropdown} from 'primereact/dropdown';
import TypeService from '../../data/service/api-calls/TypeService';
import {InputNumber} from "primereact/inputnumber";
import {useRouter} from "next/router";
import UserService from "../../data/service/api-calls/UserService";
import {isHaveAdminRole} from "../../data/utills/role-validation/role-validations/AdminRoleValidation";

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
    const [pokemon, setPokemon] = useState(emptyPokemon);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(isHaveAdminRole());
    }, [])


    const [filter, setFilter] = useState({
        page: 0,
        size: 12,
        sort: 'created,asc',
        name: null,
        baseExperience: "",
        height: null,
        weight: null,
        imageUrl: null,
        type: null,
        ability: null
    });
    const clearFilters = () => {
        setFilter({
            page: 0,
            size: 12,
            sort: 'created,asc',
            name: "",
            baseExperience: "",
            height: "",
            weight: "",
            imageUrl: '',
            type: null,
            ability: ""
        });
        setSelectedType(null);
    };

    const pokemonService = new PokemonService();
    const userService = new UserService();
    const typeService = new TypeService();
    const [selectedType, setSelectedType] = useState(null);
    const fetchTypes = () => {
typeService.getTypes({
            page: 0,
            size: 100,
    }).then(data => {
            console.log(data);
            setTypes(data.data?.data.items.content);
        });
    }

    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetchTypes();

    }, []);// eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        fetchPokemons();
        // eslint-disable-next-line
    }, [filter]);
    const fetchPokemons = () => {
        pokemonService.getWishlist(filter).then((data) => {
            setPokemons(data.data.data.items);
        });
    }
    const setSelectedTypeFilter = (e) => {
        setFilter({...filter, type: e ? e.name : null});
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
        pokemonService.deletePokemonFromWishlist(pokemon).then(data => {
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


    const onInputChange = (e, name) => {
        const val =( e.target?.value || e.value)|| '';
        setPokemon(prevPokemon => ({
            ...prevPokemon,
            [name]: val
        }));
    };
    const deletePokemonDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePokemonDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletePokemon}/>
        </>
    );
    const listItem = (pokemon) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 h-full">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round h-full" src={`${pokemon.imageUrl}`} alt={pokemon.name}/>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{capitalizeFirstLetter(pokemon.name)   }</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                   <div className="flex justify-content-evenly w-full">
                                {pokemon.types?.map((type) => (
                                    <div key={type.id} className="flex align-items-center gap-2  flex-column">
                                        <img  className="w-12  h-4rem mb-2 mt-2" src={getTypeIcon(type.name)} alt={type.name}/>
                                        {capitalizeFirstLetter(type.name)}
                                    </div>
                                ))}
                            </div>
                                </span>

                            </div>
                            <div className="text-xl">Abilities : {pokemon.abilities.map((ability) => capitalizeFirstLetter(ability.name)).join(" - ")}</div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary" onClick={() => goToDetail(pokemon)}/>
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"  onClick={() => confirmDeletePokemon(pokemon)}/>
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
            return `/icons/${typeName.toLowerCase()}.png`;
        } catch (error) {
            return null;
        }
    }
    const defaultImage = 'assets/icons/unknown-pokemon.png';
    const goToDetail = (pokemon) => {
        router.push(`/pokemons/${pokemon.id}`);
    };
    const addToCatchlist = (pokemon) => {
        userService.addToCatchlist(pokemon).then(data => {
            if(data.data!=null){
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'Pokemon Added To Catchlist', life: 3000});
            }
            else{
                toast.current.show({severity: 'error', summary: 'Error', detail: 'Already exists in Catchlist', life: 3000});
            }
        }).catch(error => {
                toast.current.show({severity: 'error', summary: 'Error', detail: 'Already exists in Catchlist', life: 3000});
            }
);
    };
    const addToWishlist = (pokemon) => {
        userService.addToWishlist(pokemon).then(data => {
            if(data.data!=null){
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'Pokemon Added To Wishlist', life: 3000});
            }
            else{
                toast.current.show({severity: 'error', summary: 'Error', detail: 'Already exists in Wishlist', life: 3000});
            }
        }).catch(error => {
                toast.current.show({severity: 'error', summary: 'Error', detail: 'Already exists in Wishlist', life: 3000});
            }
        );
    };
    const gridItem = (pokemon) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round h-full">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">

                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9  h-10rem" src={`${pokemon.imageUrl || defaultImage}`} alt={pokemon.name}/>
                        <div className="text-2xl font-bold">{capitalizeFirstLetter(pokemon.name)}</div>

                            <div className="flex justify-content-evenly w-full">
                                {pokemon.types?.map((type) => (
                                    <div  key={type.id} className="flex align-items-center gap-2  flex-column">
                                        <img className="w-12  h-4rem mb-2 mt-2" src={getTypeIcon(type.name)} alt={type.name}/>
                                        {capitalizeFirstLetter(type.name)}
                                    </div>
                                ))}
                            </div>
                        <div className="text-xl">Abilities : {pokemon.abilities.map((ability) => capitalizeFirstLetter(ability.name)).join(" - ")}</div>
                    </div>
                    <div className={`flex align-items-center justify-content-between` }>

                        <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary" onClick={() => goToDetail(pokemon)}/>
                        {

                            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeletePokemon(pokemon)} />
                        }
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
    const handleAbilityChange = (e) => {
        const { value } = e.target;
        setFilter({ ...filter, ability: value });
    };
    const handleNameChange = (e) => {
        const { value } = e.target;
        setFilter({ ...filter, name: value });
    };
    const handleWeightChange = (e) => {
        setFilter({ ...filter, weight: e.value });
    };
    const handleHeightChange = (e) => {
        setFilter({ ...filter, height: e.value });
    };

    const handleBaseExperienceChange = (e) => {
        setFilter({ ...filter, baseExperience: e.value });
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
                    <Accordion activeIndex={0} className="mb-4">
                        <AccordionTab header="Filter">
                            <form >
                                <div style={{ minHeight: '40px', gap: '20px' }} className="flex mb-3 ">
                                    <InputText
                                        value={filter.name}
                                        placeholder="Name"
                                        onChange={handleNameChange}
                                        style={{width:'100%'}}
                                    />
                                    <InputNumber
                                        value={filter.weight}
                                        placeholder="Weight"
                                        onChange={handleWeightChange}
                                        style={{width:'100%'}}
                                    />
                                    <InputNumber
                                        value={filter.height}
                                        placeholder="Height"
                                        onChange={handleHeightChange}
                                        style={{width:'100%'}}
                                    />
                                    <InputNumber
                                        value={filter.baseExperience}
                                        placeholder="Base Experience"
                                        onChange={handleBaseExperienceChange}
                                        style={{width:'100%'}}
                                    />

                                    <InputText
                                        value={filter.ability}
                                        placeholder="Ability"
                                        onChange={handleAbilityChange}
                                        style={{width:'100%'}}
                                    />
                                    <Dropdown value={selectedType} onChange={(e) => {
                                        setSelectedType(e.value); setSelectedTypeFilter(e.value)
                                    }} options={types} optionLabel="name"
                                              placeholder="Select a Type" className="w-full md:w-14rem" />


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
                                            onClick={fetchPokemons}
                                            className="p-button-secondary w-full mr-2"
                                        />
                                    </div>
                                </div>
                            </form>
                        </AccordionTab>
                    </Accordion>

                    <DataView dataKey="id" value={pokemons} paginator rows={12} itemTemplate={itemTemplate} layout={layout} header={header()}/>



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


                </div>
            </div>
        </div>
    );
};
export default Pokemons;
