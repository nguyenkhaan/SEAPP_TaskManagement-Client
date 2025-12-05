import React from 'react'
import ReactDOM from 'react-dom'
import WorkingLayout from '../layouts/WorkingLayout'
import { Link } from 'react-router'
import purify from '../services/purify'
import TaskServices from '../services/TaskServices'
import { useQuery } from '@tanstack/react-query'
import LoadingModal from './LoadingModal'
import ParamServices from '../services/urlParams'
import { getStatusString } from '../services/getStatusColor'
import UrlError from './URLError'
function ViewTask() {
    const currentTaskID = ParamServices.getID() 
    if (!currentTaskID || isNaN(currentTaskID)) return <UrlError /> 
    const {data , isPending , error } = useQuery({
        queryKey: [`tasks-${currentTaskID}`], 
        queryFn: async () => {
            const responseData = await TaskServices.getTaskDetail(currentTaskID) 
            console.log('Log ra tu view task: ' , responseData.data.data)
            return responseData
        },
        staleTime: 1000 * 8 * 60,
        gcTime: 1000 * 8 * 60,
    })
    //Mot task se bao gom: taskTitle, priority, content (raw HTML), date , status ,  
    
    const content = `  
    <div style="padding: 20px; font-family: Arial, sans-serif; line-height: 1.6;">
    <p>
        <strong>Cuộc sống</strong> giống như một <em>cuốn sách</em>, mỗi ngày ta lại viết thêm một trang mới. 
        Có những dòng <i>nhẹ nhàng</i>, có những đoạn <strong>đậm cảm xúc</strong>, 
        và đôi khi ta phải gạch bỏ vài lỗi sai để viết lại <u>đẹp hơn</u>.
    </p>

    <p>
        Điều quan trọng là ta không ngừng bước tiếp.  
        Hãy để mỗi trang bạn viết <strong><em>đều có giá trị riêng</em></strong>, 
        và khi nhìn lại, bạn sẽ mỉm cười vì những gì mình đã đi qua.
    </p>
        <p>
        Điều quan trọng là ta không ngừng bước tiếp.  
        Hãy để mỗi trang bạn viết <strong><em>đều có giá trị riêng</em></strong>, 
        và khi nhìn lại, bạn sẽ mỉm cười vì những gì mình đã đi qua.
    </p>
        <p>
        Điều quan trọng là ta không ngừng bước tiếp.  
        Hãy để mỗi trang bạn viết <strong><em>đều có giá trị riêng</em></strong>, 
        và khi nhìn lại, bạn sẽ mỉm cười vì những gì mình đã đi qua.
    </p>
        <p>
        Điều quan trọng là ta không ngừng bước tiếp.  
        Hãy để mỗi trang bạn viết <strong><em>đều có giá trị riêng</em></strong>, 
        và khi nhìn lại, bạn sẽ mỉm cười vì những gì mình đã đi qua.
    </p>
        <p>
        Điều quan trọng là ta không ngừng bước tiếp.  
        Hãy để mỗi trang bạn viết <strong><em>đều có giá trị riêng</em></strong>, 
        và khi nhìn lại, bạn sẽ mỉm cười vì những gì mình đã đi qua.
    </p>
        <p>
        Điều quan trọng là ta không ngừng bước tiếp.  
        Hãy để mỗi trang bạn viết <strong><em>đều có giá trị riêng</em></strong>, 
        và khi nhìn lại, bạn sẽ mỉm cười vì những gì mình đã đi qua.
    </p>
        <p>
        Điều quan trọng là ta không ngừng bước tiếp.  
        Hãy để mỗi trang bạn viết <strong><em>đều có giá trị riêng</em></strong>, 
        và khi nhìn lại, bạn sẽ mỉm cười vì những gì mình đã đi qua.
    </p>
        <p>
        Điều quan trọng là ta không ngừng bước tiếp.  
        Hãy để mỗi trang bạn viết <strong><em>đều có giá trị riêng</em></strong>, 
        và khi nhìn lại, bạn sẽ mỉm cười vì những gì mình đã đi qua.
    </p>
        <p>
        Điều quan trọng là ta không ngừng bước tiếp.  
        Hãy để mỗi trang bạn viết <strong><em>đều có giá trị riêng</em></strong>, 
        và khi nhìn lại, bạn sẽ mỉm cười vì những gì mình đã đi qua.
    </p>
        <p>
        Điều quan trọng là ta không ngừng bước tiếp.  
        Hãy để mỗi trang bạn viết <strong><em>đều có giá trị riêng</em></strong>, 
        và khi nhìn lại, bạn sẽ mỉm cười vì những gì mình đã đi qua.
    </p>
    </div>  
    `   //Sample content 
    if (isPending || !data) return <LoadingModal /> 
    return (
        <WorkingLayout>
            <div className='w-full h-[920px] md:border p-6 pt-14 rounded-xl border-gray-500 mb-10'>
                <Link to={`/app/teams`}>
                    <span
                        className="absolute cursor-pointer top-12 md:top-5 right-10 text-lg text-(--color-primary) underline font-semibold"
                
                        title='Quay lại'
                    >
                        Go back
                    </span>
                </Link>

                <div className='flex max-md:flex-col items-start justify-start gap-4 md:gap-6'>
                    {/* Hinh anh cho task */}
                    <div
                        className='bg-slate-100 font-medium text-lg cursor-pointer flex items-center justify-center rounded-xl md:w-[210px] md:h-[210px] w-40 h-40 mr-2 bg-cover bg-center bg-no-repeat'
                        style={{
                            backgroundImage: 'url(https://img.lovepik.com/bg/20231226/Captivating-Blue-Sky-Background-with-Beautiful-Clouds_2490674_wh1200.png)'
                        }}
                        title='Không có đổi ảnh được đâu. Đừng click nữa =))'
                    >
                    </div>

                    <div className='flex-1'>
                        <h2 className='font-semibold text-xl md:text-2xl w-full line-clamp-2 text-black'>{data.data.data.title}</h2>
                        <p className='text-black text-base mt-2 md:mt-4'>Priority:
                            <span> Moderate</span>
                        </p>
                        <p className='mt-2 md:mt-4 text-black'>Status: <span className='text-(--color-not-started)'>{getStatusString(data.data.data.status)}</span></p>
                        <p className='text-sm text-(--color-text-desc) mt-2 md:mt-4'>Due to: <span>19/01/2006</span></p>
                    </div>
                </div>


                <div
                    className='w-full mt-5 md:mt-8 h-[540px] border-2 overflow-y-auto rounded-md p-1 text-base border-slate-200  bg-white text-black outline-0'
                    dangerouslySetInnerHTML={{ __html: purify(data.data.data.description) }}
                >

                </div>

                <div className='w-full mt-4 flex items-center justify-end gap-3 md:gap-4 font-semibold text-white'>
                    <Link to={`/app/update-task?id=${currentTaskID}`}>
                        <div className='w-9 h-9 cursor-pointer bg-(--color-primary) rounded-md md:rounded-lg flex items-center justify-center' title='Edit'>
                            <i class="fa-regular fa-pen-to-square"></i>
                        </div>
                    </Link>
                    
                    <div className='w-9 h-9 cursor-pointer bg-(--color-primary) rounded-md md:rounded-lg flex items-center justify-center' title='Xóa task'>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                    {/* nghien cuu them khi xoa hay cap nhat thay doi task thi chuyen gi se xay ra */}
                </div>
            </div>
        </WorkingLayout>

    )
}
export default ViewTask