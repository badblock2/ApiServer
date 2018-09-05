const models = require('../../models/models');
const webscrape = require('../../modules/webscrape');

exports.index = (req, res) => {
    models.StockItem.findAll()
        .then(stockitemitems => res.json(stockitemitems));
}

exports.show = (req, res) => {    
    const code = req.params.code;
    if (!code){
        return res.status(400).json({error: 'Invalid code'});
    }

    models.StockItem.findOne({
        where:{
            Code: code
        }
    }).then(stockitem => {
        if (!stockitem){                        
            webscrape.getStockItem(code)
            .then(data => {                
                console.log('stockitem is not exists. Add it to stockitem. ' + code);
                models.StockItem.create({
                    Code: data.code,
                    Name: data.name,
                    Price: data.price,
                    ChangeAmount: data.changeamount,
                    ChangeRatio: data.changeratio
                }).then((stockitem) => {
                    console.log('stockitem create : ' + code);
                    return res.status(201).json(stockitem);
                });
            })
            .catch(err => {
                console.log(err + ':'+ code);
                return res.status(500).json({Error: err + ':'+ code});
            });            
        }else{            
            return res.json(stockitem);
        }        
    });
}

exports.destroy = (req, res) => {
    const code = req.params.code;
    if (!code){
        return res.status(400).json({error: 'Invalid code'});
    }
    
    models.StockItem.destroy({
        where: {
            Code: code
        }
    }).then(() => {
        console.log('stockitem destroy : ' + code);
        res.status(204).send()
    });
}

exports.create = (req, res) => {
    const code = req.params.code;
    if (!code){
        return res.status(400).json({error: 'Invalid code'});
    }

    const name = req.body.name || '';

    models.StockItem.create({
        Code: code,
        Name: name
    }).then((stockitem) => {
        console.log('stockitem create : ' + code);
        res.status(201).json(stockitem)
    });
}

exports.update = (req, res) => {
    return res.status(400).json({error: 'Not support.'});

    // const name = req.body.name || '';
    
    // models.User.update(        
    //     {Code: code, Name: name,},
    //     {where: { Code: code }}).then((user) => {
    //     console.log('user update (' + id + ') : ' + name);
    //     res.status(200).json(user);
    // })
}