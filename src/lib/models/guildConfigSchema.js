import mongoose from 'mongoose';
const { Schema, model, SchemaTypes } = mongoose;

const _guildValues = {
	type: SchemaTypes.String,
	required: true,
	unique: true,
};
const _welcomeMsgSchema = new Schema({
	message: {
		type: SchemaTypes.String,
		required: true,
		default: `Hey {{@user}}! Welcome to the server, {{@servername}}!`,
	},
	channelId: {
		type: SchemaTypes.String,
		required: true,
		unique: true,
	},
});

const _suggestionsSchema = new Schema({
	channelId: {
		type: SchemaTypes.String,
		required: true,
		unique: true,
	},
});

const guildConfigSchema = model(
	'guildConfigSchema',
	new Schema({
		guildId: _guildValues,
		welcomeMsg: _welcomeMsgSchema,
		suggestions: _suggestionsSchema,
	})
);

export default guildConfigSchema;
