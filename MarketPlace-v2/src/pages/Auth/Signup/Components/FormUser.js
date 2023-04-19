 import '../index.css'

import React from 'react'
import { withAlert } from 'react-alert'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import validator from 'validator'

import { useTranslation } from 'react-i18next'
import Checkbox from '../Checkcbox'
import Combobox from '../Combobox'

const TYPE_TEXT = 'text';
const TYPE_TEL = 'tel';
const TYPE_PASSWORD = 'password';
const TYPE_DATE = 'date';
const TYPE_EMAIL = 'email';
const TYPE_COMBOBOX = 'combobox';
const TYPE_CHECKBOX = 'checkbox';

const genders = [
    {
        id: 1,
        name: 'Nam'
    },
    {
        id: 2,
        name: 'Nữ'
    },
    {
        id: 3,
        name: 'Khác'
    }
]

const DOMAIN_CTU_ID = 101;
const ROLE_KCH_ID = 104;

const SignUp = (props) => {

    const { initValue, fields, onSubmit } = props;
    
    const [formValues, setFormValues] = React.useState(
        initValue
        ? initValue
        : {
            domainId: DOMAIN_CTU_ID,
            roleId: ROLE_KCH_ID,
            isEnabled: false,
            gender: 0
        }
    );

    const { t } = useTranslation('common');

    const handleChange = (fieldName, value, e) => {
        if("username" === fieldName){
            validator.isEmail(value) ? e.target.setCustomValidity("Username cannot is an email") : e.target.setCustomValidity("");
        }
        
        setFormValues({
            ...formValues,
            [fieldName]: value
        });
    }

    const renderInputFields = () => {
        if(fields && fields.length > 0){
            return fields.map((field,index) => {
                if(field.type && (
                    field.type === TYPE_TEXT || 
                    field.type === TYPE_PASSWORD || 
                    field.type === TYPE_DATE ||
                    field.type === TYPE_EMAIL ||
                    field.type === TYPE_TEL
                )){
                    const {
                        name,
                        type,
                        required,
                        className,
                        minLength
    
                    } = field;
                    if("username" === name){
                        return (
                            <div className='mb-3' key={index}>
                                <label 
                                    className="form-label" 
                                    htmlFor={name}>
                                        { t(`signup.form.${props.name}.${name}`) }
                                </label>
                                <input 
                                    id={name}
                                    name={name} 
                                    type={type} 
                                    className={className} 
                                    placeholder={ t(`signup.form.${props.name}.${name}`) }
                                    required={required}
                                    onChange={(e) => handleChange(name, e.target.value, e)} 
                                    minLength={minLength}
                                />
                            </div>
                        )
                    }
                    return (
                        <div className='mb-3' key={index}>
                            <label 
                                className="form-label" 
                                htmlFor={name}>
                                    { t(`signup.form.${props.name}.${name}`) }
                            </label>
                            <input 
                                name={name} 
                                type={type} 
                                className={className} 
                                placeholder={ t(`signup.form.${props.name}.${name}`) }
                                required={required}
                                onChange={(e) => handleChange(name, e.target.value)} 
                                minLength={minLength}
                            />
                        </div>
                    )
                }

                return null
            })
        }

        return null;
    }

    const onDomainChange = (domainId) => {
        handleChange('domainId', domainId)
    }

    const onGenderChange = (genderNumber) => {
        handleChange('gender', genderNumber - 1)
    }

    const onRoleChange = (roleId) => {
        handleChange('roleId', roleId)
    }

    const renderComboboxFields = () => {
        const usersFormat = fields
                            .filter(field => field.type === TYPE_COMBOBOX )            
                            .map((field,index) => {
                               if(field.name === 'gender'){
                                    return (
                                        <Combobox 
                                            label={ t(`signup.form.${props.name}.${field.name}`) } 
                                            data={genders ? genders : []} 
                                            selectedIndex={0} 
                                            onChecked={onGenderChange} 
                                            key={index}
                                        />
                                    )
                               }
                               return (
                                <Combobox 
                                    label= { t(`signup.form.${props.name}.${field.name}`) } 
                                    data={props[field.data]} 
                                    selectedIndex={1} 
                                    onChecked={field.field === 'domainId' ? onDomainChange : onRoleChange} 
                                    key={index}
                                />
                            )
        })
    
        return (
            <div className="flex flex-col gap-5">
                { usersFormat }
            </div>
        )
    }

    const onCheckboxEnableChange = (fieldName, checked) => {
        handleChange(fieldName, checked)
    }

    const renderCheckboxFields = () => {
        const usersFormat = fields
                            .filter(field => field.type === TYPE_CHECKBOX )            
                            .map((field,index) => {
                                return (
                                    <Checkbox 
                                        label={ t(`signup.form.${props.name}.${field.name}`) } 
                                        fieldName={field.name} 
                                        isChecked={false} 
                                        onCheckboxChange={onCheckboxEnableChange} 
                                        key={index}
                                    />
                                )
        })
    
        return (
            <div className="mb-3">
                { usersFormat }
            </div>
        )
    }

    return (
        
            <div className='row justify-content-center'>
                <div 
                    className='col-lg-4 mk-signup'
                >
                    <form className="w-100" onSubmit={e => onSubmit(e, formValues)}>
                        <h3 className='text-center'>{ t('signup.form.title') }</h3>
                            
                                { renderInputFields() }
                                { renderComboboxFields() }
                                { renderCheckboxFields() }
                            
                            <div className='mb-3'>
                                <button 
                                    className="btn btn-primary w-100"
                                    type='submit'
                                >
                                    { t('signup.form.btnSignup') }
                                </button>
                            </div>
                    </form>
                </div>
            </div>
       
    ); 
}

const validate = formValues => {
    const errors = {};

    if (!formValues.username) {
        errors.username = 'Tên Đăng ký không được để trống'
    }
    if (!formValues.password) {
        errors.password = 'Mật khẩu không được để trống'
    }

    return errors;
}

const mapStateToProps = (state) => {
    return {};
}

const formWrapped = reduxForm({
    form: 'signupForm',
    validate: validate
})(withAlert()(SignUp));

export default connect(
    mapStateToProps, 
    {}

)(formWrapped);