import React from 'react'
import LandingPageSection from './LandingPageSection'

const LandingPageSectionFive = () => {
    return (
        <div>
            <LandingPageSection
                color="#FFFFFF"
                heading="Keep your mind sharp with games"
                paragraph="Take a break and reconnect with your network through quick daily games."
                textButtons={[
                    "Zip",
                    "Mini Sudoku",
                    "Queens",
                    "Tango",
                    "Pinpoint",
                    "Crossclimb",
                ]}
            />
        </div>
    )
}

export default LandingPageSectionFive