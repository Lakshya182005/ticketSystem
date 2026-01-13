const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    authorRole: {
      type: String,
      enum: ["customer", "agent", "admin"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    isInternal: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("Comment", commentSchema);
