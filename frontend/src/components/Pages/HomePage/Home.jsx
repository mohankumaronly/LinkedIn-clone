import React from 'react'
import PostCard from './HomeScreenComponents/PostComponents/PostCard'
import FeedCardComponent from './HomeScreenComponents/FeedCardComponents/FeedCardComponent'

const Home = () => {
    return (
        <div className='flex items-center flex-col space-y-10 bg-[#F4F2EE]'>
           < PostCard/>
           < FeedCardComponent />
           < FeedCardComponent />
           < FeedCardComponent />
           < FeedCardComponent />
           < FeedCardComponent />
           < FeedCardComponent />
        </div>
    )
}

export default Home