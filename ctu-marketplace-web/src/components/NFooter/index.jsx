import React, { useEffect, useState } from "react"
import clsx from "clsx"
import styles from "./NFooter.module.css"
import axios from "axios"
import nl2br from "react-nl2br"

const NFooter = () => {

    const [footer, setFooter] = useState([])

    useEffect(() => {
        axios.get('https://marketplace.ctu.edu.vn/api/v3/footers')
            .then(res => {
                setFooter(res.data.data[0].newFooterInfos)
                console.log("res: ", res)
            })
    }, [])
    return (<>
        <div className={clsx(styles.footer)}>
            
            {
                footer.map((item, index) => {
                    return <div key={index} className={clsx(styles.part, styles.intro)}>
                        <h4>{item.footerKey}</h4>
                        <div className={clsx(styles.line)}></div>
                        <ul className={clsx(styles.list)}>
                          <li className={clsx(styles.item)}>{nl2br(item.footerValue)}</li>
                        </ul>
                    </div>
                })
            }
            
        </div>

        <div className={clsx(styles.right)}>
            Copyright Can Tho University. All rights reserved
        </div>

        </>
    )

}

        export default NFooter 