import React from 'react'
import LandingPageSection from './LandingPageSection'

const LandingPageSectionOne = () => {
    return (
        <div>
            <LandingPageSection
                color="#F3F2F0"
                heading="Explore collaborative articles"
                paragraph="We’re unlocking community knowledge in a new way. Experts add insights directly into each article, started with the help of AI."
                textButtons={[
                    "Marketing",
                    "Public Administration",
                    "Healthcare",
                    "Engineering",
                    "IT Services",
                    "Sustainability",
                    "Business Administration",
                    "Telecommunications",
                    "HR Management",
                    "Show all",
                ]}
            />

        </div>
    )
}

export default LandingPageSectionOne