import React from "react"
import clsx from "clsx"
import styles from "./NFooter.module.css"

const NFooter = () => {

    return (<>
        <div className={clsx(styles.footer)}>
        <div className={clsx(styles.part, styles.intro)}>
            <h4>Giới thiệu</h4>
            <div className={clsx(styles.line)}></div>
            <ul className={clsx(styles.list)}>
                <li className={clsx(styles.item)}>Trung tâm Chuyển giao Công nghệ và Dịch vụ là đơn vị trực thuộc Trường Đại học Cần Thơ.</li>
                <li className={clsx(styles.item)}>Tên giao dịch tiếng Việt: Trung tâm Chuyển giao công nghệ và Dịch vụ.</li>
                <li className={clsx(styles.item)}>Tên tiếng Anh: Center for Technology Transfer and Services.</li>
            </ul>
        </div>
        <div className={clsx(styles.part, styles.contact)}>
            <h4>Liên hệ</h4>
            <div className={clsx(styles.line)}></div>
            <ul className={clsx(styles.list)}>
                <li className={clsx(styles.item)}>Địa chỉ: Khu II, Trường Đại học Cần Thơ, đường 3/2, phường Xuân Khánh, quận Ninh Kiều, thành phố Cần Thơ.</li>
                <li className={clsx(styles.item)}>Mã số thuế: 1800424257-008.</li>
                <li className={clsx(styles.item)}>Điện thoại: 0292. 3734.652 - 3872.889.</li>
                <li className={clsx(styles.item)}>Website: <a href="http://ctts.ctu.edu.vn">http://ctts.ctu.edu.vn</a></li>
                <li className={clsx(styles.item)}>Email: ttcgcndv@ctu.edu.vn</li>
            </ul>
        </div>
        <div className={clsx(styles.part, styles.feature)}>
            <h4>Nhiệm vụ</h4>
            <div className={clsx(styles.line)}></div>
            <ul className={clsx(styles.list)}>
                <li className={clsx(styles.item)}>Trung tâm là đơn vị sự nghiệp có thu, tự đảm bảo chi phí hoạt động, trực thuộc Trường Đại học Cần Thơ.</li>
                <li className={clsx(styles.item)}>Trung tâm có tư cách pháp nhân (có con dấu, tài khoản, mã số thuế riêng) và hoạt động theo mô hình trung tâm.</li>            </ul>
        </div>
        <div className={clsx(styles.part, styles.cooperate)}>
            <h4>Hợp tác</h4>
            <div className={clsx(styles.line)}></div>
            <p>Hiện nay, đơn vị đang hợp tác cùng với cán bộ thuộc các Khoa của Trường Đại học Cần Thơ và các địa phương ĐBSCL, thực hiện các đề tài nghiên cứu khoa học và chuyển giao các quy trình, công nghệ phục vụ cho sự phát triển KT-XH của từng địa phương</p>
        </div>
    </div>
    <div className={clsx(styles.right)}>
        Copyright Can Tho University. All rights reserved
    </div>
    </>)

}

export default NFooter 