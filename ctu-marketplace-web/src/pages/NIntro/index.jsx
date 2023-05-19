import React from "react"
import clsx from "clsx"
import styles from "./NIntro.module.css"

const NIntro = () => {

    return (<div className={clsx(styles.intro)}>
        <div className={clsx(styles.info)}>
            <h1>Thông tin giới thiệu</h1>
            <ul className={clsx(styles.infoList)}>
                <li className={clsx(styles.infoItem)}><a href="#intro_1">Giới thiệu</a></li>
                <li className={clsx(styles.infoItem)}><a href="#intro_2">Chức năng nhiệm vụ</a></li>
                <li className={clsx(styles.infoItem)}><a href="#intro_3">Một số nội dung hợp tác nghiên cứu tiêu biểu</a></li>
            </ul>
        </div>

        <div className={clsx(styles.content)}>
            <h3  id="intro_1">1. Giới thiệu</h3>
            <p><strong>Trung tâm Chuyển giao Công nghệ và Dịch vụ là đơn vị trực thuộc Trường Đại học Cần Thơ.</strong></p>
            <ul>
                <li>Tên giao dịch tiếng Việt: Trung tâm Chuyển giao công nghệ và Dịch vụ.</li>
                <li>Tên tiếng Anh: Center for Technology Transfer and Services.</li>
                <li>Địa chỉ: Khu II, Trường Đại học Cần Thơ, đường 3/2, phường Xuân Khánh, quận Ninh Kiều, thành phố Cần Thơ.</li>
                <li>Mã số thuế: 1800424257-008.</li>
                <li>Điện thoại: 0292. 3734.652 - 3872.889</li>
                <li>Website: <a href="http://ctts.ctu.edu.vn">http://ctts.ctu.edu.vn</a></li>
                <li>Email: ttcgcndv@ctu.edu.vn</li>
            </ul>

            <h3  id="intro_2">2.  Chức năng nhiệm vụ</h3>
            <h4>a. Vị trí của Trung tâm</h4>
            <ul>
                <li>Trung tâm là đơn vị sự nghiệp có thu, tự đảm bảo chi phí hoạt động, trực thuộc Trường Đại học Cần Thơ.</li>
                <li>Trung tâm có tư cách pháp nhân (có con dấu, tài khoản, mã số thuế riêng) và hoạt động theo mô hình trung tâm.</li>
            </ul>
            <h4>b. Chức năng của Trung tâm</h4>
            <ul>
                <li>Thực hiện chức năng tham mưu, quản lý, kiểm tra, giám sát, hỗ trợ và tổ chức các hoạt động sản xuất - dịch vụ; phát triển và chuyển giao khoa học công nghệ của Trường để tạo nguồn thu cho Trường.</li>
            </ul>
            <h4>c. Nhiệm vụ và quyền hạn của Trung tâm</h4>
            <ul>
                <li>Tổ chức hoạt động chuyển giao công nghệ của Trường để đóng góp nguồn thu cho Trường.</li>
                <li>Thương mại hóa các tài sản sở hữu trí tuệ và khai thác tối đa hiệu quả sử dụng tài sản của Trường để tăng nguồn thu cho Trường.</li>
                <li>Tư vấn lập dự án phát triển kinh tế - xã hội cho địa phương.</li>
                <li>Tư vấn và lập chiến lược kinh doanh, kế hoạch phát triển từng giai đoạn cho doanh nghiệp.</li>
                <li>Tư vấn và thực hiện các đề tài, dự án về đất đai các lĩnh vực như: Quản lý và khai thác các nguồn tài nguyên đất đai; Đánh giá, quy hoạch sử dụng đất đai, đô thị, nông thôn; Phân tích thẩm định giá, thị trường bất động sản; Bảo tồn hệ sinh thái đất ngập nước, rừng ngập mặn; Hình thái, vi hình thái, phân loại đất và độ phì đất.</li>
                <li>Thực hiện các lớp tập huấn, bồi dưỡng kiến kiến chuyên ngành bao gồm các lĩnh vực: Nông nghiệp, Thủy sản, Môi trường, Kinh tế, …</li>
            </ul>

            <h3  id="intro_3">3. Một số nội dung hợp tác nghiên cứu tiêu biểu</h3>
            <p>Hiện nay, đơn vị đang hợp tác cùng với cán bộ thuộc các Khoa của Trường Đại học Cần Thơ và các địa phương ĐBSCL, thực hiện các đề tài nghiên cứu khoa học và chuyển giao các quy trình, công nghệ phục vụ cho sự phát triển KT-XH của từng địa phương như sau:</p>
            <ul>
                <li>Nghiên cứu chế biến đa dạng các sản phẩm từ khóm Cầu Đúc Hậu Giang và tận dụng phế liệu cho quá trình ly trích enzyme bromelin.</li>
                <li>Xây dựng các mô hình canh tác hiệu quả trên đất phèn khu vực tái định cư khí điện đạm Cà Mau.</li>
                <li>Nghiên cứu một số biện pháp cải thiện năng suất và hiệu quả kinh tế vườn dừa cũ và khảo sát khả năng phát triển của một số giống dừa có giá trị kinh tế cao tại Cà Mau.</li>
                <li>Nghiên cứu hạn chế sự phát triển của vẹm sông sống bám trên ốc gạo Bến Tre.</li>
                <li>Xây dựng mô hình đánh giá chất lượng chôm chôm ứng với các điều kiện xử lý khác nhau sau thu hoạch tại Bến Tre.</li>
                <li>Chuyển giao kỹ thuật sinh sản nhân tạo cá Tra cho Cty CP XNK thủy sản CT (Casemex).</li>
                <li>Sử dụng enzyme cholinesterase để đánh giá nước nhiễm bẩn thuốc BVTV đến cá lóc đồng.</li>
                <li>Xây dựng quy trình sản xuất rượu vang thốt nốt từ thốt nốt tự nhiên</li>
                <li>Phát triển vùng canh tác gấc cho sản xuất dược liệu tại Tri Tôn, An Giang.</li>
                <li>Thực nghiệm sản xuất giống nhân tạo Cá linh giống An Giang.</li>
                <li>Lai tạo và tuyển chọn giống lúa thơm Bảy Núi chất lượng cao và chống chịu sâu bệnh tốt.</li>
                <li>Nghiên cứu quy trình kỹ thuật ương và nuôi thương phẩm cá Leo.</li>
                <li>Chuyển giao công nghệ nuôi, sơ chế trứng tế bào xác Artemia cho Sở KH&CN Sóc Trăng.</li>
                <li>Xây dựng quy trình quản lý hiện tượng thối trái Gấc tại vùng Bảy Núi - An Giang</li>
                <li>Xây dựng quy trình quản lý tổng hợp bệnh hại quan trọng trên cây Nghệ tại vùng Bảy Núi - An Giang.</li>
                <li>Xây dựng hệ thống quan trắc môi trường nước phục vụ cho sản xuất nông nghiệp huyện Long Mỹ - Hậu Giang</li>
            </ul>
        </div>
    </div>)

}

export default NIntro 