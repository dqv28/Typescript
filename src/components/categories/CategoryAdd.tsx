import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { ICategory } from '../../interfaces/category'
import { useAddCateMutation } from '../../services/category'

const CategoryAdd = () => {
    const navigate = useNavigate()
    const [addCate, { isLoading }] = useAddCateMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<ICategory>()
    const onHandleAdd: SubmitHandler<ICategory> = async (cate: ICategory) => {
        try {
            addCate(cate)
            navigate('/admin/categories')
        } catch (error) { }
    }
    return (
        <div>
            <div className='w-75 mx-auto'>
                <h2>Add Category Form</h2>
                <form onSubmit={handleSubmit(onHandleAdd)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Category's Name</label>
                        <input type="text" className="form-control"
                            {...register("name", { required: true, minLength: 5 })} />
                        {errors.name && errors.name.type === "required" && <span className='text-danger'>This field is required.</span>}
                        {errors.name && errors.name.type === "minLength" && <span className='text-danger'>This field must be 5 charaters.</span>}
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary mr-2">Add</button>
                        <NavLink to={'/admin/categories'}>
                            <button type="button" className="btn btn-primary">Back</button>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryAdd