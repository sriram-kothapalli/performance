import faker from 'faker';

export const addProtocolsExportAndComplete = async (number, method, typeOfweighing, sim) => {
    await startMethod(method, typeOfweighing, sim);
    await addProtocol(number, method, typeOfweighing, sim);
    await exportProtocols(sim);
    await complete(sim);
}

const startMethod = async (method, typeOfweighing, sim) => {
    if (typeOfweighing === 'Animal Weighing') {
        await Request(`${sim}/uicallback?p1=StartMethod&p2=` +
            `[{"id":"currenttime","value":""},{"id":"Timezone","value":""},{"id":"SerialNumber","value":""},{"id":"DeviceState","value":"ready"},{"id":"Methodname","value":"${method}"},{"id":"MethodType","value":"General Weighing"},{"id":"targetWeight","value":""},{"id":"lowerTolerance","value":""},{"id":"upperTolerance","value":""},{"id":"toleranceunit","value":""},{"id":"applytolerance","value":"no"},{"id":"TaskLabel1","value":"USER SAMPLE ID"},{"id":"TaskValue1","value":"${faker.random.words(1)}"},{"id":"TaskLabel2","value":"METHOD/SPECIES"},{"id":"TaskValue2","value":"${faker.random.alphaNumeric(5)}"},{"id":"TaskLabel3","value":"STUDY NO."},{"id":"TaskValue3","value":"${faker.datatype.number({ min: 10000000, max: 99999999 })}"},{"id":"ResultLabel1","value":"ANIMAL ID"},{"id":"ResultValue1","value":"1"},{"id":"ResultLabel2","value":""},{"id":"ResultValue2","value":""},{"id":"ResultLabel3","value":""},{"id":"ResultValue3","value":""},{"id":"Weight","value":"19.222"},{"id":"totalprotocols","value":"0"},{"id":"addProtocoltext1","value":""},{"id":"addProtocoltext2","value":""},{"id":"addProtocoltext3","value":""},{"id":"addProtocoltext4","value":""}]`);
    } else if (typeOfweighing === 'Non Animal Weighing') {
        await Request(`${sim}/uicallback?p1=StartMethod&p2=` +
            `[{"id":"currenttime","value":""},{"id":"Timezone","value":""},{"id":"SerialNumber","value":""},{"id":"DeviceState","value":"ready"},{"id":"Methodname","value":"${method}"},{"id":"MethodType","value":"General Weighing"},{"id":"targetWeight","value":""},{"id":"lowerTolerance","value":""},{"id":"upperTolerance","value":""},{"id":"toleranceunit","value":""},{"id":"applytolerance","value":"no"},{"id":"TaskLabel1","value":"USER SAMPLE ID"},{"id":"TaskValue1","value":"${faker.random.words(1)}"},{"id":"TaskLabel2","value":""},{"id":"TaskValue2","value":""},{"id":"TaskLabel3","value":""},{"id":"TaskValue3","value":""},{"id":"ResultLabel1","value":"Sample ID"},{"id":"ResultValue1","value":"1"},{"id":"ResultLabel2","value":""},{"id":"ResultValue2","value":""},{"id":"ResultLabel3","value":""},{"id":"ResultValue3","value":""},{"id":"Weight","value":"19.222"},{"id":"totalprotocols","value":"0"},{"id":"addProtocoltext1","value":""},{"id":"addProtocoltext2","value":""},{"id":"addProtocoltext3","value":""},{"id":"addProtocoltext4","value":""}]`);
    } else if (typeOfweighing === 'Performance Check') {
        let targetWeight = 0;
        if (method === '1000 Gram Check') {
            targetWeight = 1000;
        } else if (method === '100 Gram Check') {
            targetWeight = 100;
        } else if (method === '20 Gram Check') {
            targetWeight = 20;
        }
        await Request(`${sim}/uicallback?p1=StartMethod&p2=` +
            `[{"id":"currenttime","value":""},{"id":"Timezone","value":""},{"id":"SerialNumber","value":""},{"id":"DeviceState","value":"ready"},{"id":"Methodname","value":"${method}"},{"id":"MethodType","value":"General Weighing"},{"id":"targetWeight","value":"${targetWeight}"},{"id":"lowerTolerance","value":"${faker.datatype.number({ min: 1, max: 1 })}"},{"id":"upperTolerance","value":"${faker.datatype.number({ min: 1, max: 1 })}"},{"id":"toleranceunit","value":"Gram"},{"id":"applytolerance","value":"yes"},{"id":"TaskLabel1","value":"Task ID"},{"id":"TaskValue1","value":"${faker.random.alphaNumeric(5)}"},{"id":"TaskLabel2","value":""},{"id":"TaskValue2","value":""},{"id":"TaskLabel3","value":""},{"id":"TaskValue3","value":""},{"id":"ResultLabel1","value":"Sample ID"},{"id":"ResultValue1","value":"1"},{"id":"ResultLabel2","value":""},{"id":"ResultValue2","value":""},{"id":"ResultLabel3","value":""},{"id":"ResultValue3","value":""},{"id":"Weight","value":"19.222"},{"id":"totalprotocols","value":"0"},{"id":"addProtocoltext1","value":""},{"id":"addProtocoltext2","value":""},{"id":"addProtocoltext3","value":""},{"id":"addProtocoltext4","value":""}]`);
    } else {
        await Request(`${sim}/uicallback?p1=StartMethod&p2=` +
            `[{"id":"currenttime","value":""},{"id":"Timezone","value":""},{"id":"SerialNumber","value":""},{"id":"DeviceState","value":"ready"},{"id":"Methodname","value":"${method}"},{"id":"MethodType","value":"General Weighing"},{"id":"targetWeight","value":"100"},{"id":"lowerTolerance","value":"${faker.datatype.number({ min: 1, max: 1 })}"},{"id":"upperTolerance","value":"${faker.datatype.number({ min: 1, max: 1 })}"},{"id":"toleranceunit","value":"Gram"},{"id":"applytolerance","value":"yes"},{"id":"TaskLabel1","value":"Task ID"},{"id":"TaskValue1","value":"${faker.random.alphaNumeric(5)}"},{"id":"TaskLabel2","value":""},{"id":"TaskValue2","value":""},{"id":"TaskLabel3","value":""},{"id":"TaskValue3","value":""},{"id":"ResultLabel1","value":"Sample ID"},{"id":"ResultValue1","value":"1"},{"id":"ResultLabel2","value":""},{"id":"ResultValue2","value":""},{"id":"ResultLabel3","value":""},{"id":"ResultValue3","value":""},{"id":"Weight","value":"19.222"},{"id":"totalprotocols","value":"0"},{"id":"addProtocoltext1","value":""},{"id":"addProtocoltext2","value":""},{"id":"addProtocoltext3","value":""},{"id":"addProtocoltext4","value":""}]`);
    }
}

var data;
const addProtocol = async (number, method, typeOfweighing, sim) => {
    for (let i = 1; i <= number; i++) {
        const WEIGHT = faker.datatype.number({ min: 100, max: 999 });
        const ANIMALID = faker.datatype.number({ min: 1000, max: 9999 });
        if (typeOfweighing === 'Animal Weighing') {
            data = `[{"id":"currenttime","value":""},{"id":"Timezone","value":""},{"id":"SerialNumber","value":""},{"id":"DeviceState","value":"ready"},{"id":"Methodname","value":"${method}"},{"id":"MethodType","value":"General Weighing"},{"id":"targetWeight","value":""},{"id":"lowerTolerance","value":""},{"id":"upperTolerance","value":""},{"id":"toleranceunit","value":""},{"id":"applytolerance","value":"no"},{"id":"TaskLabel1","value":"USER SAMPLE ID"},{"id":"TaskValue1","value":""},{"id":"TaskLabel2","value":"METHOD/SPECIES"},{"id":"TaskValue2","value":""},{"id":"TaskLabel3","value":"STUDY NO."},{"id":"TaskValue3","value":""},{"id":"ResultLabel1","value":"ANIMAL ID"},{"id":"ResultValue1","value":"${ANIMALID}"},{"id":"ResultLabel2","value":""},{"id":"ResultValue2","value":""},{"id":"ResultLabel3","value":""},{"id":"ResultValue3","value":""},{"id":"Weight","value":"${WEIGHT}"},{"id":"totalprotocols","value":"0"},{"id":"addProtocoltext1","value":""},{"id":"addProtocoltext2","value":""},{"id":"addProtocoltext3","value":""},{"id":"addProtocoltext4","value":""}]`;
            await Request(`${sim}/uicallback?p1=AddProtocol&p2=` + data);
        } else if (typeOfweighing === 'Non Animal Weighing') {
            data = `[{"id":"currenttime","value":""},{"id":"Timezone","value":""},{"id":"SerialNumber","value":""},{"id":"DeviceState","value":"ready"},{"id":"Methodname","value":"${method}"},{"id":"MethodType","value":"General Weighing"},{"id":"targetWeight","value":""},{"id":"lowerTolerance","value":""},{"id":"upperTolerance","value":""},{"id":"toleranceunit","value":""},{"id":"applytolerance","value":"no"},{"id":"TaskLabel1","value":"USER SAMPLE ID"},{"id":"TaskValue1","value":""},{"id":"TaskLabel2","value":""},{"id":"TaskValue2","value":""},{"id":"TaskLabel3","value":""},{"id":"TaskValue3","value":""},{"id":"ResultLabel1","value":"Sample ID"},{"id":"ResultValue1","value":"${ANIMALID}"},{"id":"ResultLabel2","value":""},{"id":"ResultValue2","value":""},{"id":"ResultLabel3","value":""},{"id":"ResultValue3","value":""},{"id":"Weight","value":"${WEIGHT}"},{"id":"totalprotocols","value":"0"},{"id":"addProtocoltext1","value":""},{"id":"addProtocoltext2","value":""},{"id":"addProtocoltext3","value":""},{"id":"addProtocoltext4","value":""}]`;
            await Request(`${sim}/uicallback?p1=AddProtocol&p2=` + data);
        } else if (typeOfweighing === 'ID Skip') {
            data = `[{"id":"currenttime","value":""},{"id":"Timezone","value":""},{"id":"SerialNumber","value":""},{"id":"DeviceState","value":"ready"},{"id":"Methodname","value":"${method}"},{"id":"MethodType","value":"General Weighing"},{"id":"targetWeight","value":""},{"id":"lowerTolerance","value":""},{"id":"upperTolerance","value":""},{"id":"toleranceunit","value":""},{"id":"applytolerance","value":"no"},{"id":"TaskLabel1","value":"USER SAMPLE ID"},{"id":"TaskValue1","value":""},{"id":"TaskLabel2","value":""},{"id":"TaskValue2","value":""},{"id":"TaskLabel3","value":""},{"id":"TaskValue3","value":""},{"id":"ResultLabel1","value":"Sample ID"},{"id":"ResultValue1","value":""},{"id":"ResultLabel2","value":""},{"id":"ResultValue2","value":""},{"id":"ResultLabel3","value":""},{"id":"ResultValue3","value":""},{"id":"Weight","value":"${WEIGHT}"},{"id":"totalprotocols","value":"0"},{"id":"addProtocoltext1","value":""},{"id":"addProtocoltext2","value":""},{"id":"addProtocoltext3","value":""},{"id":"addProtocoltext4","value":""}]`;
            await Request(`${sim}/uicallback?p1=AddProtocol&p2=` + data);
        }
        else if (typeOfweighing === 'Performance Check') {
            let minWeight = 0;
            let maxWeight = 0;
            if (method === '1000 Gram Check') {
                minWeight = 999;
                maxWeight = 1001;
            } else if (method === '100 Gram Check') {
                minWeight = 99;
                maxWeight = 101;
            } else if (method === '20 Gram Check') {
                minWeight = 19;
                maxWeight = 21;
            }
            const randomWeight = faker.datatype.number({ min: minWeight, max: maxWeight });
            data = `[{"id":"currenttime","value":""},{"id":"Timezone","value":""},{"id":"SerialNumber","value":""},{"id":"DevieState","value":"ready"},{"id":"Methodname","value":"${method}"},{"id":"MethodType","value":"General Weighing"},{"id":"targetWeight","value":""},{"id":"lowerTolerance","value":""},{"id":"upperTolerance","value":""},{"id":"toleranceunit","value":"Gram"},{"id":"applytolerance","value":"yes"},{"id":"TaskLabel1","value":"Task ID"},{"id":"TaskValue1","value":"${faker.random.alphaNumeric(5)}"},{"id":"TaskLabel2","value":""},{"id":"TaskValue2","value":""},{"id":"TaskLabel3","value":""},{"id":"TaskValue3","value":""},{"id":"ResultLabel1","value":"Sample ID"},{"id":"ResultValue1","value":"1"},{"id":"ResultLabel2","value":""},{"id":"ResultValue2","value":""},{"id":"ResultLabel3","value":""},{"id":"ResultValue3","value":""},{"id":"Weight","value":"${randomWeight}"},{"id":"totalprotocols","value":"0"},{"id":"addProtocoltext1","value":""},{"id":"addProtocoltext2","value":""},{"id":"addProtocoltext3","value":""},{"id":"addProtocoltext4","value":""}]`;
            await Request(`${sim}/uicallback?p1=AddProtocol&p2=` + data);
        }
        else {
            data = `[{"id":"currenttime","value":""},{"id":"Timezone","value":""},{"id":"SerialNumber","value":""},{"id":"DevieState","value":"ready"},{"id":"Methodname","value":"${method}"},{"id":"MethodType","value":"General Weighing"},{"id":"targetWeight","value":""},{"id":"lowerTolerance","value":""},{"id":"upperTolerance","value":""},{"id":"toleranceunit","value":"Gram"},{"id":"applytolerance","value":"yes"},{"id":"TaskLabel1","value":"Task ID"},{"id":"TaskValue1","value":"${faker.random.alphaNumeric(5)}"},{"id":"TaskLabel2","value":""},{"id":"TaskValue2","value":""},{"id":"TaskLabel3","value":""},{"id":"TaskValue3","value":""},{"id":"ResultLabel1","value":"Sample ID"},{"id":"ResultValue1","value":"1"},{"id":"ResultLabel2","value":""},{"id":"ResultValue2","value":""},{"id":"ResultLabel3","value":""},{"id":"ResultValue3","value":""},{"id":"Weight","value":"107"},{"id":"totalprotocols","value":"0"},{"id":"addProtocoltext1","value":""},{"id":"addProtocoltext2","value":""},{"id":"addProtocoltext3","value":""},{"id":"addProtocoltext4","value":""}]`;
            await Request(`${sim}/uicallback?p1=AddProtocol&p2=` + data);
        }
    }
}

const exportProtocols = async (sim) => {
    await Request(`${sim}/uicallback?p1=Export&p2=` + data);
}

export const complete = async (sim) => {
    await Request(`${sim}/uicallback?p1=Complete&p2=` + data);
}


export const Request = async (apiUrl, timeout = 2000) => {
    const response = await fetch(apiUrl);
    await new Promise(resolve => setTimeout(resolve, timeout));
    return response.json();
};