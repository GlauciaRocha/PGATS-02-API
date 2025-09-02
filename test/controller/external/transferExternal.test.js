// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');

// Testes
describe('Transfer', () => {
    describe('POST /transfers', () => {
        beforeEach(async () => {
            // Limpar dados no servidor real antes de cada teste
            await request('http://localhost:3000')
                .post('/test/reset')
                .send();
            // Registrar usuário 'julio' antes do login
                const respostaRegistroJulio = await request('http://localhost:3000')
                    .post('/users/register')
                    .send({
                        username: 'julio',
                        password: '123456',
                        favorecidos: ['priscila']
                    });
                console.log('Registro julio:', respostaRegistroJulio.status, respostaRegistroJulio.body);

            // Registrar usuário 'priscila' (destinatário válido)
                const respostaRegistroPriscila = await request('http://localhost:3000')
                    .post('/users/register')
                    .send({
                        username: 'priscila',
                        password: '123456',
                        favorecidos: ['julio']
                    });
                console.log('Registro priscila:', respostaRegistroPriscila.status, respostaRegistroPriscila.body);

            const respostaLogin = await request('http://localhost:3000')
                .post('/users/login')
                .send({
                    username: 'julio',
                    password: '123456'
                });
                console.log('Login julio:', respostaLogin.status, respostaLogin.body);

            token = respostaLogin.body.token;
            console.log('Token de login:', token);
        });

        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "julio",
                    to: "isabelle",
                    value: 100
                });
            console.log('Resposta transferência (remetente/destinatário inexistentes):', resposta.status, resposta.body);
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
        });

        it('Usando Mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request("http://localhost:3000")
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "jose",
                    to: "isabelle",
                    value: 100
                });
            console.log('Resposta transferência (mocks remetente/destinatário inexistentes):', resposta.status, resposta.body);
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });

        it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "julio",
                    to: "priscila",
                    value: 100
                });
            console.log('Resposta transferência (valores válidos):', resposta.status, resposta.body);
            expect(resposta.status).to.equal(201);
            // Validação com um Fixture
            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosEuTenhoSucessoCom201Created.json')
            delete resposta.body.date;
            delete respostaEsperada.date; 
            expect(resposta.body).to.deep.equal(respostaEsperada);
        });
    });
});