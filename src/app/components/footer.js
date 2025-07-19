import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-gray-400 py-16 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <span className="text-2xl">🎵</span>
              <span className="text-xl font-semibold">MalaysianFund</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering Malaysian musicians through blockchain-powered crowdfunding. Support local talent and be part of Malaysia's music revolution.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/campaigns" className="text-gray-400 hover:text-white transition-colors">
                  Browse Campaigns
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-gray-400 hover:text-white transition-colors">
                  Merchandise Store
                </Link>
              </li>
              <li>
                <Link href="/artists" className="text-gray-400 hover:text-white transition-colors">
                  Featured Artists
                </Link>
              </li>
              <li>
                <Link href="/start" className="text-gray-400 hover:text-white transition-colors">
                  Start Campaign
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:hello@malaysianfund.com" className="text-gray-400 hover:text-white transition-colors">
                  hello@malaysianfund.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+60 3-1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Kuala Lumpur, Malaysia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-800 text-center text-sm">
          <p>© 2024 MalaysianFund. All rights reserved. Built with <span className="text-red-500">❤️</span> for Malaysian musicians.</p>
        </div>
      </div>
    </footer>
  )
}

