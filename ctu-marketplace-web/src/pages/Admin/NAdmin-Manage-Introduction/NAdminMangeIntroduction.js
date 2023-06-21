import React, { useEffect } from 'react'
import { useState } from 'react'
import './NAdminManageIntroduction.scss'
import axios from 'axios';
import deepEqual from 'deep-equal';
import nl2br from 'react-nl2br';
// import _ from 'loadash'

export default function NAdminMangeIntroduction() {
    const [fields, setFields] = useState([]); // [{introductionKey: ''}, introductionValue: '']

    const [backupFields, setBackupFields] = useState([]);
    
    const [showReview, setShowReview] = useState(false);

    const [updateIntroductionLoading, setUpdateIntroductionLoading] = useState(false);
    const [savedNotification, setSavedNotification] = useState(false);

    const api = 'https://marketplace.ctu.edu.vn/api/v3/';

    const [editingCheck, setEditingCheck] = useState(false);

    useEffect(() => {
        axios.get(`${api}introductions/1`)
            .then(res => {;
                setFields([...res.data.data.introductionInfos]);
                setBackupFields([...res.data.data.introductionInfos]);
            })
            .then(res => {
               
            })
    }, []);

    const handleAddField = (e) => {
        e.preventDefault();
        setFields([...fields, {introductionKey: '', introductionValue: ''}]);
        setEditingCheck(true);
    }

    const handleUpdateFieldValue = (e, index) => {
        var nFields = [...fields];
        nFields[index].introductionValue = e.target.value;
        setFields(nFields);
        setEditingCheck(true);
        console.log(fields);
        console.log(backupFields)
    }

    const handleUpdateFieldName = (e, index) => {
        var nFields = [...fields];
        nFields[index].introductionKey = e.target.value;
        setFields(nFields);
        setEditingCheck(true);
    }

    const handleDeleteField = (e, indexField) => {
        var nFields = [...fields];
        nFields = nFields.filter((field, index) => {
            return index !== indexField
        })
        setFields(nFields);
        setEditingCheck(true);
       
    }

    const deepCompareTwoObject = (obj1, obj2) => {
        // var check = true;
        const obj1Keys = Object.keys(obj1);
        const obj2Keys = Object.keys(obj2);
        console.log("objKey1: ", obj1)

        if(obj1Keys.length !== obj2Keys.length) {
            return false;
        }
        for(let objKey of obj1Keys) {
            if(obj1[objKey] !== obj2[objKey]) {
                return false;
            }
        }
        return true;
    }

    const compareTwoArray = (arr1, arr2) => {
        for(var i=0; i<arr1.length; i++) {
            if(!deepCompareTwoObject(arr1[i], arr2[i]))
                return false;
        }
        return true;
    }

    const hanleUpdateIntroduction = (e) => {
        console.log("eee: ", editingCheck)
        if(editingCheck===true) {
            setUpdateIntroductionLoading(true);
            axios.put(`${api}introductions/1`, {name: "Giới thiệu 1.2",
            domainId: 999, introductionInfoRequestDTOS: fields})
                .then(res => {
                    console.log("res: ", res);
                    setUpdateIntroductionLoading(false);
                    setBackupFields([...fields]);
                    setEditingCheck(false);
                })
                .then(() => {
                    setSavedNotification(true);
                    setTimeout(() => {
                        setSavedNotification(false)
                    }, 3000)
                })
                .catch(error => {
                    console.log("error: ", error);
                })
        }
    }

    window.onresize = () => {
        var width = window.screen.width;
        if(width < 1000) {
            setShowReview(false);
        }
    }

    const handleReview = (e) => {
        var width = window.screen.width;
        if(width < 1000) {
            document.getElementById('review')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            setShowReview(!showReview);
        }
    }

    return (
        <>  
            <div className='management-introduction'>
                <div className='management-introduction__modify'>
                    <div className={!showReview ? 'management-introduction__modify__button-show-review' : 'management-introduction__modify__button-show-review management-introduction__modify__button-show-review--hide'} onClick={handleReview}>
                        {
                            showReview ? <span style={{color: 'rgb(129, 0, 0)'}}>
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="15px" height="15px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
                                Đóng
                            </span>
                            : <span style={{color: 'green'}}>Xem lại</span>
                        }
                    </div>

                    <div className='none' style={{height: '25px'}}></div>
                    <div className='management-introduction__modify__field-list'>
                        {
                            fields.map((field, index) => {
                                return (
                                    <div key={index} className='management-introduction__modify__field-list__item'>
                                        <div className='management-introduction__modify__field-list__item__title'>
                                            <input
                                                value = {field.introductionKey}
                                                onChange={(e) => handleUpdateFieldName(e, index)}
                                                placeholder='Tiêu đề'
                                            />
                                            <div className='remove-icon' onClick={(e) => handleDeleteField(e, index)}>
                                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 108.294 122.88" enable-background="new 0 0 108.294 122.88">
                                                    <g>
                                                        <path d="M4.873,9.058h33.35V6.2V6.187c0-0.095,0.002-0.186,0.014-0.279c0.075-1.592,0.762-3.037,1.816-4.086l-0.007-0.007 c1.104-1.104,2.637-1.79,4.325-1.806l0.023,0.002V0h0.031h19.884h0.016c0.106,0,0.207,0.009,0.309,0.022 c1.583,0.084,3.019,0.76,4.064,1.81c1.102,1.104,1.786,2.635,1.803,4.315l-0.003,0.021h0.014V6.2v2.857h32.909h0.017 c0.138,0,0.268,0.014,0.401,0.034c1.182,0.106,2.254,0.625,3.034,1.41l0.004,0.007l0.005-0.007 c0.851,0.857,1.386,2.048,1.401,3.368l-0.002,0.032h0.014v0.032v10.829c0,1.472-1.195,2.665-2.667,2.665h-0.07H2.667 C1.195,27.426,0,26.233,0,24.762v-0.063V13.933v-0.014c0-0.106,0.004-0.211,0.018-0.315v-0.021 c0.089-1.207,0.624-2.304,1.422-3.098l-0.007-0.002C2.295,9.622,3.49,9.087,4.81,9.069l0.032,0.002V9.058H4.873L4.873,9.058z M77.79,49.097h-5.945v56.093h5.945V49.097L77.79,49.097z M58.46,49.097h-5.948v56.093h5.948V49.097L58.46,49.097z M39.13,49.097 h-5.946v56.093h5.946V49.097L39.13,49.097z M10.837,31.569h87.385l0.279,0.018l0.127,0.007l0.134,0.011h0.009l0.163,0.023 c1.363,0.163,2.638,0.789,3.572,1.708c1.04,1.025,1.705,2.415,1.705,3.964c0,0.098-0.009,0.193-0.019,0.286l-0.002,0.068 l-0.014,0.154l-7.393,79.335l-0.007,0.043h0.007l-0.016,0.139l-0.051,0.283l-0.002,0.005l-0.002,0.018 c-0.055,0.331-0.12,0.646-0.209,0.928l-0.007,0.022l-0.002,0.005l-0.009,0.018l-0.023,0.062l-0.004,0.021 c-0.118,0.354-0.264,0.698-0.432,1.009c-1.009,1.88-2.879,3.187-5.204,3.187H18.13l-0.247-0.014v0.003l-0.011-0.003l-0.032-0.004 c-0.46-0.023-0.889-0.091-1.288-0.202c-0.415-0.116-0.818-0.286-1.197-0.495l-0.009-0.002l-0.002,0.002 c-1.785-0.977-2.975-2.882-3.17-5.022L4.88,37.79l-0.011-0.125l-0.011-0.247l-0.004-0.116H4.849c0-1.553,0.664-2.946,1.707-3.971 c0.976-0.955,2.32-1.599,3.756-1.726l0.122-0.004v-0.007l0.3-0.013l0.104,0.002V31.569L10.837,31.569z M98.223,36.903H10.837 v-0.007l-0.116,0.004c-0.163,0.022-0.322,0.106-0.438,0.222c-0.063,0.063-0.104,0.132-0.104,0.179h-0.007l0.007,0.118l7.282,79.244 h-0.002l0.002,0.012c0.032,0.376,0.202,0.691,0.447,0.825l-0.002,0.004l0.084,0.032l0.063,0.012h0.077h72.695 c0.207,0,0.399-0.157,0.518-0.377l0.084-0.197l0.054-0.216l0.014-0.138h0.005l7.384-79.21L98.881,37.3 c0-0.045-0.041-0.111-0.103-0.172c-0.12-0.118-0.286-0.202-0.451-0.227L98.223,36.903L98.223,36.903z M98.334,36.901h-0.016H98.334 L98.334,36.901z M98.883,37.413v-0.004V37.413L98.883,37.413z M104.18,37.79l-0.002,0.018L104.18,37.79L104.18,37.79z M40.887,14.389H5.332v7.706h97.63v-7.706H67.907h-0.063c-1.472,0-2.664-1.192-2.664-2.664V6.2V6.168h0.007 c-0.007-0.22-0.106-0.433-0.259-0.585c-0.137-0.141-0.324-0.229-0.521-0.252h-0.082h-0.016H44.425h-0.031V5.325 c-0.213,0.007-0.422,0.104-0.576,0.259l-0.004-0.004l-0.007,0.004c-0.131,0.134-0.231,0.313-0.259,0.501l0.007,0.102V6.2v5.524 C43.554,13.196,42.359,14.389,40.887,14.389L40.887,14.389z"/>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>  
                                        <textarea className='management-introduction__modify__field-list__item__value' 
                                                value={field.introductionValue} 
                                                onChange={(e) => handleUpdateFieldValue(e, index)}
                                                placeholder='Nội dung'
                                                />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='management-introduction__modify__add-new'>
                        <button onClick={(e) => handleAddField(e)}>
                            Thêm trường mới
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000">
                                <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                                <g><path d="M500,990C229.8,990,10,770.2,10,500C10,229.8,229.8,10,500,10c270.2,0,490,219.8,490,490C990,770.2,770.2,990,500,990z M500,56.7C255.6,56.7,56.7,255.5,56.7,500c0,244.4,198.8,443.3,443.3,443.3S943.3,744.4,943.3,500C943.3,255.6,744.4,56.7,500,56.7z"/>
                                <path d="M738.4,526.5h-212v212c0,14.7-11.9,26.5-26.5,26.5c-14.7,0-26.5-11.9-26.5-26.5v-212h-212c-14.6,0-26.5-11.9-26.5-26.5c0-14.6,11.9-26.5,26.5-26.5h212V261.6c0-14.7,11.9-26.5,26.5-26.6c14.7,0,26.5,11.9,26.5,26.6v212h212c14.6,0,26.5,11.9,26.5,26.5C764.9,514.6,753.1,526.5,738.4,526.5L738.4,526.5z"/>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className='management-introduction__modify__button'>
                        <div className={!savedNotification ? 'management-introduction__modify__button__notification' : 'management-introduction__modify__button__notification management-introduction__modify__button__notification--active'}>
                            Đã lưu
                        </div>
                        {/* <div className='management-introduction__modify__button__cancel' onClick={(e) => handleCancelChange(e)}>
                            Hủy thay đổi
                        </div> */}
                        <div className='management-introduction__modify__button__update' onClick={(e) => hanleUpdateIntroduction(e)} id='review'>
                            {
                                updateIntroductionLoading ? <div class="spinner-border" role="status"><span class="sr-only">Loading...</span> </div>
                                : 
                                <span>
                                    Lưu
                                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 511.52"><path fill-rule="nonzero" d="M36.75 0h438.5C495.55 0 512 16.82 512 37.03v437.46c0 20.19-16.47 37.03-36.75 37.03H98.28c-2.89 0-5.5-1.17-7.39-3.06L3.06 420.62A10.387 10.387 0 0 1 0 413.24V37.03C0 16.81 16.45 0 36.75 0zM174.5 447.79c-13.75 0-13.75-20.9 0-20.9h153.97c13.74 0 13.74 20.9 0 20.9H174.5zm0-64.38c-13.75 0-13.75-20.9 0-20.9h153.97c13.74 0 13.74 20.9 0 20.9H174.5zm209.51 106.91V350.25c0-16.78-13.87-30.64-30.65-30.64H149.6c-16.78 0-30.64 13.86-30.64 30.64v140.07h265.05zm20.89-140.07v140.37h70.35c8.85 0 15.85-7.37 15.85-16.13V37.03c0-8.78-6.99-16.13-15.85-16.13H404.9v170.17c0 28.31-23.23 51.55-51.54 51.55H149.6c-28.34 0-51.54-23.21-51.54-51.55V20.9H36.75c-8.87 0-15.85 7.34-15.85 16.13v371.88l77.16 77.16V350.25c0-28.32 23.22-51.54 51.54-51.54h203.76c28.22 0 51.54 23.32 51.54 51.54zm-20.89-159.18V20.9H118.96v170.17c0 16.8 13.85 30.65 30.64 30.65h203.76c16.77 0 30.65-13.88 30.65-30.65z"/>
                                    </svg>
                                </span>
                            }
                        </div>
                    </div>
                </div>
                {/* style={{width: showReviewMinScreen? '47%' : '100%'}} */}
                <div className={!showReview ? 'management-introduction__review' : 'management-introduction__review management-introduction__review--active'}>
                    <div className={showReview ? 'management-introduction__review__virtual' : 'management-introduction__review__virtual management-introduction__review__virtual--hide'}>
                        <div className='none' style={{height: '35px'}}></div>
                        {
                            fields.map((field, index) => {
                                return <div key={index} className='management-introduction__review__item'>
                                    <div className='management-introduction__review__item__title'>
                                        {field.introductionKey}
                                    </div>
                                    <div className='management-introduction__review__item__content'>
                                        {nl2br(field.introductionValue)}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
