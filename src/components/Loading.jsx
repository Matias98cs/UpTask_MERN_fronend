import { Oval } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className='flex h-screen w-full justify-center items-center m-auto py-5'>
            <Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}

            />
        </div>
    )
}

export default Loading