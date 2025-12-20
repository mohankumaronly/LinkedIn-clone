<<<<<<< HEAD
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
=======
import PostCard from './HomeScreenComponents/PostComponents/PostCard'
import HomePageAppBar from './HomeScreenComponents/HomeAppBar/HomePageAppBar'
import FeedCardUi from './HomeScreenComponents/FeedCardComponents/components/FeedCardUi'

const MOCK_POSTS = [
    {
        id: 1,
        type: "NORMAL",
        userName: "Arjun Sharma",
        userBio: "Software Engineer at TechCorp",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
        postText: "Just finished refactoring my React components! Separation of concerns makes everything so much cleaner.",
        postImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        initialLikes: 0,
        initialRepostCount: 0,
        commentsFromDB: [
            { id: 101, user: "Sarah", text: "Great work!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
        ]
    },
    {
        id: 2,
        type: "NORMAL",
        userName: "Arjun Sharma",
        userBio: "Software Engineer at TechCorp Software Engineer at TechCorp Software Engineer at TechCorp Software Engineer at TechCorp",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
        postText: "Just finished refactoring my React components! Separation of concerns makes everything so much cleaner.Just finished refactoring my React components! Separation of concerns makes everything so much cleaner.Just finished refactoring my React components! Separation of concerns makes everything so much cleaner.Just finished refactoring my React components! Separation of concerns makes everything so much cleaner.",
        postImage: "https://images.pexels.com/photos/35246550/pexels-photo-35246550.jpeg",
        initialLikes: 0,
        initialRepostCount: 0,
        commentsFromDB: [
            { id: 101, user: "Sarah", text: "Great work!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
        ]
    },
    {
        id: 3,
        type: "NORMAL",
        userName: "Arjun Sharma",
        userBio: "Software Engineer at TechCorp",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
        postText: "Just finished refactoring my React components! Separation of concerns makes everything so much cleaner.",
        postImage: "https://images.pexels.com/photos/31332950/pexels-photo-31332950.jpeg",
        initialLikes: 0,
        initialRepostCount: 0,
        commentsFromDB: [
            // { id: 101, user: "Sarah", text: "Great work!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
        ]
    },
    {
        id: 4,
        type: "NORMAL",
        userName: "Arjun Sharma",
        userBio: "Software Engineer at TechCorp",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
        postText: "Just finished refactoring my React components! Separation of concerns makes everything so much cleaner.",
        postImage: "https://images.pexels.com/photos/31698012/pexels-photo-31698012.jpeg",
        initialLikes: 0,
        initialRepostCount: 0,
        commentsFromDB: [
            { id: 101, user: "Sarah", text: "Great work!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
        ]
    },
    {
        id: 1,
        type: "NORMAL",
        userName: "Arjun Sharma",
        userBio: "Software Engineer at TechCorp",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
        postText: "Just finished refactoring my React components! Separation of concerns makes everything so much cleaner.",
        postImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        initialLikes: 0,
        initialRepostCount: 0,
        commentsFromDB: [
            { id: 101, user: "Sarah", text: "Great work!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
        ]
    },
    {
        id: 2,
        type: "REPOST",
        repostedBy: "Priya Patel",
        repostText: "This is a great insight on system design!",
        userName: "Priya Patel",
        userBio: "Product Manager",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        originalPost: {
            userName: "Tech Daily",
            userBio: "Tech News Outlet",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
            postText: "Microservices vs Monolith: Which one should you choose in 2024?",
            initialLikes: 1200,
            commentsFromDB: [1, 2, 3, 4, 5] // Just needs a length for the badge
        }
    }
];

const Home = () => {
    return (
        <div className='bg-[#F4F2EE]'>
            < HomePageAppBar />
            < PostCard />
            <div className='flex items-center justify-center flex-col mx-4 md:mx-0'>
                <div className='w-full mt-4'>
                    {MOCK_POSTS.map((post) => (
                        <FeedCardUi key={post.id} {...post} />
                    ))}
                </div>
            </div>
>>>>>>> dev
        </div>
    )
}

export default Home