import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-olive-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-luxury font-bold mb-4">KRUTHANYA</h3>
            <p className="text-gray-200 text-sm">
              Premium saree collection bringing elegance and tradition together. Experience luxury crafted with passion.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li>
                <Link to="/contact" className="hover:text-beige transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-beige transition">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-beige transition">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-beige transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li>
                <Link to="/about" className="hover:text-beige transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-beige transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-beige transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-beige transition">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-gray-200 text-sm">
              <div className="flex items-center gap-2">
                <FaPhone className="text-beige" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-beige" />
                <span>info@kruthanya.com</span>
              </div>
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-beige mt-1" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-opacity-30 border-white pt-8 pb-8">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="text-white hover:text-beige transition text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-white hover:text-beige transition text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-white hover:text-beige transition text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-white hover:text-beige transition text-2xl">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-opacity-30 border-white pt-6">
          <div className="text-center text-gray-300 text-sm">
            <p>&copy; {new Date().getFullYear()} KRUTHANYA. All rights reserved. Made with ❤️ for saree lovers.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
