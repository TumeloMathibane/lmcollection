"use client";

import { navlinks } from "../../constants/links";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logos/Liphiwe_business_logo_white.svg";
import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";

export default function Footer() {
  const date = new Date();

  return (
    <footer className="bg-stone-950 w-full">
      <div className="flex p-10 justify-evenly">
        <Link
          href="/"
          className="hidden md:flex footer-logo size-30 items-center-safe">
          <Image src={logo} alt="footer-logo" width={500} height={500} />
        </Link>
        <div className="flex flex-col">
          <p className="text-white font-semibold">Quick links</p>
          {navlinks.map(
            ({ name, href }, key) =>
              name !== "Policies" && (
                <Link key={key} href={href} className="text-stone-400">
                  {name}
                </Link>
              ),
          )}
        </div>
        <div>
          {navlinks.map(
            ({ name, href, sublinks }, key) =>
              name === "Policies" && (
                <div key={key} className="flex flex-col">
                  <Link
                    key={key}
                    href={href}
                    className="text-white font-semibold">
                    {name}
                  </Link>
                  {sublinks.map(({ name, href }, index) => (
                    <Link key={index} href={href} className="text-stone-400">
                      {name}
                    </Link>
                  ))}
                </div>
              ),
          )}
        </div>
      </div>

      <div className="items-center text-center text-stone-400 py-2 border-t border-stone-600">
        {/* <p>Copyright &copy; {date.getFullYear()} by LMCollection</p> */}
        <p>Copyright &copy; {date.getFullYear()} by Tumelo... lol!</p>
      </div>
    </footer>
  );
}

export function CheckoutFooter() {
  const [open, setOpen] = useState<boolean>(false);
  const [openLink, setOpenLink] = useState<string>("");

  useEffect(() => {
    if (open) document.body.classList.add("overflow-y-hidden");
    else document.body.classList.remove("overflow-y-hidden");
  }, [open]);

  return (
    <footer>
      <div className="flex space-x-4">
        {navlinks.map(
          (navlink) =>
            navlink.name === "Policies" &&
            navlink.sublinks.map((link, key) => (
              <label
                htmlFor=""
                key={key}
                onClick={() => {
                  setOpen(true);
                  setOpenLink(link.name);
                }}
                className="text-blue-700 underline underline-offset-3 decoration-blue-700">
                {link.name}
              </label>
            )),
        )}
      </div>

      {/* Make seperate component for this */}
      <section
        className={`fixed bottom-0 right-0 left-0 transition-all ${open ? "z-5 backdrop-blur-sm backdrop-brightness-75 h-screen sm:flex sm:flex-col sm:justify-center sm:align-middle" : "z-0 delay-100 h-0 backdrop-blur-none"}`}>
        <div
          className={`h-fit bg-white overflow-auto absolute bottom-0 left-0 right-0 transition-all ${open ? "delay-100 max-h-[40em] sm:max-w-[20em] sm:max-h-[35em] sm:top-0 sm:flex sm:place-self-center-safe sm:scale-100" : "max-h-0 sm:w-[20em] sm:top-0 sm:place-self-center-safe sm:scale-0"}`}>
          {/* //! START HERE... */}
          <div className="fixed right-0 bg-white p-1 sm:top-0">
            <BiX
              size={"1.5em"}
              className="float-right sticky top-0"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="my-4 ml-4 me-2 sm:max-h-full sm:overflow-auto">
            <div hidden={openLink.toLowerCase() !== "shipping"}>
              <h1 className="font-bold">{openLink}</h1>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem, officiis incidunt! Maxime sunt labore, aspernatur
                officiis, est non veniam expedita quae ducimus iure sint sed,
                praesentium cupiditate modi. Saepe, sapiente! Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Odio vero asperiores
                iusto amet eaque minus soluta rem, sapiente qui iure! Doloremque
                ex veniam similique quis harum quam culpa vero enim! Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. Aliquid commodi
                esse quidem quisquam! Ipsa quaerat et porro sapiente sint
                eligendi, soluta incidunt facilis officia exercitationem quasi
                debitis eaque qui ad.
              </p>
            </div>

            <div hidden={openLink.toLowerCase() !== "returns"}>
              <h1 className="font-bold">{openLink}</h1>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem, officiis incidunt! Maxime sunt labore, aspernatur
                officiis, est non veniam expedita quae ducimus iure sint sed,
                praesentium cupiditate modi. Saepe, sapiente! Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Odio vero asperiores
                iusto amet eaque minus soluta rem, sapiente qui iure! Doloremque
                ex veniam similique quis harum quam culpa vero enim! Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. Aliquid commodi
                esse quidem quisquam! Ipsa quaerat et porro sapiente sint
                eligendi, soluta incidunt facilis officia exercitationem quasi
                debitis eaque qui ad. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Impedit, expedita deleniti! Praesentium beatae
                voluptate harum autem repudiandae laudantium, ab necessitatibus
                labore quam numquam eligendi maiores ducimus, doloribus laborum.
                Eum, id! Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Mollitia laboriosam similique delectus ullam accusantium
                dolore tempore nulla eum? Qui laudantium quae ratione
                repudiandae tenetur eveniet pariatur earum eum in. Illum? Lorem
                ipsum, dolor sit amet consectetur adipisicing elit. Ex, alias.
                Iste nulla deleniti repellendus, aliquam sit quasi modi ut
                accusamus harum corrupti ipsam veritatis illo quo esse rem eaque
                at? Aliquid magnam praesentium sequi architecto iusto.
                Praesentium repellendus recusandae cum, minus sequi maiores
                tenetur quisquam sunt veniam veritatis totam velit similique
                inventore ipsam aliquam ratione voluptates. Aut adipisci error
                itaque. Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Consequatur omnis nam dolor iusto temporibus tenetur, quod
                libero quam molestiae modi numquam animi, dolorem commodi natus,
                possimus obcaecati alias rem quis! In illum cupiditate maiores
                perferendis eveniet reiciendis labore, debitis porro tempore ab,
                iure numquam vitae error sed cum necessitatibus amet enim animi
                deleniti facere delectus accusamus! Illum necessitatibus
                officiis tenetur. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Deserunt voluptates magnam magni aspernatur
                quos sunt, repellendus fugit eveniet obcaecati temporibus,
                delectus mollitia officia corrupti, tempore laborum veniam.
                Alias, eligendi molestiae. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Labore earum, assumenda
                necessitatibus pariatur illum provident laboriosam, maiores quam
                debitis error accusamus, impedit et quisquam dolores aut placeat
                iste asperiores voluptatibus? Facere mollitia repellat cum atque
                repellendus culpa. Voluptatibus optio, esse rem quisquam,
                voluptatem nemo nesciunt adipisci nostrum iste officiis vero
                numquam? Blanditiis voluptate consectetur praesentium dolorum,
                ducimus numquam corporis culpa. Perferendis reprehenderit odit
                natus, iste saepe tenetur inventore, labore corrupti voluptatum
                ea commodi! Rem maxime sunt sapiente culpa consectetur. Illum,
                minima nesciunt architecto fuga pariatur vero fugiat iusto
                consequatur exercitationem.
              </p>
            </div>

            <div hidden={openLink.toLowerCase() !== "refunds"}>
              <h1 className="font-bold">{openLink}</h1>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem, officiis incidunt! Maxime sunt labore, aspernatur
                officiis, est non veniam expedita quae ducimus iure sint sed,
                praesentium cupiditate modi. Saepe, sapiente! Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Odio vero asperiores
                iusto amet eaque minus soluta rem, sapiente qui iure! Doloremque
                ex veniam similique quis harum quam culpa vero enim! Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. Aliquid commodi
                esse quidem quisquam! Ipsa quaerat et porro sapiente sint
                eligendi, soluta incidunt facilis officia exercitationem quasi
                debitis eaque qui ad. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Impedit, expedita deleniti! Praesentium beatae
                voluptate harum autem repudiandae laudantium, ab necessitatibus
                labore quam numquam eligendi maiores ducimus, doloribus laborum.
                Eum, id! Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Mollitia laboriosam similique delectus ullam accusantium
                dolore tempore nulla eum? Qui laudantium quae ratione
                repudiandae tenetur eveniet pariatur earum eum in.
              </p>
            </div>

            <div hidden={openLink.toLowerCase() !== "contact"}>
              <h1 className="font-bold">{openLink}</h1>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem, officiis incidunt! Maxime sunt labore, aspernatur
                officiis, est non veniam expedita quae ducimus iure sint sed,
                praesentium cupiditate modi. Saepe, sapiente! Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Odio vero asperiores
                iusto amet eaque minus soluta rem, sapiente qui iure! Doloremque
                ex veniam similique quis harum quam culpa vero enim! Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. Aliquid commodi
                esse quidem quisquam!
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
