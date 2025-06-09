// 'use client';

// import { useState } from 'react';
// import {
//   Dialog,
//   DialogPanel,
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Popover,
//   PopoverButton,
//   PopoverGroup,
//   PopoverPanel,
// } from '@headlessui/react';
// import {
//   ArrowPathIcon,
//   Bars3Icon,
//   ChartPieIcon,
//   CursorArrowRaysIcon,
//   FingerPrintIcon,
//   SquaresPlusIcon,
//   XMarkIcon,
// } from '@heroicons/react/24/outline';
// import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';

// const products = [
//   { name: 'Analytics', description: 'Understand traffic better', href: '#', icon: ChartPieIcon },
//   { name: 'Engagement', description: 'Talk to your users', href: '#', icon: CursorArrowRaysIcon },
//   { name: 'Security', description: 'Keep your data safe', href: '#', icon: FingerPrintIcon },
//   { name: 'Integrations', description: 'Plug into tools', href: '#', icon: SquaresPlusIcon },
//   { name: 'Automations', description: 'Create powerful flows', href: '#', icon: ArrowPathIcon },
// ];
// const callsToAction = [
//   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//   { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ];

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="fixed top-0 left-0 z-50 w-full bg-transparent text-white">
//       <nav className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
//         <div className="flex lg:flex-1">
//           <a href="/" className="-m-1.5 p-1.5">
//             <img
//               className="h-8 w-auto"
//               src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//               alt="Logo"
//             />
//           </a>
//         </div>

//         <div className="flex lg:hidden">
//           <button
//             type="button"
//             className="-m-2.5 inline-flex items-center justify-center p-2.5 text-white"
//             onClick={() => setMobileMenuOpen(true)}
//           >
//             <Bars3Icon className="h-6 w-6" />
//           </button>
//         </div>

//         <PopoverGroup className="hidden lg:flex lg:gap-x-12">
//           <Popover className="relative">
//             <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold">
//               Product
//               <ChevronDownIcon className="h-5 w-5 text-gray-300" />
//             </PopoverButton>
//             <PopoverPanel className="absolute top-full left-0 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 z-50">
//               <div className="p-4">
//                 {products.map((item) => (
//                   <div key={item.name} className="group relative flex gap-x-4 p-4 hover:bg-gray-50 rounded-lg">
//                     <div className="h-11 w-11 flex items-center justify-center bg-gray-50 rounded-lg">
//                       <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
//                     </div>
//                     <div>
//                       <a href={item.href} className="text-gray-900 font-semibold block">{item.name}</a>
//                       <p className="text-gray-600 text-sm">{item.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </PopoverPanel>
//           </Popover>

//           <a href="#" className="text-sm font-semibold">Features</a>
//           <a href="#" className="text-sm font-semibold">Marketplace</a>
//           <a href="#" className="text-sm font-semibold">Company</a>
//         </PopoverGroup>

//         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//           <a href="#" className="text-sm font-semibold">
//             Log in <span aria-hidden="true">&rarr;</span>
//           </a>
//         </div>
//       </nav>

//       {/* Mobile */}
//       <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden z-[100]">
//         <DialogPanel className="fixed inset-y-0 right-0 w-full sm:max-w-sm bg-white px-6 py-6 overflow-y-auto">
//           <div className="flex items-center justify-between">
//             <a href="/" className="-m-1.5 p-1.5">
//               <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" />
//             </a>
//             <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
//               <XMarkIcon className="h-6 w-6" />
//             </button>
//           </div>

//           <div className="mt-6 divide-y divide-gray-200">
//             <div className="space-y-2 py-6">
//               <Disclosure as="div" className="-mx-3">
//                 <DisclosureButton className="flex w-full justify-between rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-50 text-gray-900">
//                   Product
//                   <ChevronDownIcon className="h-5 w-5" />
//                 </DisclosureButton>
//                 <DisclosurePanel className="mt-2 space-y-2">
//                   {[...products, ...callsToAction].map((item) => (
//                     <a key={item.name} href={item.href} className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                       {item.name}
//                     </a>
//                   ))}
//                 </DisclosurePanel>
//               </Disclosure>
//               <a href="#" className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Features</a>
//               <a href="#" className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
//               <a href="#" className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Company</a>
//             </div>
//             <div className="py-6">
//               <a href="#" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">
//                 Log in
//               </a>
//             </div>
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </header>
//   );
// }

//

"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Analytics",
    description: "Understand traffic better",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Talk to your users",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Keep your data safe",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Plug into tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Create powerful flows",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 font-semibold text-sm">
            {/* <img
              className="h-8 w-auto"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt="Logo"
            /> */}
            CAMERA RENTAL
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className={`-m-2.5 inline-flex items-center justify-center p-2.5 ${
              scrolled ? "text-black" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold">
              Product
              <ChevronDownIcon
                className={`h-5 w-5 ${
                  scrolled ? "text-gray-500" : "text-gray-300"
                }`}
              />
            </PopoverButton>
            <PopoverPanel className="absolute top-full left-0 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 z-50">
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex gap-x-4 p-4 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="h-11 w-11 flex items-center justify-center bg-gray-50 rounded-lg">
                      <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                    </div>
                    <div>
                      <a
                        href={item.href}
                        className="text-gray-900 font-semibold block"
                      >
                        {item.name}
                      </a>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a href="/shop" className="text-sm font-semibold">
            Collection
          </a>
          <a href="/all-blogs" className="text-sm font-semibold">
            Blogs
          </a>
          <a href="/contact-us" className="text-sm font-semibold">
            Contact Us
          </a>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden z-[100]"
      >
        <DialogPanel className="fixed inset-y-0 right-0 w-full sm:max-w-sm bg-white px-6 py-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <img
                className="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 divide-y divide-gray-200">
            <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
                <DisclosureButton className="flex w-full justify-between rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-50 text-gray-900">
                  Product
                  <ChevronDownIcon className="h-5 w-5" />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2">
                  {[...products, ...callsToAction].map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </DisclosurePanel>
              </Disclosure>
              <a
                href="#"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                Collection
              </a>
              <a
                href="/all-blogs"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                Blog
              </a>
              <a
                href="/contact-us"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                Contact Us
              </a>
            </div>
            <div className="py-6">
              <a
                href="#"
                className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                Log in
              </a>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
