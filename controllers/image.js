const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: "e82b03c542694727a97a193bcfccbe5e"
});

const handleApiCall = (req, res) => {
	 app.models
    	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    	.then(data => {
    		res.json(data);
    	})
    	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImange = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)			//postgresql syntax (knex)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImange,
	handleApiCall
}