import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";


const Footer = () => {
  return (
      <div className="mt-3 text-m">
          
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Support</h3>
              <ul className="space-y-1">
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Safety Information
                  </Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Cancellation Options
                  </Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Our COVID-19 Response
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <ul className="space-y-1">
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Forum
                  </Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Diversity & Belonging
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Hosting</h3>
              <ul className="space-y-1">
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Try Hosting
                  </Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    AirCover for Hosts
                  </Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Host Resources
                  </Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Community Forum
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <ul className="space-y-1">
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Company
                  </Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Press
                  </Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-cyan-300">
                    Investors
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-6 bg-gray-600" />
          <p className="text-center text-gray-400">
            &copy; 2024 YourCompany. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
