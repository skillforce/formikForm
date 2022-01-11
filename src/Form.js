import {ErrorMessage, Field, Form, Formik, useField} from "formik";
import * as Yup from 'yup';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error && <div className={'error'}>{meta.error}</div>}
        </>

    )
}
const MyCheckBox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'})
    return (
        <>
            <label className={'checkbox'}>
                <input type="checkbox" {...props} {...field}/>
                {children}
            </label>
            {meta.touched && meta.error && <div className={'error'}>{meta.error}</div>}
        </>)
}


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
                    <MyTextInput label={'Your name'} type={'text'} name={'name'} id={'name'}/>
                    <MyTextInput label={'Your email'} type={'email'} name={'email'} id={'email'}/>
                    <MyTextInput label={'Quantity'} type={'number'} name={'amount'} id={'amount'}/>

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


                    <label htmlFor="text">Your message</label>
                    <Field as={'textarea'} type="text" name="text" id='text'/>
                    <ErrorMessage name="text" component="div"/>


                    <MyCheckBox name="terms"
                                id={'checkbox'}>
                        I agree with the privacy policy
                    </MyCheckBox>

                    <button type="submit">Отправить</button>
                </Form>
            )}
        </Formik>
    )
}

export default FormTablet;