import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import {useEffect, useState} from 'react';
import {PropublicaApi, getAddressByCoords, getOCDStringByAddress } from './../api/api'; 
import LoadingSpinner from '../common/LoadingSpinner'; 
import InfoCard from './InfoCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Map.css';
import Container from 'react-bootstrap/Container';
import AddressForm from '../searches/AddressForm';
import repSeal from './../images/repSeal.png';
import senSeal from './../images/senSeal.png';
import {googleMapsKey} from './../keys';

const MapContainer = () => {
  const [center, setCenter] = useState({
    lat: 38.9072,
    lng: -77.0369
  });

  const [markerPosition, setMarkerPosition] = useState();
  const [senators, setSenators] = useState();
  const [rep, setRep] = useState(); 
  const [address, setAddress] = useState();

  useEffect(() => {
    async function getPols() {
      const ocdString = await getOCDStringByAddress(address);
      const pols = await PropublicaApi.getPoliticiansByOcd(ocdString);
      setSenators(pols[0]);
      if(!pols[1]) return;
      setRep(pols[1]); 
    };
    getPols();
  }, [address])

  const mapStyles = {
    width: '35em',
    height: '35em'
  };

  const getLocation = async() => {
    async function success(pos) {
      var crd = pos.coords;
      setCenter({
        lat: crd.latitude,
        lng: crd.longitude
      });
      setMarkerPosition({
        lat: crd.latitude,
        lng: crd.longitude
      });
      let address = await getAddressByCoords(crd.latitude, crd.longitude);
      setAddress(address); 
    }
    
    function error(err) {
      console.log(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);
  }

  return(
    <Container>
      <Row>
        <Col>
              <h3 className='mt-5'>To find your Politicians, enter your address or simply press the <b>Find My Politicians</b> button!</h3>
              <Button variant="primary" onClick={() =>getLocation()} className='text-center' block>Find My Politicians</Button>
              <br/>
              <AddressForm isNavbar={false}/>
              <br/>
              <br/>
              <img src={senSeal} id='seal-img'/>
              <img src={repSeal} id='seal-img'/>
              
              
        </Col>
        <Col xs={1}/>
        <Col>
          <Map
              google={window.google}
              zoom={14}
              style={mapStyles}
              initialCenter={center}
              center={center}>

            {markerPosition ? <Marker position={markerPosition}/> : ""}

            <InfoWindow
              position={markerPosition}
              visible={senators} id='info-window'>
                
                <Row><Col><h3>Senators</h3></Col></Row>

                <Row> 
                <Col>   
                  {senators ? senators.map(s => (
                     <InfoCard pol={s} chamber='senate'/>
                    )) : <LoadingSpinner/>}
                    </Col>
                </Row>

                <hr/>
                <Row><Col><h3>Representative</h3></Col></Row>

                <Row>
                  {rep ? <Col><InfoCard pol={rep} chamber='house'/></Col> : <LoadingSpinner/>}
                </Row>  
                  
                
            </InfoWindow>
    
          </Map>
        </Col>
        <Col/>
      </Row>
    </Container>
  )
}


export default GoogleApiWrapper({
  apiKey: googleMapsKey
})(MapContainer);

