"use client"
import React, { useState, useEffect } from 'react'
import { TiThMenu } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";
import { UserButton } from "@clerk/nextjs";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { getcount } from "../_redux/CartSlice";
import { FaSearch } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { useClerk } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { useAuth } from '@clerk/clerk-react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link';
import CartApis from "../_Utils/CartApis";
import SearchCourse from "./SearchCourse";

import "./style.css"

function Header() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => { return state.cart })
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [courseName, setCourseName] = useState("");

  const { isLoaded, isSignedIn } = useAuth();
  const s = useRouter();
  const p = usePathname();

  const { user } = useUser();
  const { sinIn } = useClerk();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // console.log(user)
  };

  //    console.log("d",cart);
  useEffect(() => {
    user && getUserCart();
  }, [user])

  const getUserCart = () => {
    CartApis.getCart(user.primaryEmailAddress.emailAddress).then((res) => dispatch(getcount(res.data.data))

    )

  }

  //search
  function onCourseNameChange(e) {
    setCourseName(e.target.value)


  }
  //empty search
  function emptySearch() {
    setCourseName("");
  }



  return (


    !(p == "/sign-up" || p == "/sign-in") ? (
      <header className="bg-white h-[64px] w-[100%] sticky top-0 z-20 shadow-bottom ">
        <div className="cont  w-[90%] m-auto  z-10">
          <div className="flex h-16 items-center justify-between overflow-hidden ">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <MdOndemandVideo className="text-4xl text-[#130f40] " />
              </Link>
            </div>

            <div className={`hidden md:block nav-links ${isMenuOpen ? 'show ' : ''}`}>
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link className="text-[#130f40] transition hover:text-black" href="/" onClick={emptySearch}> Home </Link>

                  </li>

                  <li>
                    <Link className="text-[#130f40] transition hover:text-black" href="/courses" onClick={emptySearch}> Explore </Link>
                  </li>

                  <li>
                    <Link className="text-[#130f40] transition hover:text-black" href="/#courses" onClick={emptySearch}> Courses </Link>
                  </li>

                  <li>
                    <Link className="text-[#130f40] transition hover:text-black" href="#" onClick={emptySearch}> About Us </Link>
                  </li>

                  <li>
                    <Link className="text-[#130f40] transition hover:text-black" href="/contact" onClick={emptySearch}> Contact Us </Link>
                  </li>
                  <li>
                    <div className={!courseName == "" ? "flex search-box w-[200px]" : "search-box"}>
                      <button className="btn-search flex justify-center items-center"><FaSearch /></button>
                      <input type="text" value={courseName} className={!courseName == "" ? " w-[200px] input-search" : " input-search"}
                        placeholder="Course Name..." onChange={onCourseNameChange} />
                    </div>
                  </li>

                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4 auth" >
              <div className="sm:flex sm:gap-4 auth_container flex gap-3">
                {!isLoaded ? (
                  <div className="flex items-center gap-4">
                    <Link href="/wishlist" className="flex items-center text-2xl hover:cursor-pointer"><FaRegHeart /></Link>
                    <Link href="/cart" className="flex items-center text-2xl hover:cursor-pointer"><GrCart /></Link>
                  </div>
                ) : (
                  !isSignedIn ? (
                    <>
                      <Link onClick={emptySearch}
                        className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                        href="/sign-in"
                      >
                        Login
                      </Link>
                      <div className="hidden sm:flex register">
                        <Link onClick={emptySearch}
                          className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 register-text"
                          href="/sign-up"
                        >
                          Register
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link onClick={emptySearch} href="/wishlist" className="flex items-center text-black text-2xl hover:cursor-pointer"><FaRegHeart />

                      </Link>
                      <Link onClick={() => {
                        emptySearch();
                        getUserCart();
                      }} href="/cart" className="flex items-center text-black text-2xl hover:cursor-pointer relative" ><GrCart />
                        <span className=" w-[20px] h-[20px] text-center rounded-full text-black absolute top-[-12px] right-[-8px] text-base bg-orange-400">
                          {cart.length}</span>

                      </Link>
                      <UserButton />
                    </>
                  )
                )}
              </div>

              <div className="block md:hidden xx">
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  onClick={toggleMenu}
                >
                  {isMenuOpen ? (
                    <RiCloseFill className="text-xl" />
                  ) : (
                    <TiThMenu className="text-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <SearchCourse courseName={courseName} setCourseName={setCourseName} />
      </header>
    ) :
      ""



  )
}

export default Header