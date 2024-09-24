import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <div className="mt-3 text-m">
          <footer className="footer bg-gray-100 text-gray-600 border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">About</h3>
            <ul className="list-none space-y-2">
              <li><Link href="#">How Airbnb works</Link></li>
              <li><Link href="#">Newsroom</Link></li>
              <li><Link href="#">Investors</Link></li>
              <li><Link href="#">Airbnb Plus</Link></li>
              <li><Link href="#">Airbnb Luxe</Link></li>
            </ul>
          </div>
          
          {/* Column 2 */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Community</h3>
            <ul className="list-none space-y-2">
              <li><Link href="#">Diversity & Belonging</Link></li>
              <li><Link href="#">Against Discrimination</Link></li>
              <li><Link href="#">Accessibility</Link></li>
              <li><Link href="#">Airbnb Associates</Link></li>
              <li><Link href="#">Frontline Stays</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Host</h3>
            <ul className="list-none space-y-2">
              <li><Link href="#">Host your home</Link></li>
              <li><Link href="#">Host an Online Experience</Link></li>
              <li><Link href="#">Host an Experience</Link></li>
              <li><Link href="#">Responsible hosting</Link></li>
              <li><Link href="#">Community Center</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Support</h3>
            <ul className="list-none space-y-2">
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Trust & Safety</Link></li>
              <li><Link href="#">Cancellation options</Link></li>
              <li><Link href="#">Our COVID-19 Response</Link></li>
              <li><Link href="#">Supporting people with disabilities</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center border-t pt-4 text-sm">
          <p>&copy; 2024 Airbnb, Inc. · <Link href="#">Privacy</Link> · <Link href="#">Terms</Link> · <Link href="#">Sitemap</Link> · <Link href="#">Company details</Link></p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
