const should = require('should');
const request = require('supertest');
const app = require('../../app');
const syncDatabase = require('../../../bin/sync-database')
const models = require('../../models/models');

describe('Testing MarketIndex API', () => {

    describe('GET /marketindices', () => {
        before('sync database', (done) => {
            syncDatabase().then(() => done());
        });

        const marketindices = [
            {Code: 'KOSPI'},
            {Code: 'FUT'},
            {Code: 'FX_USDKRW'}
        ];

        before('insert 3 stocks into database', (done) => {
            models.MarketIndex.bulkCreate(marketindices).then(()=> done());
        });
        
        it('shold return 200 status code', (done) => {
            request(app)
                .get('/marketindices')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                });
        });

        it('should return Array', (done) => {
            request(app)
                .get('/marketindices')
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

    describe('POST /marketindices', () => {
        it('should return 201 status code', (done) => {
            request(app)
                .post('/marketindices/OIL_CL')
                .send({
                    name: 'WTI(서부텍사스유)'
                })
                .expect(201)
                .end((err,res) => {
                    if (err) throw err;
                    done();
                })
        })
    })

    // describe('PUT /marketindices/:code', () => {
    //     it('should return 200 status code', (done) => {
    //         request(app)
    //             .put('/marketindices/OIL_CL')
    //             .send({
    //                 name: 'WTI(서부텍사스유)
    //             })
    //             .expect(200)
    //             .end((err,res) => {
    //                 if (err) throw err;
    //                 done();
    //             });
    //     });
    // })

    describe('GET /marketindices/:code', () => {
        it('should return 200 status code', (done) => {
            request(app)
                .get('/marketindices/OIL_CL')
                .expect(200)
                .end((err,res) => {
                    if (err) throw err;                    
                    res.body.should.have.properties('Code', 'Name');
                    res.body.Code.should.be.a.String();
                    res.body.Name.should.be.a.String();
                    res.body.Name.should.be.equal('WTI(서부텍사스유)');
                    done();
                })
        })
    })

    describe('DELETE /marketindices/:code', () => {
        it('should return 204 status code', (done) => {
            request(app)
                .delete('/marketindices/OIL_CL')                
                .expect(204)
                .end((err,res) => {
                    if (err) throw err;
                    done();
                })
        })
    })

})