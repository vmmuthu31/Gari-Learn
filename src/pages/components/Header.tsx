import { Dialog } from '@headlessui/react'
import {useState} from "react"
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import {RiCloseCircleLine} from 'react-icons/ri'
import Link from "next/link"
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import dynamic from "next/dynamic";

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'Courses', href: '/Coursecatalog' },
  { name: 'Create Courses', href: '/Createclass' }
  
	]

  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );
  
function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const wallet = useWallet();
    
	return (
		<>
   
		 <header className="absolute inset-x-0 top-0 mb-20 font-Fredoka z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <h3 className="text-yellow-400 font-AgrandirGrandHeavy leading-[62px] font-extrabold text-3xl md:text-5xl">
						Gari
						<span className='text-blue-600'>Learn </span>
					</h3>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <BsReverseLayoutTextSidebarReverse className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 font-bold  lg:gap-x-12 lg:justify-end">
          {navigation.map((item) => (
              <Link  href={item.href} key={item.name} className="text-lg py-2 font-semibold leading-6  text-gray-200">
                {item.name}
              </Link>
            ))}
              <WalletMultiButtonDynamic />
          </div>
          
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
         
              <h3 className="text-yellow-400 font-AgrandirGrandHeavy leading-[62px] font-extrabold text-3xl">
						Gari
						<span className='text-blue-600'>Learn</span>
					</h3>
           
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <RiCloseCircleLine className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                <WalletMultiButtonDynamic />
                </div>
               
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>	
     
		</>
	)
}

export default Header;