import { useState } from 'react'
import { IProduct } from '../interfaces/product'
import ItemTodo from './ItemTodo'

type ListProductProps = {
    products: IProduct[]
}

const ListTodo = ({ products }: ListProductProps) => {

    return (
        <>
            {products.map((item, index) =>
                <div key={index}>
                    <ItemTodo product={item} />
                </div>
            )}
        </>
    )
}

export default ListTodo