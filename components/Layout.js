import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ShoppingBagIcon } from "@heroicons/react/24/solid";

import { Store } from "@/utils/Store";
import { signOut, useSession } from "next-auth/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";

export const Layout = ({ title, children }) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setcartItemsCount] = useState(0);

  useEffect(() => {
    setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, []);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <Head>
        <title>{title ? title + "- Wolzon" : "Wolzon"}</title>
        <meta name="description" content="Wolzon Ecommerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex sticky  top-0 h-16 items-center px-4 justify-between shadow-md z-2 tack">
            <Link href="/">
              <Image
                src="https://capstone-shopping-blush.vercel.app/assets/crown-ae472d93.svg"
                className="object-cover h-auto w-full"
                alt="logo"
                width={65}
                height={65}
              />
            </Link>
            <div className="flex gap-2 items-center p-2 font-medium">
              <Link href="/cart">
                {/* Cart */}
                <ShoppingBagIcon color="gray" className="w-8 h-8 relative" />
                {cartItemsCount > 0 && (
                  <span className="absolute  px-1 text-[10px] font-bold text-white bg-blue-500 rounded-full shadow  top-7 right-[110px] ">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === "loading" ? (
                "Loading..."
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-white text-sm bg-blue-500 font-bold px-3 py-2 rounded-full hover:bg-blue-700 shadow-lg">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-white">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="#">
                        <a onClick={logoutClickHandler}>Logout</a>
                      </DropdownLink>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link className="p-2" href="/login">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-16 shadow-inner items-center justify-center px-4 ">
          Wolzon @2023 made with love by{" "}
          <a
            className="flex items-end justify-items-end justify-end ml-auto text-blue-600"
            href="https://javaid-khan.vercel.app/"
            target="_blank"
          >
            Javaid Khan
          </a>{" "}
        </footer>
      </div>
    </>
  );
};
