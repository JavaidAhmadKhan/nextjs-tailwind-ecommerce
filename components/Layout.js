import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + "- Wolzon" : "Wolzon"}</title>
        <meta name="description" content="Wolzon Ecommerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-16 items-center px-4 justify-between shadow-md">
            <Link href="/">
              {/* <p className="text-lg font-bold">Wolzon</p> */}
              <Image
                src="https://capstone-shopping-blush.vercel.app/assets/crown-ae472d93.svg"
                className='object-cover h-auto w-full'
                alt="logo"
                width={65}
                height={65}
              />
            </Link>
            <div className="flex gap-2 p-2 font-medium">
              <Link href="/cart">Cart</Link>
              <Link href="/login">Login</Link>
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
