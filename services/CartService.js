const crypto = require("crypto");

class CartService {
  constructor(db) {
    this.db = db.sequelize;
    this.Cart = db.Cart;
    this.CartItem = db.CartItem;
    this.Order = db.Order;
    this.OrderItem = db.OrderItem;
    this.Product = db.Product;
    this.Membership = db.Membership;
    this.User = db.User;
  }

  async getCart(userId) {
    const cart = await this.Cart.findOne({
      where: { userId, status: "active" },
      include: [{ model: this.CartItem, include: [this.Product] }],
    });
    return cart;
  }

  async addToCart(userId, productId, quantity) {
    const product = await this.Product.findByPk(productId);

    if (!product || product.quantity < quantity) {
      throw new Error(
        `${product.name} is not available or not enough product in stock`
      );
    }
    ` `;

    let cart = await this.Cart.findOne({ where: { userId, status: "active" } });

    if (!cart) {
      cart = await this.Cart.create({ userId, status: "active" });
    }

    let cartItem = await this.CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      if (product.quantity < cartItem.quantity + quantity) {
        throw new Error(
          `Cannot add ${quantity} more of ${product.name}. Insufficient stock available.`
        );
      }
      cartItem.quantity += quantity;
    } else {
      cartItem = await this.CartItem.create({
        cartId: cart.id,
        productId,
        quantity,
        unitPrice: product.price,
      });
    }

    await cartItem.save();
    return cartItem;
  }

  async checkoutCart(userId) {
    const cart = await this.Cart.findOne({
      where: { userId, status: "active" },
      include: [{ model: this.CartItem, include: [this.Product] }],
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    if (cart.CartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    let totalAmount = 0;
    for (const item of cart.CartItems) {
      const product = await this.Product.findByPk(item.productId);

      if (product.quantity < item.quantity) {
        throw new Error(`Not enough stock for product ${product.name}`);
      }

      product.quantity -= item.quantity;
      await product.save();
      totalAmount += item.unitPrice * item.quantity;
    }

    await this.updateUserMembership(userId);

    const updatedUser = await this.User.findByPk(userId, {
      include: [this.Membership],
    });

    const discount = updatedUser.Membership
      ? updatedUser.Membership.discount
      : 0;

    const discountedTotalAmount = totalAmount * (1 - discount);

    const generateOrderNumber = () => {
      return crypto.randomBytes(4).toString("hex").substring(0, 8);
    };
    const orderNumber = generateOrderNumber();

    const order = await this.Order.create({
      userId,
      totalAmount: discountedTotalAmount,
      status: "In Progress",
      membershipDiscount: discount,
      membershipStatus: updatedUser.Membership.name,
      orderNumber,
    });

    await Promise.all(
      cart.CartItems.map((item) =>
        this.OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })
      )
    );

    await this.Cart.update({ status: "completed" }, { where: { id: cart.id } });

    updatedUser.purchaseCount += cart.CartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    await updatedUser.save();

    return order;
  }

  async updateUserMembership(userId) {
    // Find the user by ID
    const user = await this.User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Get all membership levels, ordered by purchaseCount ascending
    const memberships = await this.Membership.findAll({
      order: [["purchaseCount", "ASC"]],
    });

    // If no memberships are found, throw an error
    if (!memberships || memberships.length === 0) {
      throw new Error("No memberships found");
    }

    // Find the highest membership the user qualifies for
    let newMembershipId = user.MembershipId;

    memberships.forEach((membership) => {
      if (user.purchaseCount >= membership.purchaseCount) {
        newMembershipId = membership.id;
      }
    });

    // If the user's membership level has changed, update it
    if (newMembershipId !== user.MembershipId) {
      user.MembershipId = newMembershipId;
      await user.save();
    }
  }

  async updateCartItem(userId, productId, quantity) {
    const cart = await this.Cart.findOne({
      where: { userId, status: "active" },
    });

    const cartItem = await this.CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    cartItem.quantity = quantity;

    await cartItem.save();

    return cartItem;
  }

  async removeCartItem(userId, productId) {
    const cart = await this.Cart.findOne({
      where: { userId, status: "active" },
    });

    if (!cart) throw new Error("Cart not found");

    const cartItem = await this.CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!cartItem) throw new Error("Cart item was not found");

    await cartItem.destroy();

    return cartItem;
  }
}
module.exports = CartService;
