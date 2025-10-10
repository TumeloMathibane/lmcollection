export default function Policies() {
  return (
    <main className="min-h-[42em] md:min-h-[52em] lg:min-h-[64em] xl:min-h-[22em] space-y-3 py-5 px-2 md:px-10 xl:w-[70%] xl:px-0 xl:place-self-center-safe">
      <h1 className="text-4xl font-bold text-stone-900 text-center">
        Policy - LM Collection
      </h1>
      <div className="text-justify space-y-3">
        <p>
          At LM Collection, we want you to be completely satisfied with your
          purchase. Much appreciation for shopping at LM COLLECTION. We are
          committed to providing you with fast and reliable shipping.
        </p>
        <p className="text-center border-y border-stone-700 mx-5 py-3 font-semibold">
          FOR SHIPPING, WE ONLY USE PEP PAXI AND THE COURIER GUY COURIER
          SERVICES.
        </p>{" "}
        <p>
          Here are our{" "}
          <span className="font-semibold italic">
            shipping, returns, & refund
          </span>{" "}
          policies; please read our policy below:
        </p>
      </div>

      <section id="shipping" className="space-y-3 md:py-8">
        <h2 className="text-2xl font-bold text-stone-700">Shipping</h2>
        <div className="border-collapse">
          <section className="table-row">
            <p className="table-cell border border-stone-600 p-1 font-semibold text-stone-500 xl:p-3">
              Processing time:
            </p>
            <div className="table-cell border border-stone-600 p-1 px-2 xl:p-3">
              <ol className="list-disc list-inside">
                <li>
                  Orders are typically processed within 14 business days of
                  being placed. This includes order verification, packing, and
                  shipping preparation.
                </li>
                <li>
                  Please note that processing times may vary slightly depending
                  on the volume of orders and immediate availability of stock.
                </li>
              </ol>
            </div>
          </section>
          <section className="table-row">
            <p className="table-cell border border-stone-600 p-1 font-semibold text-stone-500 xl:p-3">
              Delivery time:
            </p>
            <p className="table-cell border border-stone-600 p-1 px-2 xl:p-3">
              Once your order has shipped, delivery typically takes 3 to 5
              working days within South Africa.
            </p>
          </section>
          <section className="table-row">
            <p className="table-cell border border-stone-600 p-1 font-semibold text-stone-500 xl:p-3">
              Tracking Information:
            </p>
            <div className="table-cell border border-stone-600 p-1 px-2 xl:p-3">
              <ol className="list-disc list-inside">
                <li>
                  You will receive a tracking number via SMS once your order has
                  shipped.
                </li>
                <li>
                  You can use the tracking number to monitor the status of your
                  order on PEP PAXI COURIER Website{" "}
                  <span className="before:content-['*'] before:text-red-500">
                    Once your order has arrived you will get an sms for
                    collection at your nearest PEP STORE.
                  </span>
                </li>
              </ol>
            </div>
          </section>
          <section className="table-row">
            <p className="table-cell border border-stone-600 p-1 font-semibold text-stone-500 xl:p-3">
              Shipping Address:
            </p>
            <p className="table-cell border border-stone-600 p-1 px-2 xl:p-3">
              Please ensure that your shipping address is correct and complete
              when placing your order.
            </p>
          </section>
          <section className="table-row">
            <p className="table-cell border border-stone-600 p-1 font-semibold text-stone-500 xl:p-3">
              Shipping Delays:
            </p>
            <div className="table-cell border border-stone-600 p-1 px-2 xl:p-3">
              <ol className="list-disc list-inside">
                <li>
                  While we strive to deliver your order on time, unforeseen
                  circumstances such as weather conditions, carrier delays, or
                  holidays may cause delays.
                </li>
                <li>
                  We will keep you updated on any shipping delays and provide
                  you with the latest information.
                </li>
              </ol>
            </div>
          </section>
        </div>
      </section>

      <section id="returns" className="space-y-3 md:py-8">
        <h2 className="text-2xl font-bold text-stone-700">Returns</h2>
        <div className="border-collapse">
          <section className="table-row">
            <p className="table-cell border border-stone-600 p-1 font-semibold text-stone-500 xl:p-3">
              Eligibilty:
            </p>
            <p className="table-cell border border-stone-600 p-1 px-2 xl:p-3">
              Returns are accepted within <em>3 days</em> of receiving your
              order. Items must be in the same condition you received them —
              unworn, unused, with tags, and in the original packaging.
            </p>
          </section>
          <section className="table-row">
            <p className="table-cell border border-stone-600 p-1 font-semibold text-stone-500 xl:p-3">
              Process:
            </p>
            <div className="table-cell border border-stone-600 p-1 px-2 xl:p-3">
              <ol className="list-decimal list-inside">
                <li>
                  Contact us at (business email to be inserted) to request a
                  return.
                </li>
                <li>
                  If approved, we will provide instructions on how and where to
                  send your package.
                </li>
                <li>
                  Items sent back without prior approval will not be accepted.
                </li>
              </ol>
            </div>
          </section>
          <section className="table-row">
            <p className="table-cell border border-stone-600 p-1 font-semibold text-stone-500 xl:p-3">
              Cost:
            </p>
            <p className="table-cell border border-stone-600 p-1 px-2 xl:p-3">
              Customers are responsible for return shipping costs unless the
              item is defective, damaged, or the wrong product was sent.
              Exchanges will also be at the customer&apos;s cost.
            </p>
          </section>
        </div>

        {/* This section must be a flex with buttons on sides to slide back and forth */}
        <div className="flex overflow-auto space-x-2 print:flex-col print:space-y-3 xl:pr-1">
          <article className="border border-stone-700 rounded-xl p-2 space-y-3 text-sm min-w-full">
            <h3 className="text-left font-semibold text-stone-700 border-b border-stone-500 pb-2 ps-4">
              Non-returnable Items
            </h3>
            <div className="ps-4">
              The following cannot be returned:
              <ol className="list-disc list-inside">
                <li>Sale items or digital products</li>
                <li>Perishable goods (e.g., food, flowers, plants)</li>
                <li>
                  Custom or personalized products Personal care items (e.g.,
                  beauty products)
                </li>
                <li>Hazardous materials, flammable liquids, or gases</li>
              </ol>
            </div>
          </article>

          <article className="border border-stone-700 rounded-xl p-2 space-y-3 text-sm min-w-full">
            <h3 className="text-left font-semibold text-stone-700 border-b border-stone-500 pb-2 ps-4">
              Damages & Issues
            </h3>
            <p className="ps-4">
              Please inspect your order upon delivery and contact us immediately
              if it is defective, damaged, or incorrect. We will evaluate the
              issue and work to resolve it promptly.
            </p>
          </article>
        </div>

        <p className="before:content-['*'] before:text-red-500 italic text-sm">
          If you are unsure about your item, please contact us for
          clarification.
        </p>
      </section>

      <section id="refunds" className="space-y-3 md:py-8">
        <h2 className="text-2xl font-bold text-stone-700">Refunds</h2>
        <div>
          <ol className="list-disc list-inside ps-3">
            <li>
              Refunds are only issued if we are unable to fulfill your order
              within 14 working days of purchase.
            </li>
            <li>
              If approved, your refund will be processed by our payment provider
              and returned to your original payment method within 3 business
              days.
            </li>
            <li>
              For customers unhappy with their order (but where the item was
              correctly fulfilled), only exchanges are offered after inspection.
            </li>
          </ol>
        </div>
      </section>

      <section id="contact" className="space-y-3 md:py-8">
        <h2 className="text-2xl font-bold text-stone-700">Contact</h2>
        <div>
          <p className="text-center">
            For any return, refund, or exchange inquiries, please reach out to
            us at (business email to be inserted).
          </p>
        </div>
      </section>
    </main>
  );
}
