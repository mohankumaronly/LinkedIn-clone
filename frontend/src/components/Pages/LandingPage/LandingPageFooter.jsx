import React from "react";
import LinkedLogo from "../../../assets/LinkedIn.svg";

const LandingPageFooter = () => {
  const linkClass =
    "block text-sm text-gray-600 hover:underline py-0.5 leading-6";

  return (
    <footer className="bg-[#F6F5F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-y-10 md:gap-y-0 md:gap-x-8 py-12">

          <div className="flex items-start justify-start space-x-2">
            <h1 className="text-2xl font-semibold text-[#0A66C2]">Linked</h1>
            <img src={LinkedLogo} alt="placeholderImage" className="h-7 w-7" />
          </div>
          
          <div className="flex justify-start">
            <nav>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">General</h3>
              <ul>
                <li><a className={linkClass} href="#">Sign Up</a></li>
                <li><a className={linkClass} href="#">Help Center</a></li>
                <li><a className={linkClass} href="#">About</a></li>
                <li><a className={linkClass} href="#">Press</a></li>
                <li><a className={linkClass} href="#">Blog</a></li>
                <li><a className={linkClass} href="#">Careers</a></li>
                <li><a className={linkClass} href="#">Developers</a></li>
              </ul>
            </nav>
          </div>

          <div className="flex justify-start">
            <nav>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Browse LinkedIn</h3>
              <ul>
                <li><a className={linkClass} href="#">Learning</a></li>
                <li><a className={linkClass} href="#">Jobs</a></li>
                <li><a className={linkClass} href="#">Games</a></li>
                <li><a className={linkClass} href="#">Mobile</a></li>
                <li><a className={linkClass} href="#">Services</a></li>
                <li><a className={linkClass} href="#">Products</a></li>
                <li><a className={linkClass} href="#">Top Companies Hub</a></li>
              </ul>
            </nav>
          </div>

          <div className="flex justify-start">
            <nav>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Business Solutions</h3>
              <ul>
                <li><a className={linkClass} href="#">Talent</a></li>
                <li><a className={linkClass} href="#">Marketing</a></li>
                <li><a className={linkClass} href="#">Sales</a></li>
                <li><a className={linkClass} href="#">Learning</a></li>
              </ul>
            </nav>
          </div>

          <div className="flex justify-start">
            <nav>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Directories</h3>
              <ul>
                <li><a className={linkClass} href="#">Members</a></li>
                <li><a className={linkClass} href="#">Jobs</a></li>
                <li><a className={linkClass} href="#">Companies</a></li>
                <li><a className={linkClass} href="#">Featured</a></li>
                <li><a className={linkClass} href="#">Learning</a></li>
                <li><a className={linkClass} href="#">Posts</a></li>
                <li><a className={linkClass} href="#">Articles</a></li>
                <li><a className={linkClass} href="#">Schools</a></li>
                <li><a className={linkClass} href="#">News</a></li>
                <li><a className={linkClass} href="#">News Letters</a></li>
                <li><a className={linkClass} href="#">Services</a></li>
                <li><a className={linkClass} href="#">Products</a></li>
                <li><a className={linkClass} href="#">Advice</a></li>
                <li><a className={linkClass} href="#">People Search</a></li>
              </ul>
            </nav>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
