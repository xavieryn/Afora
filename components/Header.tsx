'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";
import Link from "next/link";
import { Settings } from "lucide-react";
import FundUs from "./FundUs";
import ContactUs from "./ContactUs";

function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 shadow-md">
      <div className="flex items-center justify-between p-5 mx-auto">
        <h1 className="text-2xl font-bold">
          Afora
        </h1>
        {/* Breadcrumbs*/}
        <SignedIn>
          <Breadcrumbs />
        </SignedIn>

        <div className="flex gap-6">
          <FundUs />
          <ContactUs />
          <SignedOut>
            <SignInButton />
          </SignedOut>

          <SignedIn>
            <div className="flex gap-2">
              <Link href={'/setting'}>
                <p className="truncate"><Settings /></p>
              </Link>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  )
}

export default Header