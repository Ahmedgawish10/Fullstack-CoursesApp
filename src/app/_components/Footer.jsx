import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <div className="footer">
      <div className="part-two-footer">
        <div className="container w-[90%] mx-auto">
          <div className="two-section">
            <div className="company">
              <div className="one">
                <h2>Company</h2>
                <Link href="/about">About Us</Link>
                <Link href="/team">Team</Link>
                <Link href="/careers">Careers</Link>
                <Link href="/blog">Blog</Link>
              </div>
              <div className="one">
                <h2>Contact</h2>
                <Link href="/help">Help & Support</Link>
                <Link href="/partner">Partner with Us</Link>
                <Link href="/write">Write with Us</Link>
              </div>
              <div className="one">
                <h2>Legal</h2>
                <Link href="/terms">Terms & Conditions</Link>
                <Link href="/refund">Refund & Cancellation</Link>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/cookies">Cookie Policy</Link>
              </div>
            </div>

            <div className="follow-us">
              <h2>Follow Us</h2>
              <div className="icon-social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><span></span></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><span></span></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><span></span></a>
              </div>
              <p>Receive exclusive offers in your mailbox</p>

              <div className="form-up">
                <div className="form-center">
                  <form action="#">
                    <div className="align">
                      <div>
                        <input type="email" name="" placeholder="Enter Your Email" id="" />
                      </div>
                      <div className="subscribe">
                        <div className="sub">
                          <button type="submit">Subscribe</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-footer1">
        <div className="container w-[90%] mx-auto">
          <div className="hero-footer">
            <div className="left">
              All rights Reserved &reg; Courses Tec, 2024
            </div>
            <div className="right">Made With ❤ BY Gawish</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer