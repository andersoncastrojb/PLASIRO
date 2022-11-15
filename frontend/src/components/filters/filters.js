import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { modifierTutorFiltered } from '../../features/daysTutor/daysTutorSlice'

const Filters = () => {

    const [flagName, setFlagName] = useState("");
    const [flagSubject, setFlagSubject] = useState("");
    const [flagTopic, setFlagTopic] = useState("");
    const [flagQ, setFlagQ] = useState("");
    
    const dispatch = useDispatch();
    const tutors = useSelector((state) => state.DaysTutor.tutors);
    // console.log(tutors)

    const FlagName = (e) => {
        setFlagName(e.target.value)
    }
    const FlagSubject = (e) => {
        setFlagSubject(e.target.value)
    }
    const FlagTopic = (e) => {
        setFlagTopic(e.target.value)
    }
    const FlagQ = (e) => {
        setFlagQ(e.target.value)
    }

    const limpiarFiltros = () => {
        setFlagName("");
        setFlagSubject("");
        setFlagTopic("");
        setFlagQ("");
    }
    
    useEffect(() => {  
        //función de búsqueda
        const searcher = () => {
            let change = tutors;
            //Filtrado Name
            if(flagName !== ""){
                change = change.filter( (dato) => dato.name.toLowerCase().includes(flagName.toLocaleLowerCase()))
            }
            //Filtrado Email
            if(flagSubject !== ""){
                
                change = change.filter( 
                    (obj) => 
                    obj.subjects.filter( (subject) =>
                        subject.toLowerCase().includes(flagSubject.toLocaleLowerCase())
                    ).length > 0
                )
            }
            
            //Filtrado Estado
            if(flagTopic !== ""){

                change = change.filter( 
                    (obj) => 
                    obj.masteryOfTopics.filter( (topic) =>
                        topic.toLowerCase().includes(flagTopic.toLocaleLowerCase())
                    ).length > 0
                )
            }
            /*
            //Filtrado Perfil
            if(flagQ !== ""){
                change = change.filter( (dato) => dato.profile === flagQ)
            }*/
            
            dispatch(modifierTutorFiltered(change));
        }
        searcher()
    }, [dispatch, tutors, flagName, flagSubject, flagTopic]);
    
    return(
        <>
            
            <div className="box">
                <div className='title__and__buttom'>
                    <h4 className="subtitle is-4">Filtros de Búsqueda</h4>
                    <button className="button is-normal" onClick={limpiarFiltros}>Limpiar Filtros</button>
                </div>
                <div className="columns">
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">Nombre</label>
                            <div className="control">
                                <input
                                className="input"
                                type="text"
                                placeholder="Text input"
                                value={flagName}
                                onChange={(e) => FlagName(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">Áreas</label>
                            <div className="control">
                                <input
                                className="input"
                                type="text"
                                placeholder="Text input"
                                value={flagSubject}
                                onChange={(e) => FlagSubject(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">Temas específicos</label>
                            <div className="control">
                                <input
                                className="input"
                                type="text"
                                placeholder="Text input"
                                value={flagTopic}
                                onChange={(e) => FlagTopic(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">Calificación</label>
                            <div className="control">
                                <input
                                className="input"
                                type="text"
                                placeholder="Text input"
                                value={flagQ}
                                onChange={(e) => FlagQ(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Filters;