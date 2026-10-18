import { getCart } from "@/action/server/cart";
import Checkout from "@/components/layouts/Checkout";

const CheckoutPage = async () => {
  const rawCartItems = await getCart();

  // Convert MongoDB ObjectId to string to prevent Client Component serialization warnings
  const cartItems = rawCartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
    productId: item.productId ? item.productId.toString() : item._id.toString(),
  }));
  return (
    <div>
      <Checkout cartItems={cartItems} />
    </div>
  );
};

export default CheckoutPage;
