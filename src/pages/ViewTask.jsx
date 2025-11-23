import React from 'react'
import ReactDOM from 'react-dom'
import WorkingLayout from '../layouts/WorkingLayout'
import { Link } from 'react-router'
import purify from '../services/purify'
function ViewTask() {

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
    return (
        <WorkingLayout>
            <div className='w-full h-[920px]  border p-6 pt-14 rounded-xl border-gray-500 mb-10'>
                <Link onClick={() => {
                    if (window.history.length > 1) navigate(-1)
                    else navigate('/')
                }}>
                    <span
                        className="absolute cursor-pointer top-5 right-10 text-lg text-(--color-primary) underline font-semibold"
                        onClick={() => {
                            if (window.history.length > 1) navigate(-1)
                            else navigate('/')
                        }}
                    >
                        Go back
                    </span>
                </Link>

                <div className='flex items-start justify-start gap-6'>
                    {/* Hinh anh cho task */}
                    <div
                        className='bg-slate-100 font-medium text-lg cursor-pointer flex items-center justify-center rounded-xl w-[210px] h-[210px] mr-2 bg-cover bg-center bg-no-repeat'
                        style={{}}

                    >
                    </div>

                    <div className='flex-1'>
                        <h2 className='font-semibold text-2xl w-full line-clamp-2 text-black'>Visit Nicholas Birthday Party</h2>
                        <p className='text-black text-base mt-4'>Priority:
                            <span> Moderate</span>
                        </p>
                        <p className='mt-4 text-black'>Status: <span className='text-(--color-not-started)'>Not started</span></p>
                        <p className='text-sm text-(--color-text-desc) mt-4'>Created On <span>19/01/2006</span></p>
                    </div>
                </div>


                <div
                    className='w-full mt-8 h-[540px] border-2 overflow-y-auto rounded-md p-1 text-base border-slate-200  bg-white text-black outline-0'
                    dangerouslySetInnerHTML={{ __html: purify(content) }}
                >

                </div>

                <div className='w-full mt-4 flex items-center justify-end gap-4 font-semibold text-white'>
                    <div className='w-9 h-9 cursor-pointer bg-(--color-primary) rounded-lg flex items-center justify-center'>
                        <i class="fa-regular fa-pen-to-square"></i>
                    </div>
                    <div className='w-9 h-9 cursor-pointer bg-(--color-primary) rounded-lg flex items-center justify-center'>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                    {/* nghien cuu them khi xoa hay cap nhat thay doi task thi chuyen gi se xay ra */}
                </div>
            </div>
        </WorkingLayout>

    )
}
export default ViewTask