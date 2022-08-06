// const { connect } = require('mongoose');
import mongoose from 'mongoose';

async function connectDatabase() {
	await mongoose
		.connect(process.env.MONGO_URI)
		.then(() => console.log('Connected to Database!'))
		.catch((err) => console.error(err));
}

export default connectDatabase;
