import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { IProduct } from '../../interfaces/product'
import { editProduct, fetchProduct } from '../../slices/product'

const ProductEdit = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IProduct>()
    useEffect(() => {
        (async () => {
            const idP = parseInt(id as string)
            const data = await dispatch(fetchProduct(idP))
            const product = data.payload
            reset(product as IProduct)
        })()
    }, [])
    const onHandleEdit = (product: IProduct) => {
        dispatch(editProduct(product))

    }
    return (
        <div>
            <h2>Update Product Form</h2>
            <form onSubmit={handleSubmit(onHandleEdit)}>
                <input {...register('name', { required: true, minLength: 5 })} />
                {errors.name && errors.name.type === "required" && <span className='error'>This field is required.</span>}
                {errors.name && errors.name.type === "minLength" && <span className='error'>This field must be least 5 characters.</span>}
                <input {...register('price', { required: true, valueAsNumber: true })} />
                {errors.price && errors.price.type === "required" && <span className='error'>This field is required.</span>}
                {errors.price && errors.price.type === "valueAsNumber" && <span className='error'>This field is not number.</span>}

                <button type='submit'>Update</button>
                <button type='button'>
                    <NavLink to='/products'>Back</NavLink>
                </button>
            </form>
        </div>
    )
}

export default ProductEdit