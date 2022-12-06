import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { upload } from '../../api/product'
import { IProduct } from '../../interfaces/product'
import { useGetCatesQuery } from '../../services/category'
import { useAddProductMutation } from '../../services/product'

const ProductAdd = () => {
    const navigate = useNavigate()
    const [addProduct, { isLoading }] = useAddProductMutation()
    const { data } = useGetCatesQuery()
    const { register, handleSubmit, formState: { errors } } = useForm<IProduct>()
    const onHandleAdd: SubmitHandler<IProduct> = async (product: IProduct) => {
        try {
            const formData = new FormData()
            formData.append('file', product.imgUrl[0])
            formData.append('upload_preset', 'dmjlzwse')
            formData.append('cloud_name', 'dywccbjry')
            const image = await upload(formData)
            addProduct({ ...product, imgUrl: image.url })
            navigate('/admin/products')
        } catch (error) { }
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
                        <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                        <input type="file" className="form-control"
                            {...register("imgUrl", { required: true })} />
                        {errors.imgUrl && errors.imgUrl.type === "required" && <span className='text-danger'>This field is required.</span>}
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
                        <select className="form-control"
                            aria-label="Default select example"
                            {...register('category', { required: true })}>
                            <option value={'0'}>Select Category</option>
                            {data?.map((item, index) => (
                                <option key={index} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                        {errors.category && errors.category.type === "required" && <span className='text-danger'>Please choose a catgory.</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Descrition</label>
                        <input type="text" className="form-control"
                            {...register("desc", { required: true, minLength: 5 })} />
                        {errors.desc && errors.desc.type === "required" && <span className='text-danger'>This field is required.</span>}
                        {errors.desc && errors.desc.type === "minLength" && <span className='text-danger'>This field must be 5 charaters.</span>}
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary mr-2">Add</button>
                        <NavLink to={'/admin/products'}>
                            <button type="button" className="btn btn-primary">Back</button>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductAdd