import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reactionRoleSchema = new model(
    'reactionRoleSchema',
    new Schema({
        guild: String,
        message: Object,
        customId: String
    })
)

export default reactionRoleSchema;