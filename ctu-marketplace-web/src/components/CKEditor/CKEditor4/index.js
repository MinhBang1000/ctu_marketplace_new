import { CKEditor } from 'ckeditor4-react';
import React from 'react';

import environment from '../../../environments/environment';
import authHeader from '../../../services/auth.header';

const filebrowserUploadUrl = environment.url.java +  '/upload-file';
const removeButtons = 'PasteFromWord'

const CustomCKEditor4 = (props) => {

    const { field, initData, onChange } = props;

    return (
        <CKEditor 
            id={field.id}
            name={field.fieldName}
            activeClass={field.fieldName}
            initData={initData}
            config={{
                filebrowserUploadUrl: filebrowserUploadUrl,
                removeButtons: removeButtons,
                isReadOnly: true,
                maxHeight: 200,
                fileTools_requestHeaders: authHeader(),
                extraPlugins: [["embed,autoembed,language,justify,colorbutton,font"]],
                embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',    
            }}
            onChange={onChange}
        />
    )
}

export default CustomCKEditor4;