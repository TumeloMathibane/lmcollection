"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

export default function AdminSidebar() {
  const pathname = usePathname() || "/";

  const nav: NavItem[] = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: (
        <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none' aria-hidden>
          <path
            d='M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V10.5z'
            fill='currentColor'
          />
        </svg>
      ),
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: (
        <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none' aria-hidden>
          <path
            d='M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 10h8v-8h-8v8z'
            fill='currentColor'
          />
        </svg>
      ),
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: (
        <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none' aria-hidden>
          <path
            d='M12 3v2'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
          />
          <path
            d='M3 12l9-7 9 7'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
          />
        </svg>
      ),
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: (
        <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none' aria-hidden>
          <path
            d='M3 3h2l1.68 9.39A2 2 0 008.65 14h7.7a2 2 0 001.97-1.61L21 6H6'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
          />
          <circle cx='10' cy='19' r='1.25' fill='currentColor' />
          <circle cx='18' cy='19' r='1.25' fill='currentColor' />
        </svg>
      ),
    },
    {
      name: "Customers",
      href: "/admin/customers",
      icon: (
        <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none' aria-hidden>
          <path
            d='M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5z'
            fill='currentColor'
          />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className='flex flex-col bg-gray-900 text-gray-100 h-screen w-full'
      aria-label='Admin sidebar'>
      <div className='flex items-center px-3 py-4'>
        <div className='w-full flex items-center space-x-2'>
          <Link
            href='/admin'
            className='w-full flex items-center justify-center py-2'
            aria-label='Go to admin home'>
            <Image
              src='/logos/Liphiwe_business_logo_white.svg'
              alt='Liphiwe logo'
              width={80}
              height={80}
              className='w-20 h-20 object-contain'
              priority
            />
          </Link>
        </div>
      </div>

      <nav className='flex-1 px-2 py-4 space-y-1 overflow-y-auto'>
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-white/5 transition-colors ${
                active ? "bg-indigo-700 text-white" : "text-gray-200"
              }`}
              aria-current={active ? "page" : undefined}>
              <div className='shrink-0 text-gray-200'>{item.icon}</div>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className='px-3 py-4 border-t border-white/5'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium'>
            A
          </div>
          <div className='flex-1 min-w-0'>
            <div className='text-sm font-medium'>Admin User</div>
            <div className='text-xs text-gray-400'>admin@liphiwe.dev</div>
          </div>
          <button
            className='ml-auto p-2 rounded-md hover:bg-white/5 text-sm text-gray-200'
            title='Sign out'
            aria-label='Sign out'
            onClick={() => {
              // Hook sign out logic here
              console.log("sign out");
            }}>
            <svg
              className='w-5 h-5'
              viewBox='0 0 24 24'
              fill='none'
              aria-hidden>
              <path
                d='M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8a2 2 0 002-2V5a2 2 0 00-2-2z'
                fill='currentColor'
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
