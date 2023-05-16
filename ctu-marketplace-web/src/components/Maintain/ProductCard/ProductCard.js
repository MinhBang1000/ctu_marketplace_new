import React from 'react'
import './ProductCard.scss'

export default function ProductCard({projectType, projectName, projectDescription, projectAuthor, projectImage, companyName}) {
    console.log("abc")
  return (
    <>
        <div className="product-card">
            <div className="product-card__description">
                <div className="product-card__description__header">
                    {/* Sản phẩm thương mại */}
                    {projectType}
                </div>
                <div className="product-card__description__name">
                    {/* Bộ phận cắt vỏ của máy bóc vỏ hạt sen tươi */}
                    {projectName}
                </div>
                <div className="product-card__description__brief">
                    {/* Chế phẩm vi sinh chịu mặn dùng cho cây trồng trên nền đất nhiễm mặn, chế phẩm này bao gồm các thành phần hỗn hợp: cám gạo có hàm lượng từ 48% đến 54%, đường có hàm lượng từ 3,5% đến 4%; và chất nền có hàm lượng từ 2,5% đến 3% và nước có hàm lượng từ 40% đến 45%. */}
                    {projectDescription}
                </div>
            </div>
            <div className="product-card__related-info">
                <table>
                    <tr>
                        <td className="title">Tác giả</td>
                        <td className="value">
                            {/* Nguyen Văn A */}
                            {projectAuthor}
                        </td>
                    </tr>
                    <tr>
                        <td className="title">Tác giả</td>
                        <td className="value">
                            {/* Nguyen Văn A */}
                            {projectAuthor}
                        </td>
                    </tr>
                </table>
            </div>
            <div className="product-card__image">
                <img src={projectImage}/>
            </div>
        </div>
    </>
  )
}
