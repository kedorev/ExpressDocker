const fs = require('fs-extra');
const path = require('path');

//const forex = require('../db/forex');

function currencies(name) {
   //const options = {encoding : 'utf8'};
   const filepath  = path.join(__dirname, '..','db', name);
   return fs.readJson(filepath)
       .then(obj =>{
        return obj.rates;
       })
       .catch(err => {
           console.error(err);
       })

/*    fs.readFile('../db/forex.json', 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        const obj = JSON.parse(data);
    });*/
}


function currency(fileName, currencyName)
{
    return currencies(fileName)
        .then(currencies => {

            return currencies[currencyName];
        })
        .catch(err => {
            console.error(err)
        });
}

function convertCurrency(fileName, currencyName, priceProduct){
    return currency(fileName,currencyName)
        .then(currency => {
            return priceProduct * parseInt(currency);
        })
        .catch(err => {
            console.error(err)
        });
}

module.exports = {
    getCurrencies(name)
    {
        return currencies(name);
    },
    getCurrency(fileName,currencyName)
    {
        return currency(fileName, currencyName);
    },
    getConverCurrency(fileName, currencyName, priceProduct)
    {
        return convertCurrency(fileName, currencyName, priceProduct);
    }

};