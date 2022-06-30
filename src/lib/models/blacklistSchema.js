import { model, Schema } from 'mongoose';

const blacklistSchema = model(
	'blacklistSchema',
	new Schema({
		userId: {
			type: Array,
			required: true,
		},
	})
);
