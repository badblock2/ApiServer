const should = require('should');
const request = require('supertest');
const app = require('../../app');
const syncDatabase = require('../../../bin/sync-database')
const models = require('../../models/models');

describe('Testing users API', () => {

    describe('GET /users', () => {
        before('sync database', (done) => {
            syncDatabase().then(() => done());
        });

        const users = [
            {name: 'alice'},
            {name: 'bek'},
            {name: 'chris'}
        ];

        before('insert 3 users into database', (done) => {
            models.User.bulkCreate(users).then(()=> done());
        });
        
        it('shold return 200 status code', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                });
        });

        it('should return Array', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .end((err,res) => {
                    if (err) throw err;
                    res.body.should.be.an.instanceof(Array).and.have.length(3);
                    res.body.map(user => {
                        user.should.have.properties('id', 'name');
                        user.id.should.be.a.Number();
                        user.name.should.be.a.String();
                    });
                    done();
                });
        });

        after('clean up database', (done) => {
            syncDatabase().then( () => done());
        });
    })

    describe('POST /users', () => {
        it('should return 201 status code', (done) => {
            request(app)
                .post('/users')
                .send({
                    name: 'badblock'
                })
                .expect(201)
                .end((err,res) => {
                    if (err) throw err;
                    done();
                })
        })
    })

    describe('PUT /users/:id', () => {
        it('should return 200 status code', (done) => {
            request(app)
                .put('/users/1')
                .send({
                    name: 'badblock2'
                })
                .expect(200)
                .end((err,res) => {
                    if (err) throw err;
                    done();
                });
        });
    })

    describe('GET /users/:id', () => {
        it('should return 200 status code', (done) => {
            request(app)
                .get('/users/1')
                .expect(200)
                .end((err,res) => {
                    if (err) throw err;                    
                    res.body.should.have.properties('id', 'name');
                    res.body.id.should.be.a.Number();
                    res.body.name.should.be.a.String();
                    res.body.name.should.be.equal('badblock2');
                    done();
                })
        })
    })

    describe('DELETE /users/:id', () => {
        it('should return 204 status code', (done) => {
            request(app)
                .delete('/users/1')                
                .expect(204)
                .end((err,res) => {
                    if (err) throw err;
                    done();
                })
        })
    })

})