const Modal = ({ reference, title, desc, children }) => {
    return (
        <div className="relative z-10">
            <div className="fixed inset-0 bg-gray-600 opacity-50 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white w-full text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                        <div ref={reference} className="bg-white px-6 pt-5">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-right">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
                                    <div className="mt-5">
                                        <p className="text-sm text-gray-500">{desc}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 mt-5 gap-x-5 gap-y-3 flex sm:px-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal