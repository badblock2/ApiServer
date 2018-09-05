const models = require('../../models/models');
const webscrape = require('../../modules/webscrape')

exports.index = (req, res) => {
    models.MarketIndex.findAll()
        .then(marketindices => res.json(marketindices));
}

exports.show = (req, res) => {    
    const code = req.params.code;
    if (!code){
        return res.status(400).json({error: 'Invalid code'});
    }
    
    models.MarketIndex.findOne({
        where:{
            Code: code
        }
    }).then(marketindex => {
        if (!marketindex){
            webscrape.getMarketIndex(code)
            .then(data => {
                console.log('marketindex is not exists. Add it to marketindex. ' + code);
                models.MarketIndex.create({
                    Code: data.code,
                    Name: data.name,
                    Price: data.price,
                    ChangeAmount: data.changeamount,
                    ChangeRatio: data.changeratio
                }).then((marketindex) => {
                    console.log('marketindex create : ' + code);
                    return res.status(201).json(marketindex)
                });                
            })
            .catch(err => {
                console.log(err + ':' + code);
                return res.status(500).json({Error: err + ':'+ code});
            });
        }else{
            return res.json(marketindex);
        }        
    });
}

exports.destroy = (req, res) => {
    const code = req.params.code;
    if (!code){
        return res.status(400).json({error: 'Invalid code'});
    }
    
    models.MarketIndex.destroy({
        where: {
            Code: code
        }
    }).then(() => {
        console.log('marketindex destroy : ' + code);
        res.status(204).send()
    });
}

exports.create = (req, res) => {
    const code = req.params.code;
    if (!code){
        return res.status(400).json({error: 'Invalid code'});
    }

    const name = req.body.name || '';

    console.log("Create : code:" + code + ",name:" + req.body.name);

    models.MarketIndex.create({
        Code: code,
        Name: name
    }).then((marketindex) => {
        console.log('marketindex create : ' + code);
        res.status(201).json(marketindex)
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