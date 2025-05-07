import React from 'react'
import './privacyPolicy.css'
import { assets } from '../../assets/assets'

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="privacyPolicy-container">
        <div className="left-side">
          <img src={assets.Privacy_policy} alt="Privacy Policy Illustration" />
        </div>
        <div className="right-side">
          <h1>Privacy Policy</h1>
          <p><strong>Effective Date:</strong> April 24, 2025</p>

          <p>Welcome to <strong>UnickTrust | Food Del</strong>. Your privacy is important to us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you interact with our services, website, and mobile platform.</p>

          <h2>1. Information We Collect</h2>
          <h4>a. Personal Information</h4>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Account credentials</li>
            <li>Delivery address</li>
          </ul>

          <h4>b. Usage & Technical Data</h4>
          <ul>
            <li>Device type and browser</li>
            <li>IP address</li>
            <li>Pages visited, features used</li>
            <li>Clicks and actions within the app</li>
            <li>Time and date of access</li>
          </ul>

          <h4>c. Order & Transaction Data</h4>
          <ul>
            <li>Items ordered</li>
            <li>Payment method (processed securely via third-party providers)</li>
            <li>Order history</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Provide access to the platform and services</li>
            <li>Facilitate restaurant orders and deliveries</li>
            <li>Send notifications and updates</li>
            <li>Personalize your user experience</li>
            <li>Improve platform features and performance</li>
            <li>Respond to support inquiries</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Cookies & Tracking Technologies</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Remember your preferences</li>
            <li>Keep you logged in</li>
            <li>Monitor platform performance</li>
            <li>Collect usage analytics</li>
          </ul>
          <p>You may manage or disable cookies in your browser settings, but some features may not function correctly.</p>

          <h2>4. How We Share Your Data</h2>
          <p>We do <strong>not sell your data</strong>. However, we may share it with:</p>
          <ul>
            <li>Service providers (e.g., delivery drivers, payment processors)</li>
            <li>Restaurants fulfilling your order</li>
            <li>Law enforcement or legal authorities, when required</li>
            <li>Analytics providers (aggregated and anonymized only)</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>We use modern security measures such as:</p>
          <ul>
            <li>Encrypted connections (HTTPS)</li>
            <li>Secure password storage</li>
            <li>Access controls and role-based permissions</li>
          </ul>
          <p>Despite our efforts, no system is completely secure. We encourage you to use a strong password and protect your account.</p>

          <h2>6. Your Rights & Choices</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access or update your personal information</li>
            <li>Request deletion of your account</li>
            <li>Withdraw consent or opt-out of marketing</li>
            <li>File a complaint with a data protection authority</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:support@unicktrust.rw">support@unicktrust.rw</a>.</p>

          <h2>7. Children’s Privacy</h2>
          <p>Our services are not intended for individuals under the age of 13. We do not knowingly collect data from children.</p>

          <h2>8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy to reflect changes in the law, our platform, or user feedback. You will be notified of significant changes via email or platform alerts.</p>

          <h2>9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or how your data is handled, please contact us:</p>
          <p>
            📧 <strong>Email:</strong> <a href="mailto:support@unicktrust.rw">support@unicktrust.rw</a><br />
            📞 <strong>Phone:</strong> +250 788 507 076
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
