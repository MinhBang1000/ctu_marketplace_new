import environment from '../../../environments/environment';

import { CKEditor } from 'ckeditor4-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import ArrowBack from '../../../components/ArrowBack';

const filebrowserUploadUrl = environment.url.java +  '/upload-file';
const removeButtons = 'PasteFromWord'

const FormFooter = (props) => {

    const { footer, onSubmit } = props;

    const [value, setValue] = useState(footer ? footer : {});

    const { t } = useTranslation('common');

    const handleChange = (field, valueChanged) => {
        setValue(previousState => ({...previousState, [field]: valueChanged }))
    } 

    const handleCKEditorChange = (event, editor) => {
        const name = event.editor.name;
        const data = event.editor.getData();
        
        handleChange(name, data)
    }

    return (
        <>
            <ArrowBack />
            <div className="d-flex flex-column gap-6 px-3">
                <div className="mx-6">
                    <h5 className="text-uppercase text-center">
                        { t('admin.footer.form.title') }
                    </h5>
                    <div className="d-flex flex-column gap-2">
                        <CKEditor 
                            id={'content'}
                            name={'content'}
                            activeClass={'content'}
                            initData={value ? value.content : ''}
                            config={{
                                filebrowserUploadUrl: filebrowserUploadUrl,
                                removeButtons: removeButtons,
                                isReadOnly: true,
                                height: 400,
                                extraPlugins: [["embed,autoembed,language,justify,colorbutton,font"]],
                                embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',    
                            }}
                            onChange={handleCKEditorChange}
                        />
                    </div>
                    <button 
                        onClick={e => onSubmit(value)}
                        className="btn btn-warning mt-4 mb-4"
                    >
                        { footer ? t('admin.footer.form.btnOk') : 'Thêm' }
                    </button>
                    <Link to={'/admin/footers'}
                    className="btn btn-secondary text-white ml-3"
                    style={{marginLeft:"10px"}}
                    >
                            { t('admin.footer.form.btnCancel') }
                    </Link>
                </div>
            </div>
        </>
    )
}

export default FormFooter