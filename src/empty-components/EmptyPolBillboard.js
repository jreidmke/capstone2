import LoadingSpinner from './../common/LoadingSpinner';

const EmptyPolBillboard = () => {
    return(
        <div style={{height:"600px", width:"400px", border:"1px solid lightgrey", padding:"300px"}}><LoadingSpinner/></div>
    )
}

export default EmptyPolBillboard; 

{/* <div className='text-center'>Loading Politician Data</div> */}