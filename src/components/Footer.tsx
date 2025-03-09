import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">
              eCommerce Store
            </h3>
            <p className="text-gray-500 text-sm">
              Shop the latest products with our easy-to-use online store.
            </p>
          </div>

          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-500 hover:text-primary text-sm transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-500 hover:text-primary text-sm transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">
              Contact Info
            </h3>
            <address className="text-gray-500 text-sm not-italic">
              Email: info@ecommercestore.com
              <br />
              Phone: (123) 456-7890
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} eCommerce Store. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
