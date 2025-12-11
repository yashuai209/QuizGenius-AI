import React, { useState } from 'react';
import { PricingTier } from '../types';
import { Check, Info } from 'lucide-react';

const Pricing = () => {
  const [razorpayKey, setRazorpayKey] = useState('');
  const [showKeyHelp, setShowKeyHelp] = useState(false);

  const handlePayment = (amount: number, planName: string) => {
    if (!razorpayKey) {
      alert("Please enter a Razorpay Key ID to test the payment flow.");
      return;
    }

    const options = {
      key: razorpayKey, 
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "QuizGenius AI",
      description: `Purchase ${planName}`,
      image: "https://picsum.photos/200/200",
      handler: function (response: any) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        // Here you would call your backend API to verify payment
      },
      prefill: {
        name: "Student Name",
        email: "student@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#2563EB"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-slate-600">
            Choose the plan that fits your learning needs.
          </p>
          
          {/* Razorpay Key Helper Section */}
          <div className="mt-6 max-w-lg mx-auto bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
             <div className="flex items-start">
               <Info className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
               <div className="text-left">
                 <h4 className="text-sm font-semibold text-yellow-800">Demo Configuration</h4>
                 <p className="text-xs text-yellow-700 mt-1">
                   Since this is a client-side demo, please enter your Razorpay Test Key ID below to activate the buttons. 
                 </p>
                 <button 
                   onClick={() => setShowKeyHelp(!showKeyHelp)}
                   className="text-xs text-blue-600 underline mt-1"
                 >
                   How to get API Key?
                 </button>
                 {showKeyHelp && (
                   <div className="mt-2 text-xs text-slate-600 bg-white p-2 rounded border">
                     1. Log in to Razorpay Dashboard.<br/>
                     2. Go to Settings → API Keys.<br/>
                     3. Generate "Test Mode" Key.<br/>
                     4. Copy Key ID (starts with rzp_test_...).
                   </div>
                 )}
                 <input 
                   type="text" 
                   placeholder="Enter rzp_test_..." 
                   value={razorpayKey}
                   onChange={(e) => setRazorpayKey(e.target.value)}
                   className="mt-2 w-full p-2 border border-slate-300 rounded text-sm"
                 />
               </div>
             </div>
          </div>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          
          {/* Plan 1 */}
          <div className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200 bg-white">
            <div className="p-6">
              <h2 className="text-lg leading-6 font-medium text-slate-900">Basic Plan</h2>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-slate-900">₹49</span>
                <span className="text-base font-medium text-slate-500">/mo</span>
              </p>
              <p className="mt-4 text-sm text-slate-500">Perfect for quick revision.</p>
              <button 
                onClick={() => handlePayment(49, "Basic Plan")}
                className="mt-8 block w-full bg-slate-800 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-slate-900 transition"
              >
                Buy Basic
              </button>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h3 className="text-xs font-medium text-slate-900 tracking-wide uppercase">What's included</h3>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-slate-500">100 AI Generated Questions</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-slate-500">Basic Explanations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Plan 2 */}
          <div className="border border-blue-200 rounded-lg shadow-lg divide-y divide-slate-200 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-1 -mt-1 w-32 h-32 overflow-hidden">
               <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-8 py-1 transform rotate-45 translate-x-8 translate-y-4 shadow-md">POPULAR</div>
            </div>
            <div className="p-6">
              <h2 className="text-lg leading-6 font-medium text-slate-900">Pro Unlimited</h2>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-slate-900">₹99</span>
                <span className="text-base font-medium text-slate-500">/mo</span>
              </p>
              <p className="mt-4 text-sm text-slate-500">Unlimited access for serious students.</p>
              <button 
                onClick={() => handlePayment(99, "Pro Plan")}
                className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700 transition"
              >
                Buy Pro Unlimited
              </button>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h3 className="text-xs font-medium text-slate-900 tracking-wide uppercase">What's included</h3>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-slate-500">Unlimited AI Questions</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-slate-500">Detailed Explanations</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-slate-500">Priority Support</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;