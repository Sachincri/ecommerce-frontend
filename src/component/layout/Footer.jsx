import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <section>
        <div>
          <div>
            <p>ABOUT</p>
            <Link>Contact Us</Link>
            <Link>About Us</Link>
            <Link>Careers</Link>
            <Link>Press</Link>
            <Link>Corporate Infomation</Link>
          </div>
          <div>
            <p>GROUP COMPANIES</p>
            <Link>Myntra</Link>
            <Link>Flipkart Wholesale</Link>
            <Link>Cleartrip</Link>
            <Link>Shopsy</Link>
          </div>
          <div>
            <p>HELP</p>
            <Link>Payments</Link>
            <Link>Shipping</Link>
            <Link>Cancellation & Returns</Link>
            <Link>FAQ</Link>
          </div>
          <div>
            <p>CONSUMER POLICY</p>
            <Link>Cancellation & Returns</Link>
            <Link>Terms Of Use</Link>
            <Link>Security</Link>
            <Link>Privacy</Link>
            <Link>Sitemap</Link>
            <Link>Grievance Redressal</Link>
            <Link>EPR Compliance</Link>
          </div>
        </div>
        <div>
          <div>
            <p>Mail Us:</p>
            <article>
              Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
              Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli
              Village, Bengaluru, 560103, Karnataka, India
            </article>
          </div>
          <div>
            <p>Registered Office Address:</p>
            <article>
              Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
              Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli
              Village, Bengaluru, 560103, Karnataka, India CIN :
              U51109KA2012PTC066107 Telephone: 044-45614700
            </article>
          </div>
        </div>
      </section>
      <section>
        <div>
          <p>Become a Seller</p>
        </div>
        <div>
          <p>Advertise</p>
        </div>
        <div>
          <p>Gift Card</p>
        </div>
        <div>
          <p>Help conter</p>
        </div>
        <div>
          <p>2007-2024 Flipkart.com</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
