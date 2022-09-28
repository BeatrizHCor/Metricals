import { InfluxDB, Point } from '@influxdata/influxdb-client'
import CharacterFilters from '../interfaces/CharacterFilters'



const token = 'mytoken';
const org = 'myorg';
const bucket = 'mybucket';
const client = new InfluxDB({ url: 'http://localhost:8086', token: token });
const userToken = crypto.randomUUID();






const sendUser = () => {
    const writeApi = client.getWriteApi(org, bucket);
    writeApi.useDefaultTags({ host: 'host1' });

    const point = new Point('rick-and-morty').stringField('user_token', userToken);
    writeApi.writePoint(point);

    writeApi
        .close()
        .then(() => {
            console.log('FINISHED');
        })
        .catch((e: any) => {
            console.error(e);
            console.log('Finished ERROR');
        });
};


    export default sendUser