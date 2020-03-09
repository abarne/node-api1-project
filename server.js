const express = require('express');
const server = express();

server.use(express.json());

const port = 8000;

let users = [];
let currentId = 1;

server.get('/', (req, res) => {
	res.json({ message: 'Server is running' });
});

server.post('/api/users', (req, res) => {
	if (!req.body.name || !req.body.bio) {
		res.status(400).json({ errorMessage: 'Please provide name and bio for new user.' });
	} else {
		const newUser = {
			id: currentId,
			name: req.body.name,
			bio: req.body.bio
		};
		currentId += 1;

		users.push(newUser);
		res.status(200).json({ message: 'User added successfully!', user: newUser });
	}
});

server.get('/api/users', (req, res) => {
	res.status(200).json(users);
});

server.get('/api/users/:id', (req, res) => {
	let _id = +req.params.id;

	const user = users.find(({ id }) => id === _id);
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(400).json({ message: 'User not found' });
	}
});

server.delete('/api/users/:id', (req, res) => {
	let _id = +req.params.id;
	const user = users.find(({ id }) => id === _id);
	if (!user) {
		res.status(400).json({ message: 'User not found.' });
	} else {
		users = users.filter((item) => item.id !== _id);
		res.status(200).json({ message: 'Successfully deleted user', user: user });
	}
});

server.patch('/api/users/:id', (req, res) => {
	if (!req.body.name || !req.body.bio) {
		res.status(400).json({ message: 'Please provide a name and bio.' });
	} else {
		let _id = +req.params.id;
		const user = users.find(({ id }) => id === _id);
		if (user) {
			const indexOfUser = users.indexOf(user);
			const newUser = {
				id: user.id,
				name: req.body.name,
				bio: req.body.bio
			};
			users[indexOfUser] = newUser;
			res.status(200).json(newUser);
		} else {
			res.status(400).json({ message: 'User not found.' });
		}
	}
});

server.listen(port, () => console.log(`\n=== API on port ${port}===\n`));
