export const fields = [
    {
        name: 'fullName',
        label: 'Họ tên',
        type: 'text',
        placeholder: 'Họ tên',
        required: true,
        className: 'form-control',
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Email',
        required: true,
        className: 'form-control',
    },
    {
        name: 'phoneNumber',
        label: 'Số điện thoại',
        // validate for phone number
        type: 'tel',
        placeholder: 'Số điện thoại',
        required: true,
        className: 'form-control',
    },
    {
        name: 'address',
        label: 'Địa chỉ',
        type: 'text',
        placeholder: 'Địa chỉ',
        required: true,
        className: 'form-control',
    },
    {
        name: 'gender',
        label: 'Giới tính',
        type: 'combobox',
        placeholder: 'Giới tính',
        required: true,
        className: 'form-control',
    },
    {
        name: 'username',
        label: 'Tên đăng nhập',
        type: 'text',
        placeholder: 'Tên đăng nhập',
        required: true,
        className: 'form-control',
        minLength: 8
    },
    {
        name: 'password',
        label: 'Mật khẩu',
        type: 'password',
        placeholder: 'Mật khẩu',
        required: true,
        className: 'form-control',
        minLength: 8
    },
    {
        name: 'getNews',
        label: 'Nhận thông báo',
        type: 'checkbox',
        // placeholder: 'Họ tên',
        required: true,
        className: 'form-control',
    },
]