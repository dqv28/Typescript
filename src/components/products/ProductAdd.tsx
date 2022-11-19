import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, redirect } from 'react-router-dom'
import { useAppDispatch } from '../../app/hook'
import { IProduct } from '../../interfaces/product'
import { useAddProductMutation } from '../../services/product'
import { addProduct } from '../../slices/product'

const ProductAdd = () => {
    const [addProduct, { isLoading }] = useAddProductMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<IProduct>()
    const onHandleAdd: SubmitHandler<IProduct> = (product: IProduct) => {
        redirect('/products')
        addProduct(product)

    }

    return (
        <div>
            <div className='w-75 mx-auto'>
                <h2>Add Product Form</h2>
                <form onSubmit={handleSubmit(onHandleAdd)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control"
                            {...register("name", { required: true, minLength: 5 })} />
                        {errors.name && errors.name.type === "required" && <span className='text-danger'>This field is required.</span>}
                        {errors.name && errors.name.type === "minLength" && <span className='text-danger'>This field must be 5 charaters.</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
                        <input type="text" className="form-control"
                            {...register("price", { required: true, valueAsNumber: true })} />
                        {errors.price && errors.price.type === "required" && <span className='text-danger'>This field is required.</span>}
                        {errors.price && errors.price.type === "valueAsNumber" && <span className='text-danger'>This field is not number.</span>}
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary mr-2">Add</button>
                        <NavLink to={'/products'}>
                            <button type="button" className="btn btn-primary">Back</button>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductAdd