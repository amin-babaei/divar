
const Input = ({ lable, formik, name, type, className, placeholder = "" }) => {
    return (
        <div className={className}>
            <label className="flex mb-2 text-sm text-gray-500" htmlFor={name}>
                {lable}
                {formik.touched[name] && formik.errors[name] ? (
                    <div className="flex-1 ml-2 text-rose-500 text-left text-xs">{formik.errors[name]}</div>
                ):null}
            </label>
            <input
                id={name}
                name={name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                type={type || 'text'}
                placeholder={placeholder}
                className='w-full rounded-md focus:border-gray-300 focus:ring-0'
            />
        </div>
    )
}

export default Input