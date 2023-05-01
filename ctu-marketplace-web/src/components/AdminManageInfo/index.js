/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Confirm, CustomDialog } from 'react-st-modal';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import DataTable from 'react-data-table-component';
import Search from '../../pages/Admin/Admin-Manage-Project/Search';
import FormEdit from '../AdminForm';

import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    STATUS_ADD_SUCCESS, STATUS_DELETE_CANCEL, STATUS_DELETE_SUCCESS, STATUS_EDIT_SUCCESS
} from '../../status.messsage';

let rowPerPageLocalStorage = localStorage.getItem("adminManageInfoRowPerPage");

const AdminManageInfo = (props) => {

    const {
        header,
        conditionalRowStyles,
        columns,
        formConfig_Add,
        formConfig_Edit,
        data,
        formData,
        onAdd,
        onEdit,
        onDelete,
        deleteBy,
        useCustomOnDelete,
        useLink,
        links,
        otherLinks,
        useCustomActions,
        customActions,
        disableDelete,
        disableEdit,
        name,
        title,
        isEditMemberOfGroup,
        groupId,
        useSubHeader,
        defaultCompobox

    } = props;

    const [currentSelectedRowPerPage, setCurrentSelectedRowPerPage] = useState(
        rowPerPageLocalStorage 
        ? (JSON.parse(rowPerPageLocalStorage)[name] ? JSON.parse(rowPerPageLocalStorage)[name] : 5)  
        : 10);

    const [loading, setLoading] = useState(false);

    const alert = useAlert()

    const { t } = useTranslation('common');

    useEffect(() => {
        rowPerPageLocalStorage = localStorage.getItem("adminManageInfoRowPerPage");
    }, [])

    const onBtnDeleteClick = async (field) => {
        const username = field.username ? field.username : (field.userProfile ? field.userProfile.username : null);

        const CONSTFIRM_TITLE = 'Xác nhận' 
        const CONSTFIRM_TEXT = `Bạn muốn xóa ${field.name ? field.name : (field.question ? field.question : (field.groupName ? field.groupName : username))} ? `
        const CONSTFIRM_OK_BUTTON_TEXT = 'Đồng ý' 
        const CONSTFIRM_OK_CANCEL_TEXT = 'Hủy' 

        const result = await Confirm(
            CONSTFIRM_TEXT, 
            CONSTFIRM_TITLE,
            CONSTFIRM_OK_BUTTON_TEXT,
            CONSTFIRM_OK_CANCEL_TEXT
        );
        
        if (result) {
            const fieldName = deleteBy ?? "id";
            if(!useCustomOnDelete) {
                onDelete(field[fieldName])
                .then(res => {
                    if(res.payload.error){
                        alert.error(res.payload.error)
                    }

                    else alert.success(STATUS_DELETE_SUCCESS)
                })
            }
            else onDelete(field[fieldName])
        } else {
            alert.info(STATUS_DELETE_CANCEL)
        }
    }

    const handleEdit = (value) => {
        onEdit(value)
        .then((res) => {
            if(res.payload.error){
                alert.error(res.payload.error)
            }

            else alert.success(STATUS_EDIT_SUCCESS)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const handleAdd = (value) => {
        onAdd(value)
        .then((res) => {
            if(res.payload.error){
                alert.error(res.payload.error)
            }

            else alert.success(STATUS_ADD_SUCCESS)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const renderAdminFormFields = () => {
        if(columns && columns.length > 0){
            return columns.map(column => {
                return {...column, headerName: t(`admin.admin-manage-info-form.header.${column.headerName}`)}
            })
        }

        return null
    }

    const onBtnEditClick = async (level) => {
        const btnText = {
            btnOk: t('admin.admin-form.edit.btn-ok'),
            btnCancel: t('admin.admin-form.edit.btn-cancel')
        }
        const updateFormConfig = { ...formConfig_Edit, btnText: btnText };

        await CustomDialog(
                <FormEdit 
                    type='edit'
                    formConfig={updateFormConfig}
                    initialValue={level}
                    data={data}
                    fields={renderAdminFormFields()} 
                    onSubmit={handleEdit}
                />, {
                title: t('admin.admin-form.edit.title') + t(`admin.admin-form.${formConfig_Edit.name}`),
                showCloseIcon: true,
            });

    }

    const onBtnAddClick = async (level) => {
        const btnText = {
            btnOk: t('admin.admin-form.add.btn-ok'),
            btnCancel: t('admin.admin-form.add.btn-cancel')
        }
        const updateFormConfig = { ...formConfig_Add, btnText: btnText };

        await CustomDialog(
            <FormEdit 
                formConfig={updateFormConfig}
                initialValue={level}
                defaultCompobox={defaultCompobox}
                data={data}
                fields={renderAdminFormFields()} 
                onSubmit={handleAdd}
            />, {
            title: t('admin.admin-form.add.title') + t(`admin.admin-form.${formConfig_Add.name}`),
            showCloseIcon: true,
        });

    }

    const renderHighlightOnSearch = (text) => {
        return (
            <Highlighter
                highlightClassName="bg-warning text-white rounded-3"
                searchWords={filterText ? [filterText] : []}
                autoEscape={true}
                textToHighlight={text ? text : ''}
            />
        )
    }


    const renderRows = (rows) => {
        if(rows && rows.length > 0) {
            return rows.map(row => {
                    let action = null;
                    if(!useCustomActions) {
                        action = (
                            <div className="d-flex gap-2 mx-auto justify-content-around">
                                {
                                    useLink 
                                    ? (
                                        <>
                                            {
                                                links.projectType
                                                ? (
                                                    <Link 
                                                        to={`${links.editLink}/${row.projectType}/${row.id}`}
                                                        className="text-white rounded-2"    
                                                    >
                                                        <EditIcon color="warning" />
                                                    </Link>
                                                )
                                                : (
                                                        isEditMemberOfGroup
                                                        ? (
                                                            !row.username
                                                            ? (
                                                                <Link 
                                                                    to={`/admin/research-groups/${groupId}/edit-member/${row.id}`}
                                                                    className="btn btn-outline-warning rounded-3"
                                                                    style={{ padding: '2px', marginLeft: '20px', marginBottom: '5px' }}    
                                                                >
                                                                    <EditIcon color="warning" />
                                                                </Link>
                                                            )
                                                            : (
                                                                <button 
                                                                    // to={`/admin/research-groups/${groupId}/edit-member/${row.id}`}
                                                                    disabled={true}
                                                                    className="btn btn-outline-warning rounded-3"
                                                                    style={{ padding: '2px', marginLeft: '20px', marginBottom: '5px' }}    
                                                                >
                                                                    <EditIcon color="warning" />
                                                                </button>
                                                            )
                                                        )
                                                        : (
                                                            !disableEdit
                                                            ? (
                                                                <Link 
                                                                    to={`${links.editLink}/${row.id}`}
                                                                    className="btn btn-outline-warning rounded-3"
                                                                    style={{ padding: '2px', marginLeft: '20px', marginBottom: '5px' }}    
                                                                >
                                                                    <EditIcon color="warning" />
                                                                </Link>
                                                            )
                                                            : (
                                                                disableEdit[row.id]?.isDisableEdit
                                                                ? (
                                                                    <div style={{ padding: '2px', marginLeft: '28px', marginBottom: '5px' }} />    
                                                                    
                                                                )
                                                                : (
                                                                    <Link 
                                                                        to={`${links.editLink}/${row.id}`}
                                                                        className="btn btn-outline-warning rounded-3"
                                                                        style={{ padding: '2px', marginLeft: '2px', marginBottom: '5px' }}      
                                                                    >
                                                                        <EditIcon color="warning" />
                                                                    </Link>
                                                                )
                                                            )
                                                        )
                                                    
                                                )
                                            }
                                            {
                                                otherLinks
                                                ? (
                                                    <Link 
                                                        to={`${otherLinks.addMemberLink}/${row.id}`}
                                                        className="btn btn-outline-success rounded-3"
                                                        style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                                                    >
                                                        <GroupAddIcon color="success" />
                                                    </Link>
                                                )
                                                : null
                                            }
                                            {
                                                !disableDelete
                                                ? (
                                                    <button 
                                                        onClick={() => onBtnDeleteClick(row)}
                                                        className="btn btn-outline-danger rounded-3"
                                                        style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}    
                                                    >
                                                        <DeleteIcon color="error" />
                                                    </button>
                                                )
                                                : (
                                                    disableDelete[row.id]?.isDisableDelete
                                                    ? null
                                                    : (
                                                        <button 
                                                            onClick={() => onBtnDeleteClick(row)}
                                                            className="btn btn-outline-danger rounded-3"
                                                            style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}    
                                                        >
                                                            <DeleteIcon color="error" />
                                                        </button>
                                                    )
                                                )
                                            }
                                        </>
                                    )
                                    : (
                                        <>
                                            {
                                                !disableEdit
                                                ? (
                                                    <button 
                                                        onClick={() => onBtnEditClick(row)}
                                                        className="btn btn-outline-warning rounded-3"
                                                        style={{ padding: '2px', marginLeft: '20px', marginBottom: '5px' }}  
                                                    >
                                                        <EditIcon color="warning" />
                                                    </button>
                                                )
                                                : (
                                                    disableEdit[row.id]?.isDisableEdit
                                                    ? null
                                                    : (
                                                        <button 
                                                            onClick={() => onBtnEditClick(row)}
                                                            className="btn btn-outline-warning rounded-3"
                                                            style={{ padding: '2px', marginLeft: '20px', marginBottom: '5px' }}  
                                                        >
                                                            <EditIcon color="warning" />
                                                        </button>
                                                    )
                                                )
                                            }
                                            <button 
                                                onClick={() => onBtnDeleteClick(row)}
                                                className="btn btn-outline-danger rounded-3"
                                                style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}    
                                            >
                                                <DeleteIcon color="error" />
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        )
                    }
                    else {
                        const renderedActions = customActions.map((item,index) => {
                            return (
                                <button 
                                    onClick={() => item.onSubmit(row)}
                                    className="btn btn-outline-primary rounded-3"
                                    key={index}    
                                >
                                    { item.icon }
                                </button>
                            )
                        })
                        action = (
                            <div className="d-flex gap-2 mx-auto">
                                { renderedActions }
                            </div>
                        )
                    }

                    return {...row, action: action, [useSubHeader?.filterBy]: renderHighlightOnSearch(row[useSubHeader?.filterBy])};
                })
        }

        return null;
    }

    const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

        const updateRowPerPage = {...JSON.parse(rowPerPageLocalStorage), [name]: newPerPage};
        localStorage.setItem('adminManageInfoRowPerPage', JSON.stringify(updateRowPerPage));
        setCurrentSelectedRowPerPage(newPerPage);

		setLoading(false);
	};

    const renderColumnHeader = () => {
        if(header && header.length > 0){
            return header.map(column => {
                return {...column, name: t(`admin.admin-manage-info-form.header.${column.name}`)}
            })
        }

        return null
    }

    const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = formData && formData.length > 0    
        ? 
            formData.filter(
                item => (item[useSubHeader?.filterBy] && item[useSubHeader?.filterBy].toLowerCase().includes(filterText.toLowerCase()))
            )
        : formData

    const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<Search 
                onFilter={e => setFilterText(e.target.value)} 
                onClear={handleClear} 
                filterText={filterText} 
                filterBy={useSubHeader?.filterBy}
            />
		);
	}, [filterText, resetPaginationToggle]);

    const renderDatatable = () => {
        const findedClasses = document.getElementsByClassName('controlRow__root');
        for (let index = 0; index < findedClasses.length; ++index) {
            findedClasses[index].classList.remove('row');
        }

        if(renderRows(formData ? formData : [])){
            return (
                <DataTable 
                    title={ title }
                    columns={renderColumnHeader()} 
                    data={filteredItems.length> 0 ? renderRows(filteredItems) : renderRows(formData)} 
                    selectableRows 
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="500px" 
                    conditionalRowStyles={ conditionalRowStyles }
                    paginationPerPage={ currentSelectedRowPerPage }
                    progressPending={ loading }
                    onChangeRowsPerPage={ handlePerRowsChange }
                    subHeader={useSubHeader?.enabled}
            		subHeaderComponent={useSubHeader?.enabled ? subHeaderComponentMemo : null}
                />
            )
        }

        return (
            <>
                { t('researcher.projects.nodata') }
            </>
        )
    }

    const renderAddButton = () => {
        if(formConfig_Add){
            if(useLink) {
                return (
                    <Link 
                        to={links.addLink}
                        className="btn btn-primary text-white"
                    >
                        { t('admin.admin-manage-info-form.btn-new') }
                    </Link>
                )
            }
    
            return (
                <button 
                    onClick={() => onBtnAddClick()}
                    className="btn btn-primary text-white"
                >
                    { t('admin.admin-manage-info-form.btn-new') }
                </button>
            )
        }
    }

    return (
        
        <div className="mt-4">
            { renderAddButton() } <br />
            { renderDatatable() }
        </div>
    )
}

export default AdminManageInfo;
