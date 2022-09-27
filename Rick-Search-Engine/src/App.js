import React from 'react';
import './App.css';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import CharactersList from './components/Character/CharacterList/CharactersList';
import LocationList from './components/Locations/LocationList/LocationList';
import Sheet from './components/Character/Sheets/Sheet';
import LocationSheet from './components/Locations/LocationsSheet/LocationsSheet';

const token = 'mytoken';
const org = 'myorg';
const bucket = 'mybucket';
const client = new InfluxDB({ url: 'http://localhost:8086', token: token });
const userToken = crypto.randomUUID();

const sendData = () => {
    const writeApi = client.getWriteApi(org, bucket);
    writeApi.useDefaultTags({ host: 'host1' });

    const point = new Point('rick-and-morty').stringField('user_token', userToken);
    writeApi.writePoint(point);

    writeApi
        .close()
        .then(() => {
            console.log('FINISHED');
        })
        .catch((e) => {
            console.error(e);
            console.log('Finished ERROR');
        });
};

sendData();
setTimeout(sendData, 3000);

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<CharactersList></CharactersList>}></Route>
                    <Route path="/Locations" element={<LocationList></LocationList>}></Route>
                    <Route path="/CharacterSheet" element={<Sheet></Sheet>}></Route>
                    <Route path="/LocationSheet" element={<LocationSheet></LocationSheet>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
