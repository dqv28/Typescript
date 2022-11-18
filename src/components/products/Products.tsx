import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { IProduct } from '../../interfaces/product';
import { fetchProducts, removeProduct } from '../../slices/product';

const Products = () => {
    const dispatch = useAppDispatch();
    const products: IProduct[] = useAppSelector((state: any) => state.products.value)
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const onHandleRemove = (id: number): void => {
        const confirm = window.confirm('Are you sure?')
        if (confirm) {
            dispatch(removeProduct(id))
        }
    }

    return (
        <>
            {/* Page Heading */}
            <div className='d-flex justify-content-between align-items-center'>
                <h1 className="h3 my-3 text-gray-800">Products Manage Table</h1>
                <NavLink to={`/product-add`}>
                    <a href="#" className="btn btn-primary btn-icon-split">
                        <span className="icon text-white-50">
                            <i className="fas fa-plus"></i>
                        </span>
                        <span className="text">Add New Product</span>
                    </a>
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
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {products.length > 0 ? products.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="checkbox" name="" id="" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>${item.price}</td>
                                        <td>
                                            <img src="" alt="" />
                                        </td>
                                        <td>Desc</td>
                                        <td>
                                            <button className='btn btn-danger text'
                                                onClick={() => onHandleRemove(item.id)}>
                                                Remove
                                            </button>
                                            <NavLink to={`/product/${item.id}/edit`}>
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