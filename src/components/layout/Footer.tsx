import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="font-bold text-xl">ShahMedical</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted online medical store for quality healthcare products
              and medicines.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Health Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/bundles"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Care Bundles
                </Link>
              </li>
              <li>
                <Link
                  to="/rewards"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Sehat Rewards
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products?category=medicines"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Medicines
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=vitamins"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Vitamins & Supplements
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=personal-care"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Personal Care
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=first-aid"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  First Aid
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>123 Medical Plaza, Health District, City 12345</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support@ShahMedical.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} ShahMedical. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
