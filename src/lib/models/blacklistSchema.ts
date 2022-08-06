import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const blacklistSchema = model(
	'blacklistSchema',
	new Schema({
		userId: {
			type: Array,
			required: true,
		},
		client: {
			type: String,
		}
	})
);

export default blacklistSchema;