import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDeleteCateMutation, useGetCatesQuery } from '../../services/category'

type Props = {}

const Categories = (props: Props) => {
    const [deleteCate] = useDeleteCateMutation()
    const { data: categories, isLoading, error } = useGetCatesQuery()
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
                        <table className="table table-bordered" width="100%">
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
                                {categories ? categories.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="checkbox" name="" id="" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td className=''>
                                            <button className='btn btn-danger text mr-2'
                                                onClick={() => {
                                                    const confirm = window.confirm("Are you sure?")
                                                    if (confirm) {
                                                        deleteCate(item.id)
                                                    }
                                                }}
                                            >
                                                Remove
                                            </button>
                                            <NavLink to={`/admin/category/${item.id}/edit`}>
                                                <button className='btn btn-success'>Edit</button>
                                            </NavLink>
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