const yargs = require('yargs');
const fs = require('fs')
const transaction = require('./controllers/client.controller');



yargs.command({
    command:"transaction",
    describe:"calculate balance",
    builder:{
        filename:{type:"string", demandOption:true},
        searchValue:{type:"string", demandOption:true},
        transactionType:{type:"string", demandOption:true},
        transactionValue:{type:"string", demandOption:true},
    },
    handler: (argv)=> transaction(argv.filename, argv.searchValue, argv.transactionType, argv.transactionValue)
})

yargs.argv