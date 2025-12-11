import React from 'react';

interface LegalContentProps {
  title: string;
  lastUpdated: string;
  children?: React.ReactNode;
}

const LegalContent = ({ title, lastUpdated, children }: LegalContentProps) => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
    <p className="text-slate-500 text-sm mb-8">Last Updated: {lastUpdated}</p>
    <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
      {children}
    </div>
  </div>
);

export const TermsAndConditions: React.FC = () => (
  <LegalContent title="Terms and Conditions" lastUpdated="Oct 25, 2023">
    <p>Welcome to QuizGenius AI. By accessing this website, we assume you accept these terms and conditions. Do not continue to use QuizGenius AI if you do not agree to take all of the terms and conditions stated on this page.</p>
    <h3 className="text-xl font-semibold mt-4">1. License</h3>
    <p>Unless otherwise stated, QuizGenius AI and/or its licensors own the intellectual property rights for all material on QuizGenius AI. All intellectual property rights are reserved.</p>
    <h3 className="text-xl font-semibold mt-4">2. User Accounts</h3>
    <p>To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials.</p>
  </LegalContent>
);

export const PrivacyPolicy: React.FC = () => (
  <LegalContent title="Privacy Policy" lastUpdated="Oct 25, 2023">
    <p>At QuizGenius AI, accessible from quizgenius.ai, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by QuizGenius AI and how we use it.</p>
    <h3 className="text-xl font-semibold mt-4">Information We Collect</h3>
    <p>We collect information you provide directly to us, such as when you create an account, subscribe to a plan, or contact us for support.</p>
    <h3 className="text-xl font-semibold mt-4">Payment Information</h3>
    <p>We process payments through Razorpay. We do not store your card data on our servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS).</p>
  </LegalContent>
);

export const ShippingPolicy: React.FC = () => (
  <LegalContent title="Shipping & Delivery Policy" lastUpdated="Oct 25, 2023">
    <p>QuizGenius AI deals exclusively in digital products and services.</p>
    <h3 className="text-xl font-semibold mt-4">Instant Delivery</h3>
    <p>Upon successful payment for any subscription plan (₹49 or ₹99), the service is activated immediately on your account. There are no physical products to ship.</p>
    <h3 className="text-xl font-semibold mt-4">Confirmation</h3>
    <p>You will receive a confirmation email with your order details immediately after purchase.</p>
  </LegalContent>
);

export const CancellationRefund: React.FC = () => (
  <LegalContent title="Cancellation and Refund Policy" lastUpdated="Oct 25, 2023">
    <p>We strive to ensure our customers are satisfied with our AI services.</p>
    <h3 className="text-xl font-semibold mt-4">Cancellations</h3>
    <p>You may cancel your subscription at any time. The cancellation will be effective at the end of the current billing cycle.</p>
    <h3 className="text-xl font-semibold mt-4">Refunds</h3>
    <p>For the Basic (₹49) and Pro (₹99) plans, we offer a 3-day money-back guarantee if the service does not perform as described due to technical issues on our end. Contact support for assistance.</p>
  </LegalContent>
);

export const ContactUs: React.FC = () => (
  <LegalContent title="Contact Us" lastUpdated="Oct 25, 2023">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
        <p>If you have any questions about these Terms, please contact us.</p>
        <div className="mt-6 space-y-2">
          <p><strong>Email:</strong> yashwantkhutte4@gmail.com</p>
          <p><strong>Phone:</strong> +91 62650 80534</p>
          <p><strong>Address:</strong> 123 Tech Park, Cyber City, Gurugram, India</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" className="w-full p-2 border border-slate-300 rounded" />
            <input type="email" placeholder="Your Email" className="w-full p-2 border border-slate-300 rounded" />
            <textarea placeholder="Message" rows={4} className="w-full p-2 border border-slate-300 rounded"></textarea>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Send Message</button>
        </form>
      </div>
    </div>
  </LegalContent>
);