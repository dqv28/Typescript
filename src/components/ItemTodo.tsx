import React from 'react'
import { IProduct } from '../interfaces/product'

type ItemProductProps = {
    product: IProduct
}

const ItemTodo = ({ product }: ItemProductProps) => {
    return (
        <>
            <div>
                {product.name}
                <button>Remove</button>
            </div>
        </>
    )
}

export default ItemTodo