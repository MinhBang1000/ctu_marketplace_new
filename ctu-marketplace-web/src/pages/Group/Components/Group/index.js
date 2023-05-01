import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../../../components/Card';

const Group = ({ groups }) => {
    const { t } = useTranslation('common');

    const renderList = () => {
        const renderedList = 
            groups.length
            ? groups.map((item, index) => {

                const { 
                    id,
                    name, 
                    groupImage, 
                    shortDescription 
                
                } = item

                return (
                    <div className='col-lg-3' key={index}>
                        <Card
                            imgUrl={groupImage}
                            title={name}
                            content={shortDescription}
                            btnText={t('research-groups.card.btn-text')}
                            btnLinkTo={`/nhom-nghien-cuu/${id}`}
                        />
                    {/* </Link> */}
                    </div>
                )
            })
            : null

        return (
            <div className="container mt-4 mb-4">
                <div className='row'>
                    <div className='col-12 d-flex flex-wrap flex-row justify-content-center' style={{columnGap:"20px",rowGap:"20px"}}>
                    { renderedList }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            { renderList() }
        </>
    )
}
export default Group;