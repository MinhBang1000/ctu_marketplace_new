/* eslint-disable react-hooks/exhaustive-deps */
import environment from '../../../environments/environment';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { connect, useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { Spinner } from 'react-bootstrap'
import PreviewIcon from '@mui/icons-material/Preview';
import { CustomDialog, Confirm } from 'react-st-modal';
import { useAlert } from 'react-alert'
import DeleteIcon from '@mui/icons-material/Delete';
import Highlighter from "react-highlight-words";

import Checkbox from './Checkcbox';
import Search from './Search';

import authHeader from '../../../services/auth.header';

import DataTable from 'react-data-table-component';
import { header } from './headers.data'

import { 
    retrieveProjectsByUserId,
    retrieveProjectsByUseridProjecttypeStatusid,
    approveProject,
    deleteProjectById
    
} from '../../../store/admin.projectSlice';
import { retrieveStatuses } from '../../../store/statusSlice';

import FormEditHightlight from './FormEdit_Hightlight'

import Filter from './Filter'

import {
    STATUS_APPROVE_DD_SUCCESS,
    STATUS_APPROVE_DD_CANCEL,
    STATUS_APPROVE_TC_SUCCESS,
    STATUS_APPROVE_TC_CANCEL,
    STATUS_DELETE_SUCCESS, 
    STATUS_DELETE_CANCEL

} from '../../../status.messsage'
import _ from 'lodash';

import { seo } from '../../../libs/helper'
import { SEO_ADMIN } from '../../../libs/constants-seo'
import { useTranslation } from 'react-i18next';

const STATUS_ID_DD = 101;
const STATUS_ID_TC = 103;

const rowPerPageLocalStorage = localStorage.getItem("rowPerPage");

const AdminManageProjectPage = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [currentSelectedRowPerPage, setCurrentSelectedRowPerPage] = React.useState(rowPerPageLocalStorage ? rowPerPageLocalStorage : 10);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState(
        props.projects 
        ? props.projects
        : []
    );
    const [query, setQuery] = useState({
        projectType: 'commercial',
        statusId: 101,
        isInitialValue: true,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = projects && Object.values(projects.data)?.length > 0    
        ? 
        (
            projects.data && Object.values(projects.data).length > 0
            ? Object.values(projects.data).filter(
                item => (item.author && item.author.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.name && item.name.toLowerCase().includes(filterText.toLowerCase()))
            ) 
            : null    
        )
        : null

    const dispatch = useDispatch();
    const alert = useAlert()
    const user = useSelector((state) => state.auth.data.userProfile.data);

    const { t } = useTranslation('common');
    
    useEffect(() => {
        seo({
            title: SEO_ADMIN.projects.title,
            metaDescription: SEO_ADMIN.projects.metaDescription
        });

        dispatch(retrieveProjectsByUserId(user.id))
            .then(res => {
                setProjects({ data: _.mapKeys(res.payload, 'id') })
            })
        
        dispatch(retrieveStatuses())

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(query && !query.isInitialValue) {
            dispatch(retrieveProjectsByUseridProjecttypeStatusid({
                userId: user.id,
                projectType: query.projectType,
                statusId: query.statusId,
            }))
            .then(res => {
                setProjects({ data: _.mapKeys(res.payload, 'id') })
            })
        }
    }, [query])

    const onBtnApproveClick = async (field, type, statusId) => {
        const CONSTFIRM_TITLE = type 
        const CONSTFIRM_TEXT = `Bạn muốn ${type} ${field.name ? field.name : field.question} ? `
        const CONSTFIRM_OK_BUTTON_TEXT = 'Đồng ý' 
        const CONSTFIRM_OK_CANCEL_TEXT = 'Hủy' 

        const result = await Confirm(
            CONSTFIRM_TEXT, 
            CONSTFIRM_TITLE,
            CONSTFIRM_OK_BUTTON_TEXT,
            CONSTFIRM_OK_CANCEL_TEXT
        );

        setSelectedProject(field.id);
        
        if (result) {
            const data = {
                approverId: user ? user.id : 1, 
                projectId: field.id, 
                statusId: statusId, 
                reason: ''
            }
            setIsLoading(true)
            dispatch(approveProject(data))
                .then((response) => {
                    if(!response.payload.error) {
                        let message = '';
                        message = statusId === STATUS_ID_DD ? STATUS_APPROVE_DD_SUCCESS : STATUS_APPROVE_TC_SUCCESS;
                        alert.success(message)
                    }

                    if(response.payload.statusCode !== 200) {
                        alert.error(response.message || t('message.something-went-wrong'))
                    }

                    dispatch(retrieveProjectsByUserId(user.id))
                    .then(res => {
                        let data;
                        if(!query?.isInitialValue){
                            data = res.payload.filter(item => item.status.id.toString() === query?.statusId && item.projectType.toString() === query?.projectType)
                        }
                        else {
                            data = res.payload
                        }

                        setLoading(false)
                        setSelectedProject(null)
                        
                        setProjects({ data })
                    })
                })
        } else {
        // Сonfirmation not confirmed
            let message = '';
            message = statusId === STATUS_ID_DD ? STATUS_APPROVE_DD_CANCEL : STATUS_APPROVE_TC_CANCEL;
            alert.info(message)
        }
    }

    const renderActionByProjectStatus = (project) => {
        if(project && project.status){
            if('DD' === project.status.code) {
                return (
                    <>
                        <button
                            className="btn btn-danger rounded-3"
                            style={{ padding: '2px', marginLeft: '10px', width: '100px' }} 
                            onClick={() => onBtnApproveClick(project, 'Từ chối sản phẩm', STATUS_ID_TC)}
                        >
                            {  
                                isLoading && project.id === selectedProject
                                ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                )
                                : t('admin.projects.actions.deny')
                            }
                        </button>
                    </>
                )
            }
            if('TC' === project.status.code) {
                return (
                    <>
                        <button
                            className="btn btn-success rounded-3"
                            style={{ padding: '2px', marginLeft: '10px', width: '100px' }} 
                            onClick={() => onBtnApproveClick(project, 'Duyệt sản phẩm', STATUS_ID_DD)}
                        >
                            {
                                isLoading && project.id === selectedProject
                                ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                )
                                : t('admin.projects.actions.approve') }
                        </button>
                    </>
                )
            }
            else return (
                <>
                    <button
                        className="btn btn-success rounded-3"
                        style={{ padding: '2px', marginLeft: '10px', width: '100px' }} 
                        onClick={() => onBtnApproveClick(project, 'Duyệt sản phẩm', STATUS_ID_DD)}
                    >
                        { 
                            isLoading && project.id === selectedProject
                            ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            )
                            : t('admin.projects.actions.approve') 
                        }
                    </button>
                    <button
                        className="btn btn-danger rounded-3"
                        style={{ padding: '2px', marginLeft: '10px', width: '100px' }} 
                        onClick={() => onBtnApproveClick(project, 'Từ chối sản phẩm', STATUS_ID_TC)}
                    >
                        { 
                            isLoading && project.id === selectedProject
                            ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            )
                            : t('admin.projects.actions.deny') 
                        }
                    </button>
                </>
            )
        }
        
        return null;
    }

    const onSubmitHightlight = (project, isChecked) => {
        axios.put(
            environment.url.java + `/admin/project-management/highlight/project-id/${project.id}/is-highlighted/${isChecked}`, 
            {},
            {headers: authHeader()}
        )
        .then(response => {
            if (response) {
                dispatch(retrieveProjectsByUserId(user.id))
                .then(res => {
                    setProjects({ data: _.mapKeys(res.payload, 'id') })
                })
            }
        })
    }

    const onSubmitRanking = (hightlightNumber, projectId) => {
        axios.put(
            environment.url.java + `/admin/project-management/ranking/project-id/${projectId}/number/${hightlightNumber}`, 
            {},
            {headers: authHeader()}
        )
        .then(response => {
            if (response.status ===  200) {
                dispatch(retrieveProjectsByUserId(user.id))
                .then(res => {
                    setProjects({ data: _.mapKeys(res.payload, 'id') })
                })
            }
        })
    }

    const onBtnChangeRankingClick = async (row) => {
        const formConfig_Hightlight = {
            comboBoxLabel: t('admin.projects.actions.setHightlight.form.comboboxLabel'),
            button_text_ok: t('admin.projects.actions.setHightlight.form.btnOk'),
            button_text_cancel: t('admin.projects.actions.setHightlight.form.btnCancel')
        }

        await CustomDialog(
            <FormEditHightlight 
                formConfig={formConfig_Hightlight}
                initialValue={row}
                onSubmit={onSubmitRanking}
            />,
            {
            title: t('admin.projects.actions.setHightlight.form.title'),
            showCloseIcon: true,
        });

    }

    const onBtnDeleteClick = async (field) => {
        const CONSTFIRM_TITLE = 'Xác nhận' 
        const CONSTFIRM_TEXT = `Bạn muốn xóa ${field.name ? field.name : (field.question ? field.question : field.groupName)} ? `
        const CONSTFIRM_OK_BUTTON_TEXT = 'Đồng ý' 
        const CONSTFIRM_OK_CANCEL_TEXT = 'Hủy' 

        const result = await Confirm(
            CONSTFIRM_TEXT, 
            CONSTFIRM_TITLE,
            CONSTFIRM_OK_BUTTON_TEXT,
            CONSTFIRM_OK_CANCEL_TEXT
        );
        
        if (result) {
            // props.deleteLevel(field.id) => onDelete
            // onDelete(field.id)
            dispatch(deleteProjectById(field.id))
            .then(() => {
                const updatedProjects = _.omit(projects.data, field.id)
                setProjects({ data: updatedProjects });
                alert.success(STATUS_DELETE_SUCCESS)
            })
        } else {
        // Сonfirmation not confirmed
            alert.info(STATUS_DELETE_CANCEL)
        }
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
        if(rows){
            return Object.values(rows).map((row, index) => {
                const action = (
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-outline-primary rounded-3"
                                style={{ padding: '2px', marginLeft: '20px' }}
                            >
                                <Link to={`/admin/projects/preview/${row.projectType}/${row.id}`}>
                                    <PreviewIcon color="info" />
                                </Link>
                            </button>
                            <button 
                                onClick={() => onBtnDeleteClick(row)}
                                className="btn btn-outline-danger rounded-3"
                                style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}    
                            >
                                <DeleteIcon color="error" />
                            </button>

                            { renderActionByProjectStatus(row) }

                        </div>
                )
                const hightlightAndNumber = (
                    <div className="d-flex gap-2">
                        <Checkbox 
                            isChecked={row.isHighlighted} 
                            onCheckboxChange={(fieldName, checked) => onSubmitHightlight(row, checked)}
                        />
                        { 
                            row.isHighlighted 
                            ? (
                                <button 
                                    onClick={() => onBtnChangeRankingClick(row)}
                                    className="btn btn-warning rounded-3"
                                    style={{ padding: '2px', marginLeft: '10px', width: '100px' }} 
                                >
                                    { row.ranking ? row.ranking : t('admin.projects.actions.setHightlight.btnText') }
                                </button>
                            ) 
                            : null
                        }
                        
                    </div>
                )

                return {
                    ...row, 
                    action: action, 
                    hightlightAndNumber: hightlightAndNumber,
                    stt: index + 1,
                    name: renderHighlightOnSearch(row.name),
                    author: renderHighlightOnSearch(row.author),
                }
            })
        }
        return null
    }

    const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

        const updateRowPerPage = {...JSON.parse(rowPerPageLocalStorage), projects: newPerPage};
        localStorage.setItem('adminManageInfoRowPerPage', JSON.stringify(updateRowPerPage));
        setCurrentSelectedRowPerPage(newPerPage);

		setLoading(false);
	};

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
                filterBy="name-authors"
            />
		);
	}, [filterText, resetPaginationToggle]);

    const renderColumnHeader = () => {
        if(header && header.length > 0){
            return header.map(column => {
                return {...column, name: t(`admin.admin-manage-info-form.header.${column.name}`)}
            })
        }

        return null
    }
    

    const renderDatatable = (data) => {
        if(renderRows(data)){
            return (
                <DataTable 
                    title={ t('admin.projects.title') }
                    columns={renderColumnHeader()}
                    data={renderRows(data ? data : [])} 
                    selectableRows 
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="500px" 
                    paginationPerPage={ currentSelectedRowPerPage }
                    progressPending={ loading }
                    onChangeRowsPerPage={ handlePerRowsChange }
                    subHeader
            		subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                ></DataTable>
            )
        }

        return (
            <div>
                Không có dữ liệu
            </div>
        );
    }

    const handleFilterChange = (name, value) => {
        setQuery(previousState => ({...previousState, [name]: value, isInitialValue: false }))
    }

    const handleComboboxChange = (e) => {
        handleFilterChange('projectType', e.target.value)
    }
      
    const handleRadioClick = (e) => {
        handleFilterChange('statusId', e.target.value)
    }

    return (
        
        <>
            <h1>Hello</h1>
            <Filter 
                handleComboboxChange={handleComboboxChange}
                handleRadioClick={handleRadioClick}
                projectTypes={[
                    {
                        value: 'commercial',
                        label: 'Sản phẩm thương mại'
                    },
                    {
                        value: 'researching',
                        label: 'Kết quả nghiên cứu'
                    },
                    {
                        value: 'idea',
                        label: 'Ý tường'
                    }
                ]}
                status={props.status ? props.status : []}
            />
            <div className="h-2"></div>
            
            { renderDatatable(filteredItems) }

        </>
    )
}

const mapStateToProps = (state) => {
    return { 
        projects: state.projectsAdmin,
        status: Object.values(state.status.data),
    };
}

export default connect(
    mapStateToProps, 
    {}
)(AdminManageProjectPage);
