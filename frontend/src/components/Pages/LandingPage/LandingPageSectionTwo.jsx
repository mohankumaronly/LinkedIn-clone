import React from 'react'
import LandingPageSection from './LandingPageSection'

const LandingPageSectionTwo = () => {
    return (
        <div>
            <LandingPageSection
                color="#FFFFFF"
                heading="Find the right job or internship for you"
                paragraph=""
                textButtons={[
                    "Engineering",
                    "Business Development",
                    "Finance",
                    "Administrative Assistant",
                    "Retail Associate",
                    "Customer Service",
                    "Operations",
                    "Information Technology",
                    "Marketing",
                    "Human Resources",
                    "Show more "
                ]}
            />
        </div>
    )
}

export default LandingPageSectionTwo