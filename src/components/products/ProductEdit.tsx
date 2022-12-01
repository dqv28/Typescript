import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hook'
import { IProduct } from '../../interfaces/product'
import { useEditProductMutation, useGetProductQuery } from '../../services/product'
import { fetchProduct } from '../../slices/product'

const ProductEdit = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IProduct>()
    const { data: product } = useGetProductQuery(parseInt(id as string))
    useEffect(() => {
        reset(product as IProduct)
    }, [product])

    const [editProduct, { isLoading }] = useEditProductMutation()
    const onHandleEdit: SubmitHandler<IProduct> = (product: IProduct) => {
        try {
            editProduct(product)
            navigate('/admin/products')
        } catch (error) { }
    }
    return (
        <>
            <div className='w-75 mx-auto'>
                <h2>Update Product Form</h2>
                <form onSubmit={handleSubmit(onHandleEdit)} encType='multipart/form-data'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control"
                            {...register("name", { required: true, minLength: 5 })} />
                        {errors.name && errors.name.type === "required" && <span className='text-danger'>This field is required.</span>}
                        {errors.name && errors.name.type === "minLength" && <span className='text-danger'>This field must be 5 charaters.</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                        <input type="file" className="form-control"
                            {...register("imgUrl")} />
                        {/* <img src={product.imgUrl} /> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
                        <input type="text" className="form-control"
                            {...register("price", { required: true, valueAsNumber: true })} />
                        {errors.price && errors.price.type === "required" && <span className='text-danger'>This field is required.</span>}
                        {errors.price && errors.price.type === "valueAsNumber" && <span className='text-danger'>This field is not number.</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Category</label>
                        <input type="text" className="form-control"
                            {...register("category", { required: true, minLength: 5 })} />
                        {errors.category && errors.category.type === "required" && <span className='text-danger'>This field is required.</span>}
                        {errors.category && errors.category.type === "minLength" && <span className='text-danger'>This field must be 5 charaters.</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Descrition</label>
                        <input type="text" className="form-control"
                            {...register("desc", { required: true, minLength: 10 })} />
                        {errors.desc && errors.desc.type === "required" && <span className='text-danger'>This field is required.</span>}
                        {errors.desc && errors.desc.type === "minLength" && <span className='text-danger'>This field must be 10 charaters.</span>}
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary mr-2">Update</button>
                        <NavLink to={'/admin/products'}>
                            <button type="button" className="btn btn-primary">Back</button>
                        </NavLink>
                    </div>
                </form>
            </div>

        </>
    )
}

export default ProductEdit