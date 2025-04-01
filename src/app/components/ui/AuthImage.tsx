import Image from 'next/image'
import loginImage from '@/app/assets/images/login_image.png'

const AuthImage = () => {
    return (
        <div className="relative hidden w-1/2 h-screen flex-l items-center justify-center lg:flex rounded-l-3xl">
            <div className="relative z-10 w-full h-full">
                <Image 
                    src={loginImage}
                    alt="Login Image"
                    fill
                    className="object-cover object-center rounded-l-3xl"
                    priority
                />

            </div>
        </div>
    )
}

export default AuthImage