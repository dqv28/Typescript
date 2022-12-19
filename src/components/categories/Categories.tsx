import { Alert, message, Popconfirm, Space, Spin } from 'antd'
import { MessageType } from 'antd/es/message/interface'
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
    const text = 'Are you sure to delete this category?';
    const onHandleRemove = (cate: ICategory) => {
        const confirm: MessageType = message.info('Remove successfully.');
        if (confirm !== null) {
            products.forEach((product: any) => {
                if (product.category !== cate.name) {
                    return deleteCate(cate.id)
                } else {
                    return updateProduct({ ...product, category: 'Unclassified' })
                }
            })
        }
    }
    if (isLoading)
        return <Space direction="vertical" style={{ width: '100%' }}>
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        </Space>
    if (error)
        return <Space direction="vertical" style={{ width: '100%' }}>
            <Alert message="Error!!!" type="error" />
        </Space>

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
                                                    <Popconfirm placement="top"
                                                        title={text}
                                                        onConfirm={() => onHandleRemove(item)}
                                                        okText="Yes"
                                                        cancelText="No">
                                                        <button className='btn btn-danger text mr-2'>Remove</button>
                                                    </Popconfirm>
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