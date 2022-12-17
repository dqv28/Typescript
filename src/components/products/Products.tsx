import { Alert, message, Popconfirm, Space, Spin, Table } from 'antd';
import { MessageType } from 'antd/es/message/interface';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { IProduct } from '../../interfaces/product';
import { useGetCatesQuery } from '../../services/category';
import { useGetProductsQuery, useRemoveProductMutation } from '../../services/product';
import { filterByCate, searchByKey } from '../../slices/product';

const Products = () => {
    const { Column, ColumnGroup } = Table;
    let products: IProduct[] = []
    const { data: productList, isLoading, error }: any = useGetProductsQuery(undefined)
    const { data: categories } = useGetCatesQuery()

    const text = 'Are you sure to delete this product?';
    const [deleteProduct] = useRemoveProductMutation()
    const onHandleRemove = (id: number) => {
        const confirm: MessageType = message.info('Remove successfully.');
        if (confirm !== null) {
            deleteProduct(id)
        }
    }

    const dispatch = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState("");
    const [cate, setCate] = useState("");

    const onHandleInput = (e: any) => {
        setSearchTerm(e.target.value);
    }
    const onHandleSelect = (e: any) => {
        setCate(e.target.value);
    }

    useEffect(() => {
        if (searchTerm) {
            dispatch(searchByKey(searchTerm));
        } else if (cate) {
            dispatch(filterByCate(cate));
        }
    }, []);

    const { filteredProducts }: any = useAppSelector((state: any) => state.filteredProducts || []);
    if (searchTerm === '') {
        products = productList
    } else {
        products = filteredProducts
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
                <h1 className="h3 my-3 text-gray-800">Products Manage Table</h1>
                <NavLink to={`/admin/product-add`}>
                    <button className="btn btn-primary btn-icon-split">
                        <span className="icon text-white-50">
                            <i className="fas fa-plus"></i>
                        </span>
                        <span className="text">Add New Product</span>
                    </button>
                </NavLink>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    <div className='d-flex justify-content-between align-items-center'>
                        <label className="d-flex align-items-center w-25 mb-3">
                            <span className='mx-2'>Search: </span>
                            <input type="search"
                                className="form-control form-control-sm"
                                aria-controls="dataTable"
                                onChange={onHandleInput}
                                value={searchTerm} />
                        </label>
                        <label className="d-flex align-items-center w-25 mb-3">
                            <span className='mx-2'>Filter: </span>
                            <select className="form-control form-control-sm"
                                aria-label="Default select example"
                                onChange={onHandleSelect}>
                                <option defaultValue={''}>Select a category</option>
                                {categories?.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </label>

                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" name="" id="" />
                                    </th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {products ? products.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="checkbox" name="" id="" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>${item.price}</td>
                                        <td className='w-25 h-25'>
                                            <img className='w-100 h-100' src={item.imgUrl} alt="" />
                                        </td>
                                        <td>{item.category}</td>
                                        <td>{item.desc}</td>
                                        <td className=''>
                                            <Popconfirm placement="top"
                                                title={text}
                                                onConfirm={() => onHandleRemove(item.id)}
                                                okText="Yes"
                                                cancelText="No">
                                                <button className='btn btn-danger text mr-2'>Remove</button>
                                            </Popconfirm>
                                            <NavLink to={`/admin/product/${item.id}/edit`}>
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

export default Products