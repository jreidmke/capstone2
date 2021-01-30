import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {getNominationData} from './../api/api';
import LoadingSpinner from './../common/LoadingSpinner';
import NomineeTable from './NomineeTable';

const NomineeDetails = () => {
    const {nomId} = useParams();
    const [nominee, setNominee] = useState();

    useEffect(() => {
        async function getNom() {
            const resp = await getNominationData(nomId);
            setNominee(resp);
            console.log(resp);
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