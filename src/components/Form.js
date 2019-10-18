import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';


const UserForm = ({ values, touched, errors, status }) => {

    const [users, setUsers] = useState([]);

    useEffect( () => {
        status && setUsers([...users, status]);
    }, [status]);

    return (
        <div className='container'>
            <Form className='form'>
                <Field className='input' type='text' name='name' placeholder='Name' />
                {touched.name && errors.name && (
                    <p className='error'>{errors.name}</p>
                )}
                <Field className='input' component='select' name='role'>
                    <option>Select Role</option>
                    <option value='frontend'>Front-End Developer</option>
                    <option value='backend'>Back-End Developer</option>
                </Field>
                {touched.role && errors.role && (
                    <p className='error'>{errors.role}</p>
                )}
                <Field className='input' type='text' name='email' placeholder='Email' />
                {touched.email && errors.email && (
                    <p className='error'>{errors.email}</p>
                )}
                <Field className='input' type='text' name='password' placeholder='Password' />
                {touched.password && errors.password && (
                    <p className='error'>{errors.password}</p>
                )}
                <label className='terms'>Accept Terms of Service
                <Field className='input' type='checkbox' name='terms' id='terms' checked={values.terms}></Field>
                </label>
                <div className='buttonContainer'>
                <button type='submit'>Submit</button>
                </div>
            </Form>
            <div className='displayInfoContainer'>
                {users.map(el => (
                    <div className='displayInfo'>
                        <p><strong>Name:</strong> {el.name}</p>
                        <p><strong>Role:</strong> {el.role}</p>
                        <p><strong>Email:</strong> {el.email}</p>
                        <p><strong>Password:</strong> {el.password}</p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, role, terms }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            role: role || '',
            terms: terms || false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('*Name required*'),
        email: Yup.string().required('*Email required*'),
        password: Yup.string().required('*Password required*'),
        role: Yup.string().oneOf(['frontend', 'backend']).required()
    }),

    handleSubmit(values, {setStatus}) {
        axios.post('https://reqres.in/api/users', values)
        .then(response => {
            setStatus(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.response)
        })
    }
})(UserForm);



export default FormikUserForm;