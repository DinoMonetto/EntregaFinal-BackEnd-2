// src/models/cart.model.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
  products: [ 
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  status: {
    type: String,
    enum: ['active', 'processing', 'completed'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingInfo: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
});

cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
