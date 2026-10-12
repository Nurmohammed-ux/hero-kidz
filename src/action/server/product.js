"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getProducts = async () => {
  const products = await dbConnect(collections.PRODUCTS).find().toArray();
  
  // Convert MongoDB ObjectId to string for every product
  return products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));
};

export const getSingleProduct = async (id) => {
  if (!id || id.length !== 24) {
    return null;
  }

  try {
    const query = { _id: new ObjectId(id) };
    const product = await dbConnect(collections.PRODUCTS).findOne(query);
    
    if (!product) return null;

    // Convert MongoDB ObjectId to string for the single product
    return {
      ...product,
      _id: product._id.toString(),
    };
  } catch (error) {
    return null;
  }
};
