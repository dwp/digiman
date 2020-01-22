module.exports = (app) => {

    const bodyParser = require('body-parser');
    let session = require('express-session');
    const DIGIMAN_DEFINITIONS = {  
        'EXAMPLE_TYPE': require('./definition-EXAMPLE_TYPE-1.json')
    };
    let getEmptyState = (type, ver) => {
        let version = ver || 1;
        return {
            "agentTodoId": "111111-2222-3333-4444-555555555",
            "definitionType": type,
            "definitionVersion": version,
            "questionBlockData": []
        }
    };

    session.digimanDefinition = {};

    app.use(bodyParser.json());

    app.post('/digiman/state/:type', (req, res) => {
        session.digimanState = req.body;
        res.send('OK');
    });

    app.get('/digiman/state/:type', function(req, res) {
        session.digimanState = session.digimanState || getEmptyState(req.params.type, 1);
        res.send(session.digimanState);
    });

    app.get('/digiman/definition/:type/:version', function(req, res) {
        //you can have more than one version of definition of the same type - not used in this example
        let digimanDefinition = session.digimanDefinition[req.params.type] || DIGIMAN_DEFINITIONS[req.params.type];
        res.send(digimanDefinition);
    });

};