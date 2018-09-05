const osmosis = require('osmosis');
const regex = /[+-]?[\d\,]+(?:\.\d+)?/g;

exports.getStockItem = (code) => {
    return new Promise((resolve, reject) => {
        let result;
        osmosis
        .get ('https://finance.naver.com/item/sise.nhn?code=' + code)    
        .set('name','//*[@id="middle"]/div[1]/div[1]/h2/a')    
        .set('price','//*[@id="chart_area"]/div[1]/div/p[1]/em/span[1]')
        .set('changeamount','//*[@id="_diff"]/span')    
        .set('changeratio','//*[@id="_rate"]/span')    
        .data(item => {
            var match;
            
            if (!item.name) {                
                reject(new Error('Fail to scrape source'));
            }else{
                regex.lastIndex = 0;
                match = regex.exec(item.changeratio);
                item.changeratio = match[0];
        
                regex.lastIndex = 0;
                match = regex.exec(item.changeamount);
                if (item.changeratio.indexOf("-") > -1){
                    item.changeamount = "-" +  match[0];
                }else{
                    item.changeamount = match[0];
                }
                
                //console.log(item);
                result = makeResult(code, item);
            }
        })
        .done(() => resolve(result));
    });    
}

exports.getMarketIndex = (code) => {
    switch(code){
        case 'KOSPI':
            return getLocalIndex(code);
        break;
        case 'KOSDAQ':
            return getLocalIndex(code);
        break;
        case 'FUT':
            return getLocalIndex2(code);
        break;
        case 'DJI@DJI':
            return getWorldIndex(code);
        break;
        case 'NAS@IXIC':
            return getWorldIndex(code);
        break;
        case 'SHS@000001':
            return getWorldIndex(code);
        break;
        case 'NII@NI225':
            return getWorldIndex(code);
        break;
        case 'FX_USDKRW':
            return getExchange(code);
        break;
        case 'OIL_CL':
            return getWorldOil(code);
        break;
        case 'CMDT_GC':
            return getWorldGold(code);
        break;
        default:
            return new Promise((resolve, reject) => {
                reject(new Error('Unknown Marketindex code'));
            });
        break;
    }
}

function getLocalIndex (code) {
    return new Promise((resolve, reject) => {
        let result;
        osmosis
        .get ('https://finance.naver.com/sise/sise_index.nhn?code=' + code)    
        .set('name','//*[@id="contentarea_left"]/div[1]/h3')    
        .set('price','//*[@id="now_value"]')
        .set('changeamount','//*[@id="change_value_and_rate"]/span')    
        .set('changeratio','//*[@id="change_value_and_rate"]')    
        .data(item => {
            var match;
    
            if (!item.name){
                reject(new Error('Fail to scrape source'));
            }else{
                regex.lastIndex = 0;
                match = regex.exec(item.changeratio);
                match = regex.exec(item.changeratio);
                item.changeratio = match[0];
        
                regex.lastIndex = 0;
                match = regex.exec(item.changeamount.replace(/[\t\n]/gi,""));
                if (item.changeratio.indexOf("-")>-1){
                    item.changeamount = "-" + match[0];
                }else{
                    item.changeamount = match[0];
                }
        
                //console.log(item);
                result = makeResult(code, item);
            }
        })
        .done(() => resolve(result));
    });    
}

function getLocalIndex2(code) {
    return new Promise((resolve, reject) => {
        let result;
        osmosis
        .get ('https://finance.naver.com/sise/sise_index.nhn?code=' + code)    
        .set('name','//*[@id="contentarea_left"]/div[1]/h3')    
        .set('price','//*[@id="now_value"]')
        .set('changeamount','//*[@id="change_value"]/strong')    
        .set('changeratio','//*[@id="change_rate"]/strong')    
        .data(item => {
            var match;
    
            if(!item.name){
                reject(new Error('Fail to scrape source'));
            }else{
                regex.lastIndex = 0;
                match = regex.exec(item.changeratio.replace(/[\t\n]/gi,""));
                item.changeratio = match[0];
        
                regex.lastIndex = 0;
                match = regex.exec(item.changeamount);
                if (item.changeratio.indexOf("-") > -1)
                    item.changeamount = "-" +  match[0];
                else
                    item.changeamount = match[0];
        
                // console.log(item)
                result = makeResult(code, item);
            }
        })
        .done(() => resolve(result));
    })    
}
    
function getWorldIndex(code){
    return new Promise((resolve, reject) => {
        let result;
        osmosis
        .get ('https://finance.naver.com/world/sise.nhn?symbol=' + code)    
        .set('name','//*[@id="wrap"]/div[1]/div[1]/div/h2')    
        .set('price','//*[@id="content"]/div[1]/div[1]/p[1]/em')
        .set('changeamount','//*[@id="content"]/div[1]/div[1]/p[2]/em[1]')    
        .set('changeratio','//*[@id="content"]/div[1]/div[1]/p[2]/em[2]')    
        .data(item => {
            var match;

            if(!item.name){
                result = null;
            }else{
                regex.lastIndex = 0;
                match = regex.exec(item.changeratio.replace(/[\t\n]/gi,""));
                item.changeratio = match[0];
        
                regex.lastIndex = 0;
                match = regex.exec(item.changeamount);
                if (item.changeratio.indexOf("-") > -1)
                    item.changeamount = "-" +  match[0];
                else
                    item.changeamount = match[0];
        
                // console.log(item)   
                result = makeResult(code,item);
            }
        })
        .done(() => resolve(result));
    })
    
}

function getExchange(code){
    return new Promise((resolve, reject) => {
        let result;
        osmosis
        .get ('https://finance.naver.com/marketindex/exchangeDetail.nhn?marketindexCd=' + code)    
        .set('name','//*[@id="container"]/div[1]/div[1]/span')    
        .set('price','//*[@id="content"]/div[1]/div[1]/p[1]/em')
        .set('changeamount','//*[@id="content"]/div[1]/div[1]/p[2]/em[1]')    
        .set('changeratio','//*[@id="content"]/div[1]/div[1]/p[2]/em[2]')        
        .data(item => {
            var match;
    
            if(!item.name){
                reject(new Error('Fail to scrape source'));
            }else{
                regex.lastIndex = 0;
                match = regex.exec(item.price.replace(/[\t\n]/gi,""));
                item.price = match[0];
        
                regex.lastIndex = 0;
                match = regex.exec(item.changeratio.replace(/[\t\n]/gi,""));
                item.changeratio = match[0];
        
                regex.lastIndex = 0;
                match = regex.exec(item.changeamount);
                if (item.changeratio.indexOf("-") > -1)
                    item.changeamount = "-" +  match[0];
                else
                    item.changeamount = match[0];
        
                // console.log(item);
                result = makeResult(code, item);
            }
        })
        .done(() => resolve(result));
    })
}
    
function getWorldOil(code){
    return new Promise((resolve, reject) => {
        let result;
        osmosis
        .get ('https://finance.naver.com/marketindex/worldOilDetail.nhn?marketindexCd=' + code)    
        .set('name','//*[@id="container"]/div[1]/h2')    
        .set('price','//*[@id="content"]/div[1]/div[1]/p[1]/em')
        .set('changeamount','//*[@id="content"]/div[1]/div[1]/p[2]/em[1]')    
        .set('changeratio','//*[@id="content"]/div[1]/div[1]/p[2]/em[2]')        
        .data(item => {
            var match;
    
            if(!item.name){
                reject(new Error('Fail to scrape source'));
            }else{
                regex.lastIndex = 0;
                match = regex.exec(item.price.replace(/[\t\n]/gi,""));
                item.price = match[0];
        
                regex.lastIndex = 0;
                match = regex.exec(item.changeratio.replace(/[\t\n]/gi,""));
                item.changeratio = match[0];
        
                regex.lastIndex = 0;
                match = regex.exec(item.changeamount);
                if (item.changeratio.indexOf("-") > -1)
                    item.changeamount = "-" +  match[0];
                else
                    item.changeamount = match[0];
        
                // console.log(item);
                result = makeResult(code, item);
            }
        })
        .done(() => resolve(result));
    })
}

function getWorldGold(code){
    return new Promise((resolve, reject) => {
        let result;
        osmosis
        .get ('https://finance.naver.com/marketindex/worldGoldDetail.nhn?marketindexCd=' + code)    
        .set('name','//*[@id="container"]/div[1]/h2')    
        .set('price','//*[@id="content"]/div[1]/div[1]/p[1]/em')
        .set('changeamount','//*[@id="content"]/div[1]/div[1]/p[2]/em[1]')    
        .set('changeratio','//*[@id="content"]/div[1]/div[1]/p[2]/em[2]')        
        .data(item => {
            var match;
    
            if(!item.name){
                reject(new Error('Fail to scrape source'));
            }else{
                regex.lastIndex = 0;
                match = regex.exec(item.price.replace(/[\t\n]/gi,""));
                item.price = match[0];
        
                regex.lastIndex = 0;
                match = regex.exec(item.changeratio.replace(/[\t\n]/gi,""));
                item.changeratio = match[0];
        
                regex.lastIndex = 0;
                match = regex.exec(item.changeamount);
                if (item.changeratio.indexOf("-") > -1)
                    item.changeamount = "-" +  match[0];
                else
                    item.changeamount = match[0];
        
                // console.log(item);
                result = makeResult(code, item);
            }
        })
        .done(() => resolve(result));
    })
}

function makeResult(code, item){
    let result = {};

    result.code = code;
    result.name = item.name;
    result.price = parseFloat(item.price.replace(/\,/gi,""));
    result.changeamount = parseFloat(item.changeamount.replace(/\,/gi,""));
    result.changeratio = parseFloat(item.changeratio.replace(/\,/gi,""));

    return result;
}