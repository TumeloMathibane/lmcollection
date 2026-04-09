"use client";

import Link from "next/link";
import "./product-list.css";
import ProductListSkeleton from "./ui/home/productlist-skeleton";
import Image from "next/image";
import type { Product } from "../(overview)/collection/products/types";
import { useFavoritesStore } from "../../stores/favorites";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductList({ products }: { products: Product[] }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const check = () => setHasOverflow(el.scrollWidth > el.clientWidth + 1);

    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    window.addEventListener("resize", check);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [products]);

  const scrollByAmount = (dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.5);
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateEnds = () => {
      const left = el.scrollLeft > 5;
      const maxLeft = el.scrollWidth - el.clientWidth - 5;
      const right = el.scrollLeft < Math.max(0, maxLeft);
      setCanScrollLeft(left);
      setCanScrollRight(right && el.scrollWidth > el.clientWidth + 1);
    };

    updateEnds();
    const onScroll = () => updateEnds();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(updateEnds);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [products]);

  if (!products) {
    return (
      <div className="flex space-x-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductListSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        data-overflow={hasOverflow}
        className="prod-list w-full flex overflow-x-auto scroll-smooth snap-mandatory snap-x gap-1 md:pb-4 md:grid md:grid-cols-3 lg:grid-cols-3">
        {products?.map(
          ({ _id, name, price, images }) =>
            !pathname.includes(_id) && (
              <div
                key={_id}
                className="w-full relative group hover:cursor-pointer snap-center p-1">
                <div className="w-45 bg-stone-100 shadow-sm rounded-xl overflow-hidden relative md:w-full md:shadow-md">
                  <div className="absolute top-2 right-2 z-1 lg:translate-x-100 lg:-translate-y-100 lg:translate-z-150 lg:group-hover:translate-0 transition">
                    {mounted ?
                      !isFavorite(_id) ?
                        <BsSuitHeart
                          size={"1.4rem"}
                          className="text-gray-400"
                          onClick={() => toggleFavorite(_id)}
                        />
                      : <BsSuitHeartFill
                          size={"1.4rem"}
                          className="text-red-600"
                          onClick={() => toggleFavorite(_id)}
                        />

                    : <BsSuitHeart size={"1.4rem"} className="text-gray-600" />}
                  </div>

                  <Link href={`/collection/products/${_id}`}>
                    <figure className="w-full h-35 overflow-hidden flex items-center md:h-56">
                      <div className="w-full h-full transition-all duration-500 group-hover:scale-105">
                        <Image
                          src={images[0] ?? ""}
                          alt={name}
                          width={500}
                          height={500}
                          className="object-cover object-center w-full h-full"
                          unoptimized={true}
                        />
                      </div>
                    </figure>

                    <div className="px-3 py-1 transition-all duration-300 ease-out lg:translate-y-[150%] lg:absolute bottom-0 left-0 right-0 group-hover:translate-0 lg:text-white lg:backdrop-brightness-40">
                      <h2 className="capitalize text-md font-bold text-nowrap truncate lg:text-wrap lg:text-base">
                        {name}
                      </h2>
                      <p className="text-black text-sm font-light lg:text-white">
                        {new Intl.NumberFormat("en-ZA", {
                          style: "currency",
                          currency: "ZAR",
                        }).format(price)}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ),
        )}
        <div className="flex justify-center-safe items-center-safe md:col-span-1">
          <Link
            href="/collection/products/all"
            className="btn border border-stone-300 text-nowrap">
            View all
          </Link>
        </div>
      </div>

      {hasOverflow && (
        <>
          <button
            aria-label="Scroll left"
            className="scroll-btn left"
            onClick={() => scrollByAmount("left")}
            style={{
              opacity: canScrollLeft ? 1 : 0,
              pointerEvents: canScrollLeft ? "auto" : "none",
            }}>
            <FaChevronLeft />
          </button>

          <button
            aria-label="Scroll right"
            className="scroll-btn right"
            onClick={() => scrollByAmount("right")}
            style={{
              opacity: canScrollRight ? 1 : 0,
              pointerEvents: canScrollRight ? "auto" : "none",
            }}>
            <FaChevronRight />
          </button>
        </>
      )}
    </div>
  );
}
