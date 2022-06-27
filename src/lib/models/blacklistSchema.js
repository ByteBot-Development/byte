import { model, Schema } from 'mongoose';
import reqStr from '../constants/reqStr';

const blacklistSchema = model(
	'blacklistSchema',
	new Schema({
		userId: {
			type: Array,
			required: true,
		},
	})
);
