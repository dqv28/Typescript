import axios from "axios"
import { IProduct } from "../interfaces/product"
import instance from "./config"

export const getProducts = async () => {
    return await instance.get("/products")
}
export const getProduct = async (id: number) => {
    return await instance.get("/products/" + id)
}
export const createProduct = async (product: IProduct) => {
    return await instance.post("/products", product)
}
export const updateProduct = async (product: IProduct) => {
    return await instance.put(`/products/${product.id}`, product)
}
export const deleteProduct = async (id: number) => {
    return await instance.delete("/products/" + id)
}