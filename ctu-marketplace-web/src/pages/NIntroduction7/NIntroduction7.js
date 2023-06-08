import React, { useEffect, useState } from 'react'
import './NIntroduction7.scss'
import axios from 'axios';
import nl2br from 'react-nl2br';

export default function NIntroduction7() {
    const [introduction, setIntroduction] = useState([]);
    useEffect(() => {
        axios.get('https://marketplace.ctu.edu.vn/api/v3/introductions/1')
            .then(res => {
                setIntroduction(res.data.data.introductionInfos)
                console.log("res: ", res)
            })
    }, [])

    const handleClickHighlighter = (e, id) => {
        // document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
        const yOffset = -10; 
        const element = document.getElementById(id);
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({top: y-150, behavior: 'smooth'});
    }

    return (<>
        <div className='introduction-view'>
            <div className='introduction-view__header row'>
                <div tiv className='introduction-view__header__title col-md-3 col-sm-4'>
                    Giới thiệu
                </div>
                <div tiv className='introduction-view__header__highlighter col-md-9 col-sm-8'>
                    <ul>
                        {
                            introduction.map((item, index) => {
                                return <li><span onClick={(e) => handleClickHighlighter(e, 'abc'+index)}>{item.introductionKey}</span></li>
                            })    
                        }
                    </ul>
                </div>
            </div>
            {/* <hr/> */}
            <div className='introduction-view__content'>
                {
                    introduction.map((item, index) => {
                        return <div className='introduction-view__content__item'>
                            <div className='introduction-view__content__item__title' id={'abc' + index}>
                                {item.introductionKey}
                            </div>
                            <div className='introduction-view__content__item__value'>
                                {nl2br(item.introductionValue)}
                            </div>
                        </div>
                    })
                    
                }
                
            </div>
        </div>
    </>
    )
}
