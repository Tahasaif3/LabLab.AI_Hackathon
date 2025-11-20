"use client"

import Link from "next/link";
import { Heart, Mail, MapPin, Phone, Linkedin, Twitter, Facebook, Instagram, Github } from "lucide-react";
import { useState } from "react";

export default function ModernWhiteFooter() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-2xl font-bold text-gray-900">HealGuard</span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Modern healthcare solutions with AI-powered insights and expert guidance to improve your wellness journey.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Product</h3>
          <ul className="space-y-2 text-gray-600">
            {['Features','Pricing','Security','Mobile App','Integrations'].map(item => (
              <li key={item}>
                <Link href="#" className="hover:text-black transition">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Company</h3>
          <ul className="space-y-2 text-gray-600">
            {['About Us','Blog','Careers','Press','Contact'].map(item => (
              <li key={item}>
                <Link href="#" className="hover:text-black transition">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-600">
            {['Privacy Policy','Terms of Service','HIPAA Compliance','Cookie Policy','Security'].map(item => (
              <li key={item}>
                <Link href="#" className="hover:text-black transition">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSubscribe}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
          >
            {subscribed ? '✓ Subscribed' : 'Subscribe'}
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
        <p>© {currentYear} HealGuard. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          {[Twitter, Linkedin, Facebook, Instagram, Github].map((Icon, i) => (
            <a key={i} href="#" className="hover:text-black transition">
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
