"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});
exports.default = mongoose_1.model('Post', PostSchema);
