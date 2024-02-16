const { model, Schema } = require('mongoose');
const bookSchema = new Schema(
    {
        title: {
            type: Schema.Types.String,
            required: [true, 'book title is required'],
            trim: true,
        },
        author: {
            type: Schema.Types.String,
            required: [true, 'author name is required'],
            trim: true,
        },
        publication: {
            type: Schema.Types.String,
            required: [true, 'publication is required'],
            trim: true,
        },
        publicationYear: {
            type: Schema.Types.String,
            required: [true, 'publication year is required'],
            trim: true,
        },
        category: {
            type: Schema.Types.String,
            required: [true, 'category is required'],
            trim: true,
        },
        summary: {
            type: Schema.Types.String,
            required: false,
            trim: true,
        },
        slug: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

bookSchema.index({ title: 'text' });
module.exports = model('books', bookSchema);
