import mongoose, { Schema, models } from "mongoose";

const AgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  submitterName: {
    type: String,
    required: true,
  },
  submitterURL: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please provide a valid URL'],
  },
  logo: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one tag is required'
    }
  }
},{ timestamps: true });

const agSubmit = models.agsubmit || mongoose.model('agsubmit', AgentSchema);
export default agSubmit