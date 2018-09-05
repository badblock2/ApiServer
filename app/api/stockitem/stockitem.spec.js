const should = require('should');
const request = require('supertest');
const app = require('../../app');
const syncDatabase = require('../../../bin/sync-database')
const models = require('../../models/models');

describe('Testing StockItem API', () => {

    describe('GET /stockitems', () => {
        before('sync database', (done) => {
            syncDatabase().then(() => done());
        });

        const stockitems = [
            {Code: '068270'},
            {Code: '001820'},
            {Code: '086520'}
        ];

        before('insert 3 stockitems into database', (done) => {
            models.StockItem.bulkCreate(stockitems).then(()=> done());
        });
        
        it('shold return 200 status code', (done) => {
            request(app)
                .get('/stockitems')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                });
        });

        it('should return Array', (done) => {
            request(app)
                .get('/stockitems')
                .expect(200)
                .end((err,res) => {
                    if (err) throw err;
                    res.body.should.be.an.instanceof(Array).and.have.length(3);
                    res.body.map(Stock => {
                        Stock.should.have.properties('Code');
                        Stock.Code.should.be.a.String();
                    });
                    done();
                });
        });

        after('clean up database', (done) => {
            syncDatabase().then( () => done());
        });
    })

    describe('POST /stockitems', () => {
        it('should return 201 status code', (done) => {
            request(app)
                .post('/stockitems/041510')
                .send({
                    name: '에스엠'
                })
                .expect(201)
                .end((err,res) => {
                    if (err) throw err;
                    done();
                })
        })
    })

    // describe('PUT /stockitems/:code', () => {
    //     it('should return 200 status code', (done) => {
    //         request(app)
    //             .put('/stockitems/041510')
    //             .send({
    //                 name: '에스엠'
    //             })
    //             .expect(200)
    //             .end((err,res) => {
    //                 if (err) throw err;
    //                 done();
    //             });
    //     });
    // })

    describe('GET /stockitems/:code', () => {
        it('should return 200 status code', (done) => {
            request(app)
                .get('/stockitems/041510')
                .expect(200)
                .end((err,res) => {
                    if (err) throw err;                    
                    res.body.should.have.properties('Code', 'Name');
                    res.body.Code.should.be.a.String();
                    res.body.Name.should.be.a.String();
                    res.body.Name.should.be.equal('에스엠');
                    done();
                })
        })
    })

    describe('DELETE /stockitems/:code', () => {
        it('should return 204 status code', (done) => {
            request(app)
                .delete('/stockitems/041510')                
                .expect(204)
                .end((err,res) => {
                    if (err) throw err;
                    done();
                })
        })
    })

})