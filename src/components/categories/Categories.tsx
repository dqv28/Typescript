import React from 'react'
import { NavLink } from 'react-router-dom'
import { ICategory } from '../../interfaces/category'
import { useDeleteCateMutation, useGetCatesQuery } from '../../services/category'
import { useEditProductMutation, useGetProductsQuery } from '../../services/product'

type Props = {}

const Categories = (props: Props) => {
    const [deleteCate] = useDeleteCateMutation()
    const [updateProduct] = useEditProductMutation()
    const { data: categories, isLoading, error }: any = useGetCatesQuery()
    const { data: products }: any = useGetProductsQuery()
    const onHandleDelete = (cate: ICategory) => {
        const confirm = window.confirm("Are you sure?")
        if (confirm) {
            products.forEach((product: any) => {
                if (product.category !== cate.name) {
                    return deleteCate(cate.id)
                } else {
                    return updateProduct({ ...product, category: 'Unclassified' })
                }
            })
        }
    }
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
        <>
            {/* Page Heading */}
            <div className='d-flex justify-content-between align-items-center'>
                <h1 className="h3 my-3 text-gray-800">Category Manage Table</h1>
                <NavLink to={`/admin/category-add`}>
                    <button className="btn btn-primary btn-icon-split">
                        <span className="icon text-white-50">
                            <i className="fas fa-plus"></i>
                        </span>
                        <span className="text">Add New Category</span>
                    </button>
                </NavLink>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="{0}">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" name="" id="" />
                                    </th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? categories.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="checkbox" name="" id="" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td className=''>
                                            {item.name !== "Unclassified" ?
                                                <div>
                                                    <button className='btn btn-danger text mr-2'
                                                        onClick={() => onHandleDelete(item)}>
                                                        Remove
                                                    </button>
                                                    <NavLink to={`/admin/category/${item.id}/edit`}>
                                                        <button className='btn btn-success'>Edit</button>
                                                    </NavLink>
                                                </div> :
                                                <div>
                                                    <span className='text-success px-2 py-1 border border-success rounded'>Default</span>
                                                </div>
                                            }


                                        </td>
                                    </tr>
                                )) : <tr className="odd"><td valign="top" colSpan={6} className="dataTables_empty">No data available in table.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories