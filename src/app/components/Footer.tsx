"use client";

import { navlinks } from "@/constants/links";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logos/Liphiwe_business_logo_white.svg";
import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="bg-stone-950 w-full flex p-10 justify-evenly">
      <Link
        href="/"
        className="hidden md:flex footer-logo size-30 items-center-safe"
      >
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
            )
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
                  className="text-white font-semibold"
                >
                  {name}
                </Link>
                {sublinks.map(({ name, href }, index) => (
                  <Link key={index} href={href} className="text-stone-400">
                    {name}
                  </Link>
                ))}
              </div>
            )
        )}
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
              <p
                key={key}
                onClick={() => {
                  setOpen(true);
                  setOpenLink(link.name);
                }}
                className="text-blue-700 underline underline-offset-3 decoration-blue-700"
              >
                {link.name}
              </p>
            ))
        )}
      </div>

      {/* Make seperate component for this */}
      <section
        className={`z-10 fixed bottom-0 right-0 left-0 transition-all ${open ? "translate-0 backdrop-blur-lg backdrop-brightness-50 h-screen" : "duration-5000 translate-y-[100%]"}`}
      >
        <div
          className={`bg-white rounded-t-2xl border-t p-4 fixed bottom-0 left-0 right-0 transition-all ${open ? "overflow-y-auto translate-0 max-h-[55em]" : "max-h-[55em] translate-y-[100%]"}`}
        >
          <BiX
            size={"1.5em"}
            className="absolute top-3 left-[90%]"
            onClick={() => {
              setOpen(false);
            }}
          />

          {openLink.toLowerCase() === "shipping" && (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              molestias deleniti maxime magnam accusamus hic, non reprehenderit,
              eligendi labore tempora, explicabo eos voluptatum ab? Harum porro
              consectetur quis? Eaque, impedit!
            </p>
          )}

          {openLink.toLowerCase() === "returns" && (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              laboriosam rem porro numquam voluptate perspiciatis cupiditate
              molestias dolor architecto velit hic sed deserunt culpa, tenetur
              ipsum, dolores exercitationem magni veritatis! Molestiae
              temporibus corporis exercitationem, hic laboriosam consequuntur
              eligendi delectus libero nostrum. Ea ad est tempore, quia velit
              voluptatibus labore culpa quam delectus pariatur recusandae,
              eveniet excepturi quod voluptas blanditiis voluptate. Ipsa sint
              maiores minima quo rerum, praesentium, earum ab quibusdam illum
              dolor cupiditate deleniti debitis illo reiciendis culpa expedita
              delectus fugit est nulla explicabo sapiente dolores rem? Nobis,
              illo atque! In magnam omnis odio! Praesentium amet suscipit sit
              doloribus magni provident totam. Velit molestias quaerat modi
              repellendus rerum labore soluta, quidem molestiae placeat fuga
              error ut provident beatae laborum perferendis.
            </p>
          )}

          {openLink.toLowerCase() === "refunds" && (
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab, ad
              laudantium doloribus quia fugit minima dolorum tempore, cupiditate
              iste voluptate debitis fugiat minus voluptatum soluta ducimus
              quibusdam aliquam! Ad, ipsa. Quae blanditiis possimus repellendus
              iste qui magni asperiores vel animi cupiditate modi ipsa laborum,
              aut atque vero? Voluptates, neque quo. Consequuntur nesciunt porro
              maiores aspernatur incidunt quidem nam iste repudiandae? Quia,
              fuga sunt? Tempora saepe dolores distinctio repudiandae? Nulla
              dicta rerum eum ullam, cum obcaecati veritatis! Sed eum,
              cupiditate repellendus, quod sunt quas labore debitis quam
              doloremque consequuntur nisi aspernatur. Quas omnis ab molestias
              harum. Vel, vero enim adipisci eum voluptas veritatis, ex impedit
              obcaecati modi fugit repellat atque blanditiis perferendis
              reprehenderit, saepe error! Voluptatem doloribus natus sed harum
              quia? Modi labore aut adipisci soluta enim vitae minima laboriosam
              blanditiis odit delectus? Quam est ipsum vel aliquam laborum
              laudantium ullam corporis nam id nisi temporibus repudiandae
              deleniti, perferendis non officiis? Corrupti a sit, consequuntur
              asperiores quia at velit ea culpa labore excepturi quis impedit
              quo beatae modi cumque voluptate explicabo iusto nostrum enim
              laudantium cupiditate nemo quos. Optio, dolore sunt. Voluptate,
              sequi! Sunt facilis quis voluptate consectetur iusto maiores
              eligendi nihil repellendus blanditiis labore nostrum
              exercitationem sequi nemo sed expedita, incidunt vitae aliquam ea
              doloremque. Rerum, veritatis id? At, illo! Iste excepturi
              molestias perferendis deleniti atque, dolor velit commodi
              asperiores quisquam similique. Quia corrupti perspiciatis minima
              debitis deleniti facere voluptate. Dolore, placeat ullam
              perferendis dignissimos nam repudiandae laborum expedita
              accusantium? Quam rerum ratione veniam porro nam vero consequuntur
              delectus fuga! Ex vel rem eaque praesentium quae, incidunt autem
              unde non doloribus est aspernatur officiis! Totam pariatur
              reiciendis similique molestiae quas! Ullam perferendis
              exercitationem consectetur, aut fuga inventore molestias officiis.
              Corrupti minima esse numquam praesentium consectetur magni debitis
              quia ut error! Voluptas velit ratione quasi ab tempore quibusdam
              ut recusandae! Corporis! Cupiditate sit ullam impedit perspiciatis
              eligendi, ducimus obcaecati laudantium animi. Dolorum laboriosam
              quas nobis debitis iste ratione atque architecto voluptatibus
              illo! Commodi repudiandae, voluptate debitis nihil atque omnis
              pariatur. Obcaecati. Facilis, nisi? Dolorum porro reprehenderit,
              expedita minima velit quod voluptatibus? Quos ducimus aperiam
              natus saepe similique. Vero, reiciendis iure maiores hic sed fuga
              iusto deleniti dolorem doloribus dicta cupiditate. Voluptas.
              Ratione neque debitis asperiores ex facere ea esse laboriosam,
              nihil delectus pariatur amet ullam maxime odio cum, necessitatibus
              aperiam exercitationem expedita quas dolor illo ipsum, rerum
              corrupti deleniti eius! Veritatis. Expedita quia assumenda nulla
              excepturi dolor deserunt. Sint autem dicta deserunt magni animi,
              velit, voluptates, eos numquam ducimus voluptate harum a hic rem
              magnam eum sit accusamus eius saepe quaerat. Ab neque consequuntur
              ipsum architecto quaerat minus reiciendis, labore quasi eveniet
              nulla nemo totam harum possimus consequatur impedit odio quo quia
              nostrum laboriosam at? Aperiam quis blanditiis possimus aliquid
              magnam. Deserunt blanditiis necessitatibus quidem omnis eveniet
              cum corrupti totam libero, nihil odit laborum velit sed, est saepe
              reiciendis quae qui beatae minima repellendus earum voluptatibus
              cumque dicta repudiandae consectetur. Facilis? In quod illum at
              eveniet sapiente architecto, optio eum tempore doloremque a enim
              illo excepturi obcaecati natus rerum aspernatur omnis consequatur
              ut dolor reiciendis adipisci aliquam? Iusto facere culpa nostrum.
              Perspiciatis exercitationem temporibus nulla placeat dolore porro,
              architecto nemo officia nisi, voluptatem suscipit soluta officiis
              ab accusamus provident quae ullam, impedit asperiores beatae
              facilis delectus omnis. Nesciunt corporis ipsa minima. Quibusdam
              expedita explicabo quod ab veritatis ut deserunt veniam eum vitae
              ea modi debitis dolorum rem laborum in vero, animi sunt numquam.
              Inventore consequatur nihil est tenetur provident voluptas ipsum!
              Laboriosam facilis omnis, iste dolore id alias sit totam! Ipsa
              laboriosam id illum, quaerat quasi corporis similique, odio magnam
              molestias hic, quam quo pariatur dolor enim modi suscipit sit
              quibusdam. Necessitatibus est cupiditate ipsa provident nesciunt.
              Sapiente, accusamus harum voluptate repellat officiis laudantium
              omnis, voluptatum quasi ipsam eum in similique, sint provident
              libero perspiciatis architecto id! Ipsam reprehenderit molestias
              distinctio. Est, dolorum excepturi numquam adipisci repellat vero
              neque! Omnis deserunt dolorem, nostrum dicta unde nesciunt
              reprehenderit numquam adipisci placeat reiciendis. Deleniti
              voluptas et alias voluptates doloribus excepturi blanditiis ad
              dignissimos. Modi, accusamus? Corporis hic nostrum cumque, neque
              voluptate, eius assumenda architecto sunt consequuntur accusamus
              quibusdam ipsam minus earum, cupiditate eligendi nisi!
              Exercitationem amet hic repellat esse, optio eos doloribus
              assumenda? Porro animi nihil enim fugiat aliquam debitis fuga
              quaerat, quibusdam voluptas sapiente officiis nulla laborum
              pariatur nam labore sed accusamus blanditiis odio tempore
              praesentium obcaecati, inventore voluptatum necessitatibus quas?
              Voluptate! Ex nemo recusandae aut amet blanditiis, autem dolor
              voluptatibus architecto dolores harum cupiditate ipsa maiores ad
              officia, accusamus, tempora cumque maxime dignissimos animi
              ratione libero ipsam illo velit similique. Perferendis. Odio hic
              ut temporibus sit nostrum, sapiente dolorem atque impedit
              voluptate quis maxime commodi dolor tenetur corporis libero
              explicabo voluptatibus porro possimus odit! Fugit sit natus amet
              beatae, aperiam maiores! Ipsa natus doloremque commodi vitae eaque
              dolores! Enim quae in omnis modi, blanditiis exercitationem. Porro
              alias qui ipsam, corporis, earum ex, nesciunt blanditiis
              consequatur mollitia expedita laboriosam facere nulla et. Voluptas
              eligendi voluptatum consequuntur illum dolorem, corrupti fugiat
              molestiae eaque, saepe sint at cum fugit sapiente impedit eum unde
              ratione harum ducimus nobis a obcaecati temporibus? Aperiam
              voluptas magnam laboriosam! Numquam cupiditate provident eum
              voluptas et expedita consectetur dignissimos, omnis delectus
              architecto, sunt, voluptatum voluptate rem neque! Autem
              praesentium ea reiciendis ipsam ullam, optio nisi, aliquam, quod
              aperiam soluta animi. Enim a dolores nemo corporis quasi quis,
              voluptate tenetur nesciunt laboriosam eum facere error possimus
              accusantium deleniti ipsa odit! Atque nemo culpa, dolore deserunt
              consectetur aliquam harum sint aperiam ab. Atque expedita error
              natus consequatur earum ea molestiae, molestias officiis adipisci?
              Eius, provident doloribus quo ut corporis, ad rem alias voluptas
              ipsam tenetur consequatur quod, laudantium pariatur et possimus
              quibusdam. Velit illo quo, quibusdam architecto eaque
              exercitationem doloremque tempore a quam nostrum harum rerum
              voluptates, ex voluptate officia! Architecto neque asperiores
              quaerat unde itaque, velit facilis dolore aperiam quas atque!
              Quasi, exercitationem similique amet temporibus eveniet at, vero,
              doloremque totam itaque quis ipsa illum perferendis rerum. Dolorum
              obcaecati, omnis, totam, corrupti maxime neque quae atque in ipsum
              ad autem minus. Ratione sint, ducimus consequuntur nam optio ex
              iure magni aut mollitia, sed hic ea accusamus tenetur impedit
              corporis recusandae sapiente quos dolorum accusantium. Facilis,
              quod placeat quibusdam expedita mollitia voluptatum! Obcaecati
              optio provident magni in accusantium. Maxime, soluta nostrum non,
              nulla animi dolores voluptatibus a accusantium fugit iure
              aspernatur aperiam consectetur dolore placeat praesentium cum est
              nesciunt optio? Accusantium, veritatis. Sequi, id laborum.
              Praesentium earum officia, facere molestias sit, necessitatibus
              dolores molestiae quis blanditiis aspernatur, pariatur maiores
              nobis hic. Laboriosam voluptatem quae veritatis ullam provident
              quos similique vel quo commodi. Dignissimos, saepe reprehenderit
              impedit sequi pariatur amet? Dicta officiis illum adipisci porro
              amet fugiat eos modi ipsam! Ratione enim officia in voluptates
              unde nulla repudiandae nam rerum dolorum! Minima, nostrum. Dolores
              distinctio aliquam soluta voluptatibus eaque obcaecati corporis
              nihil aliquid eos quas nam unde delectus debitis architecto,
              laudantium est molestias illum tenetur dicta alias libero quidem
              minus quae. Nam, in? Odio, ex animi eius rerum optio enim maiores
              inventore provident eligendi. Facilis voluptates repellat nemo!
              Incidunt ex ducimus iste, ipsam qui quasi asperiores fuga quae
              dolor, nulla sequi quia eligendi. Architecto, explicabo ad, et
              sequi similique cumque laboriosam voluptate aut, rerum ex tempore.
              Provident sunt error aliquid earum. Aliquam sapiente dicta
              consectetur. Labore quam cumque ratione ex modi porro accusantium?
              Voluptates, sapiente perferendis alias hic consequuntur incidunt
              culpa accusamus tempora autem quidem soluta sunt odio architecto,
              vero quia impedit, iusto tenetur amet corporis? Earum atque
              sapiente enim quisquam consequuntur asperiores. Eius alias illum
              rem odio dolorem nesciunt dignissimos cumque praesentium
              perferendis nostrum corrupti omnis, adipisci quos quidem quia,
              sunt error assumenda harum soluta libero quaerat ut! Eos rem omnis
              ad? Vel magnam nemo earum, vitae nesciunt dolore harum saepe amet
              repellendus minima, temporibus quas asperiores rem corrupti ipsum
              debitis doloribus consequatur tenetur ab tempore esse
              consequuntur? Harum et deleniti est. Debitis officiis nobis
              quaerat, quibusdam aut accusamus aliquid natus praesentium
              obcaecati, cumque reprehenderit asperiores quae impedit quidem
              consectetur neque iste! Earum numquam adipisci eveniet quae
              aperiam porro minus praesentium consectetur! Distinctio esse eos
              adipisci dolorum, facere quo veritatis quos suscipit id porro
              voluptates aliquam fugit unde ab veniam non consequatur velit
              nihil ea? Molestiae explicabo natus, adipisci provident unde nemo!
              Cumque placeat, mollitia modi sapiente doloremque amet impedit
              enim inventore cum distinctio unde dolores aliquid saepe quibusdam
              ducimus neque quis exercitationem quasi dicta, et magni aspernatur
              eligendi! Provident, similique ex. Nisi sint voluptas sed, beatae
              totam, soluta est inventore alias, atque provident illo. Sit,
              necessitatibus eum? Eaque recusandae illum necessitatibus ullam,
              nesciunt quidem commodi laborum est adipisci iusto deserunt iste.
              Architecto hic suscipit incidunt corporis laborum accusamus,
              laboriosam deleniti odit, ab velit delectus deserunt ullam, ex
              iusto iste quaerat quibusdam qui facilis quia animi dolor
              exercitationem quasi voluptatum. Quibusdam, consectetur? Non natus
              reiciendis pariatur velit laborum repellat eveniet magnam libero
              iure cum sint corrupti neque, asperiores veniam ipsum aperiam
              provident nemo doloremque optio dicta a laudantium, sequi,
              possimus autem! Enim! Sint reiciendis aperiam dolores
              exercitationem temporibus tenetur doloremque ratione ad hic. Quia,
              nulla unde quibusdam eius similique illum cum facilis iure? Ea
              veniam tempora cupiditate sed dolores, iusto totam itaque.
            </p>
          )}

          {openLink.toLowerCase() === "contact" && (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              optio rerum facere reiciendis, possimus repellendus iusto quidem
              quos delectus blanditiis deleniti placeat architecto ducimus
              similique minus maxime dolores nemo error. Vero nobis perferendis
              doloribus dolor nemo molestiae repellat adipisci, explicabo autem
              obcaecati similique ducimus voluptate qui. Quas earum quae cumque,
              rerum perferendis eligendi eos quibusdam dolor magni sapiente ea
              ipsum. Ullam eum nulla esse, quod necessitatibus repellendus fuga
              laudantium, eveniet quam perspiciatis magnam deserunt ab quos
              omnis placeat, blanditiis perferendis tempora recusandae ipsa nisi
              enim laborum numquam. Soluta, ad natus? Maiores sapiente molestias
              neque possimus, architecto aspernatur id. Culpa in reprehenderit
              placeat officiis quod non id vero, alias saepe aspernatur quidem
              architecto dolorum delectus illum ipsam atque ratione quam
              voluptate.
            </p>
          )}
        </div>
      </section>
    </footer>
  );
}
