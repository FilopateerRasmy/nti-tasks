const fs = require('fs');

const readJsonFile = filename => {
    let data
    try {
        data = JSON.parse(fs.readFileSync(filename, 'utf-8'));
        console.log
    } catch (e) {
        console.log(e.message)
    }
    return data || [];
}

const writeFile = (filename, data)=>{
    
    try {
        data = fs.writeFileSync(filename, JSON.stringify(data));
        console.log('Done writing file')
    } catch (e) {
        console.log(e.message)
    }

}

const search = ({data, searchBy="accountNum", searchValue})=>{
const file = data;
return file.findIndex(el => el[searchBy] == searchValue)

}

const calculateBalnce = ({transactionType, transactionValue,clientInfo})=>{
const types = ['add', 'withdraw'];
if(!types.includes(transactionType)) throw new Error ("please insert a proper type");

const {transactions} = clientInfo;

if(transactionType === 'add'){

clientInfo.intialbalance += (+transactionValue);

transactions.push({transactionType,transactionValue})

}else{
    clientInfo.intialbalance -= (+transactionValue);

    transactions.push({transactionType,transactionValue})
}

return clientInfo;
}

const transaction = (filename, searchValue, transactionType, transactionValue) => {
    const data = readJsonFile(filename);
 
    const index =  search({data,searchValue});
 
    if(index === -1) throw new Error("No client found!");

    const updatedClientData = calculateBalnce({transactionType,transactionValue,clientInfo:data[index]});

    data[index] = updatedClientData;

    writeFile(filename, data);
     
}

module.exports = transaction;