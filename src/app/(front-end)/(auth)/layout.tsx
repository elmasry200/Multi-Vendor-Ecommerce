

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-1 mx-auto md:min-h-screen lg-py-0">
                {/* <a href="#" 
                className="flex items-center mb-3 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img
                    className="w-8 h-8 mr-2"
                     src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                     alt="logo" 
                     />
                     Limi Ecommerce
                </a> */}
               {children}
            </div>
        </section>
    )
}

export default AuthLayout;