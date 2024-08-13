import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import './AddProducts.css';


function AddProducts() {
    let [categories, setCategories] = useState([]);
    let [data, setData] = useState([{ code: "", name: "", excerpt: "", category: "", price: Number }]);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        code: Yup.string().required("Product Code is required"),
        name: Yup.string().required("Product Name is required"),
        excerpt: Yup.string().required("Excerpt is required"),
        category: Yup.string().required("Category is required"),
        price: Yup.number().required("Price is required").positive("Price must be positive"),
    });

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/categories")
            .then(response => {
                setCategories(response.data.categories); 
            })
            .catch(error => {
                console.error(error);
            });
    }, []); 

    const handleSubmit = (values, {resetForm }) => {
        axios
            .post("http://localhost:3000/api/v1/products", values)
            .then(function (response) {
                console.log(response);
                setData([...data, values]); 
                alert("Product successfully added!");
                navigate('/ShowProducts')
                resetForm(); 
            })
            .catch(function (err) {
                console.log(err);
                alert("Failed to add product. Please try again.");
            })
            
    };

    return (
        <Formik
            initialValues={{code: "",name: "",excerpt: "",category: "",price: "",}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="addproducts">
                    <div>
                        <Field type="text" name="code" placeholder="Enter Product Code" />
                        <ErrorMessage name="code" component="div" className="error" />
                    </div>
                    <div>
                        <Field type="text" name="name" placeholder="Enter Product Name" />
                        <ErrorMessage name="name" component="div" className="error" />
                    </div>
                    <div>
                        <Field type="text" name="excerpt" placeholder="Enter Excerpt" />
                        <ErrorMessage name="excerpt" component="div" className="error" />
                    </div>
                    <div>
                        <Field as="select" name="category">
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="category" component="div" className="error" />
                    </div>
                    <div>
                        <Field type="number" name="price" placeholder="Enter the price" />
                        <ErrorMessage name="price" component="div" className="error" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default AddProducts;