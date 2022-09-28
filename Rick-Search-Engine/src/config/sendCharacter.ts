import { InfluxDB, Point } from '@influxdata/influxdb-client';




const token = 'mytoken';
const org = 'myorg';
const bucket = 'mybucket';
const client = new InfluxDB({ url: 'http://localhost:8086', token: token });


 




const sendCharacters = (id: number) => {
    const writeApi = client.getWriteApi(org, bucket);
    writeApi.useDefaultTags({ host: 'host1' });


    const pointname = new Point('rick-characters-visited').stringField("id", id );

    writeApi.writePoint(pointname);


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

export default sendCharacters;