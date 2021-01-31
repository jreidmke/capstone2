import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {PropublicaApi} from './../api/api';
import LoadingSpinner from './../common/LoadingSpinner';
import NomineeTable from './NomineeTable';

const NomineeDetails = () => {
    const {nomId} = useParams();
    const [nominee, setNominee] = useState();

    useEffect(() => {
        async function getNom() {
            const resp = await PropublicaApi.getNominationData(nomId);
            setNominee(resp);
        }
        getNom();
    }, []);

    return(
        <div>
            {nominee ? <h1>{nominee.description}</h1> : <LoadingSpinner/>}
            {nominee ? <NomineeTable nominee={nominee}/> : <LoadingSpinner/>}
        </div>
    )
};

export default NomineeDetails;