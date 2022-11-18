import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../app/hook'
import { IProduct } from '../../interfaces/product'
import { addProduct } from '../../slices/product'

const ProductAdd = () => {
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm<IProduct>()
    const onHandleSubmit: SubmitHandler<IProduct> = (product: IProduct) => {
        dispatch(addProduct(product))

    }
    return (
        <div>
            <h2>Add Product Form</h2>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <input {...register('name', { required: true, minLength: 5 })} />
                {errors.name && errors.name.type === "required" && <span className='error'>This field is required.</span>}
                {errors.name && errors.name.type === "minLength" && <span className='error'>This field must be least 5 characters.</span>}
                <input {...register('price', { required: true, valueAsNumber: true })} />
                {errors.price && errors.price.type === "required" && <span className='error'>This field is required.</span>}
                {errors.price && errors.price.type === "valueAsNumber" && <span className='error'>This field is not number.</span>}

                <button type='submit'>Add</button>
                <button type='button'>
                    <NavLink to='/products'>Back</NavLink>
                </button>
            </form>
        </div>
    )
}

export default ProductAdd