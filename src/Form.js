import {useFormik, validateYupSchema} from "formik";
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';


const FormTablet = () => {
    return (
        <Formik initialValues={{
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
        }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('field is required')
                        .min(2, 'too short')
                        .max(10, 'too long'),
                    email: Yup.string()
                        .email('Incorrect email data')
                        .required('field is required'),
                    amount: Yup.number()
                        .min(5, 'should be more than 5')
                        .required(),
                    currency: Yup.string()
                        .required('Please select a currency'),
                    text: Yup.string()
                        .required()
                        .min(10, 'Should be contained'),
                    terms: Yup.boolean()
                        .required('Consent is required')
                        .oneOf([true], 'Consent is required')
                })}
                onSubmit={(values) => {
                    console.log(values)
                }}>
            {({isSubmitting}) => (
                <Form className="form">
                    <h2>Отправить пожертвование</h2>

                    <label htmlFor="name">Your name</label>
                    <Field type="text"
                           name="name"
                           id='name'/>
                    <ErrorMessage name="name"
                                  component="div"
                                  className={'error'}/>

                    <label htmlFor="email">Your email</label>
                    <Field type="email"
                           name="email"
                           id='email'/>
                    <ErrorMessage name="email"
                                  component="div"
                                  className={'error'}/>

                    <label htmlFor="amount">Quantity</label>
                    <Field type="number"
                           name="amount"
                           id='amount'/>
                    <ErrorMessage name="amount"
                                  component="div"
                                  className={'error'}/>

                    <label htmlFor="currency">Валюта</label>
                    <Field
                        id="currency"
                        name="currency"
                        as={'select'}
                    >
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                    </Field>
                    <ErrorMessage name="currency"
                                  component="div"
                                  className={'error'}/>


                    <label htmlFor="text">Ваше сообщение</label>
                    <Field type="text" name="text" id='text'/>
                    <ErrorMessage name="text" component="div"/>

                    <label className="checkbox">
                        <Field
                            name="terms"
                            id={'checkbox'}
                            type="checkbox"/>
                        I agree with the privacy policy
                    </label>
                    <ErrorMessage name="terms"
                                  component="div"
                                  className={'error'}/>
                    <button type="submit">Отправить</button>
                </Form>
            )}
        </Formik>
    )
}

export default FormTablet;