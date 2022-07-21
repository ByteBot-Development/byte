import mongoose from 'mongoose';
import reqStr from '../constants/reqStr.js';
const { Schema, model, SchemaTypes } = mongoose;
const guildConfigSchema = model(
	'guildConfigSchema',
	new Schema({
		guildId: {
			type: SchemaTypes.String,
			required: true,
			unique: true,
		},
		welcomeChannelId: {
			type: SchemaTypes.String,
			required: false,
		},
		modmailCategory: {
			type: SchemaTypes.String,
			required: false,
		},
	})
);

export default guildConfigSchema;
