import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';

function ProductsScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {};
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }));
    };
    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    };
    return (
        <div>
        {
            !(userInfo && userInfo.isAdmin) && props.history.push("/signin") ||
            (userInfo && userInfo.isAdmin) &&
            <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button onClick={ () => openModal({}) } className="button primary">Create Product</button>
            </div>

            {   modalVisible &&
                <div className="form">
                    <form onSubmit={submitHandler} >
                        <ul className="form-container">
                            <li>
                                <h2>Create Product</h2>
                            </li>
                            <li>
                                { loadingSave && <div>Loading...</div> }
                                { errorSave && <div>{ errorSave }</div> }
                            </li>
                            <li>
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" value={name} id="name"  onChange={(e) => setName(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="price">Price</label>
                                <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="image">Image</label>
                                <input type="text" name="image" value={image}  id="image" onChange={(e) => setImage(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="brand">Brand</label>
                                <input type="text" name="brand" value={brand}  id="brand" onChange={(e) => setBrand(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="countInStock">Count In Stock</label>
                                <input type="text" name="countInStock" value={countInStock}  id="countInStock" onChange={(e) => setCountInStock(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="category">Category</label>
                                <input type="text" name="category" value={category}  id="category" onChange={(e) => setCategory(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="description">Description</label>
                                <textarea name="description" value={description}  id="description" onChange={(e) => setDescription(e.target.value)}> </textarea>
                            </li>
                            <li>
                                <button type="submit" className="button primary">{ id ? "Update Product":"Create Product" }</button>
                            </li>
                            <li>
                                <button type="button" onClick={ () => setModalVisible(false) } className="button secondary">Back</button>
                            </li>
                        </ul>
                    </form>
                </div>
            }
            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <button onClick={ () => openModal(product) } className="button secondary">Edit</button>
                                        {'  '}
                                        <button onClick={ () => deleteHandler(product) } className="button secondary">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        }
        </div>
    );
}

export default ProductsScreen;