import React from 'react'
import { ThumbsUp, MessageSquareMore, Repeat2, Send } from 'lucide-react';

const FeedCardComponent = () => {
    return (
        <div>
            <div className='w-170 space-y-3 shadow-2xl p-4 rounded-sm bg-white'>
                <div className='flex space-x-3'>
                    <div className='bg-gray-500 w-14 h-14 rounded-full'>

                    </div>
                    <div>
                        <h1 className='text-lg font-semibold'>User name</h1>
                        <p>user bio Lorem ipsum dolor sit amet,</p>
                    </div>

                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore reiciendis temporibus itaque repellendus explicabo optio velit ab quaerat, laboriosam consectetur deleniti quidem pariatur ea obcaecati sapiente, quod nisi. Accusantium, harum!</p>
                <div>
                    <div className='h-100 w-full bg-gray-400 flex items-center justify-center font-semibold text-2xl'>
                        <h1>image will display here</h1>
                    </div>
                </div>
                <div className='h-px bg-gray-400'>

                </div>
                <div className='flex items-center justify-between py-4'>
                    <div className='flex space-x-1'>
                        < ThumbsUp />
                        <h1>Like</h1>
                    </div>
                    <div className='flex space-x-1'>
                        < MessageSquareMore />
                        <h1>Comment</h1>
                    </div>
                    <div className='flex space-x-1'>
                        < Repeat2 />
                        <h1>Repost</h1>
                    </div>
                    <div className='flex space-x-1'>
                        < Send />
                        <h1>Send</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedCardComponent