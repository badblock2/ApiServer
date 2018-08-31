const models = require('../../models/models');

exports.index = (req, res) => {
    models.User.findAll()
        .then(users => res.json(users));
}

exports.show = (req, res) => {    
    const id = parseInt(req.params.id,10);
    if (!id){
        return res.status(400).json({error: 'Invalid id'});
    }
    
    models.User.findOne({
        where:{
            id: id
        }
    }).then(user => {
        if (!user){
            return res.status(400).json({error: 'Invalid Id'});
        }

        return res.json(user);
    });
}

exports.destroy = (req, res) => {
    const id = parseInt(req.params.id,10);
    if (!id){
        return res.status(400).json({error: 'Invalid id'});
    }
    
    models.User.destroy({
        where: {
            id: id
        }
    }).then(() => {
        console.log('user destroy : ' + id);
        res.status(204).send()
    });
}

exports.create = (req, res) => {
    const name = req.body.name || '';
    if (!name.length){
        return res.status(400).json({error: 'Invalid name'});
    }

    models.User.create({
        name: name
    }).then((user) => {
        console.log('user create : ' + name);
        res.status(201).json(user)
    });
}

exports.update = (req, res) => {
    const id = parseInt(req.params.id,10);
    if (!id){
        return res.status(400).json({error: 'Invalid id'});
    }

    const name = req.body.name || '';
    if (!name.length){
        return res.status(400).json({error: 'Invalid name'});
    }

    models.User.update(
        {name: name,},
        {where: { id: id }}).then((user) => {
        console.log('user update (' + id + ') : ' + name);
        res.status(200).json(user);
    })
}