import mongoose from 'mongoose';
import reqStr from '../constants/reqStr.js';
const { Schema, model, SchemaTypes } = mongoose;
const guildConfigSchema = model(
	'guildConfigSchema',
	new Schema({
		guildId: reqStr,
		welcomeChannelId: SchemaTypes.String,
	})
);

export default guildConfigSchema;
