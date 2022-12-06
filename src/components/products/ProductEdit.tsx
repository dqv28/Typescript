import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { upload } from '../../api/product'
import { IProduct } from '../../interfaces/product'
import { useGetCatesQuery } from '../../services/category'
import { useEditProductMutation, useGetProductQuery } from '../../services/product'

const ProductEdit = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IProduct>()
    const { data: categories } = useGetCatesQuery()
    const { data } = useGetProductQuery(parseInt(id as string))
    useEffect(() => {
        reset(data as IProduct)
    }, [data])

    const [editProduct, { isLoading }] = useEditProductMutation()
    const onHandleEdit: SubmitHandler<IProduct> = async (product: IProduct) => {
        try {
            const formData = new FormData()
            formData.append('file', product.imgUrl[0])
            formData.append('upload_preset', 'dmjlzwse')
            formData.append('cloud_name', 'dywccbjry')
            const filePath = document?.querySelector<HTMLInputElement>('#filePath')

            let imgPath
            if (filePath?.value !== '') {
                const image = await upload(formData)
                imgPath = image.url
            } else {
                imgPath = product.imgUrl
            }

            editProduct({ ...product, imgUrl: imgPath })
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
                        <input type="file" id='filePath' className="form-control"
                            {...register("imgUrl")} />
                        <img id='urlPath' className='h-25 w-25' src={data?.imgUrl} />
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
                            {categories?.map((item, index) => (
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