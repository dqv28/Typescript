import { useState } from 'react'
import { IProduct } from '../interfaces/product'
import AddTodo from './AddTodo'
import ListTodo from './ListTodo'

type Props = {}

const Todo = (props: Props) => {
    const [products, setProducts] = useState<IProduct[]>([
        { id: 1, name: 'Product A', price: 20 },
        { id: 2, name: 'Product B', price: 30 },
        { id: 3, name: 'Product C', price: 40 },

    ])

    const onHandleAdd = () => {

    }
    return (
        <>
            <AddTodo addTodo={onHandleAdd} />
            <ListTodo products={products} />
        </>
    )
}

export default Todo