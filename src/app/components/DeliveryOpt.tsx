"use client";

import { tcg } from "@/constants/tcg";
import { paxi } from "@/constants/paxi";

interface DeliveryOptProps {
  deliveryData: { [key: string]: string | number | boolean | undefined };
  onChange: (key: string, value: string | number) => void;
}

export function DeliveryPackage({ deliveryData, onChange }: DeliveryOptProps) {
  return (
    <>
      {deliveryData?.method === "tcg" && (
        <div>
          <p>Select prefered delivery type:</p>
          <select
            className="select select-md w-full focus-within:outline-offset-0 focus-within:outline-0 focus-within:border-2 focus-within:border-blue-600"
            id="type"
            onChange={(e) => {
              onChange("type", e.target?.value);
              onChange("price", Number(e.target?.value?.split("|")[1] ?? 0));
            }}
            value={deliveryData?.type as string}
          >
            <option value="">Delivery type</option>
            {tcg.map(({ name, abbr, minimum_charge }, index) => (
              <option key={index} value={`${abbr}|${minimum_charge}`}>
                {name} - min. charge @ R {minimum_charge.toFixed(2)}
              </option>
            ))}
          </select>

          {deliveryData?.type !== "" && (
            <div className="mt-4">
              <p>Information:</p>

              {tcg.map(
                (
                  {
                    abbr,
                    minimum_charge,
                    mass_range,
                    rate_per_kg,
                    delivery_time,
                  },
                  index
                ) =>
                  `${abbr}|${minimum_charge}` === deliveryData?.type && (
                    <div
                      key={index}
                      className="list list-disc list-inside indent-2"
                    >
                      <li>
                        Max. mass/Mass range: <span>{mass_range} kg</span>
                      </li>
                      <li>
                        Rate per kilogram:{" "}
                        <span>
                          {rate_per_kg === "-"
                            ? "no charge"
                            : `${rate_per_kg} kg`}
                        </span>
                      </li>
                      <li>
                        Delivery time: <span>{delivery_time}</span>
                      </li>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      )}

      {deliveryData?.method === "paxi" && (
        <div>
          <p>Select prefered delivery type:</p>
          <select
            className="select select-md w-full focus-within:outline-offset-0 focus-within:outline-0 focus-within:border-2 focus-within:border-blue-600"
            id="type"
            onChange={(e) => {
              onChange("type", e.target?.value);
              onChange("price", 0);
            }}
          >
            <option value="">Delivery type</option>
            {paxi.map(({ name, abbr }, index) => (
              <option key={index} value={abbr}>
                {name}
              </option>
            ))}
          </select>

          {deliveryData?.type !== "" && (
            <div className="mt-4">
              <p>Information:</p>
              {paxi.map(
                ({ abbr, max_width, max_height, max_weight }, index) =>
                  deliveryData?.type === abbr && (
                    <div
                      key={index}
                      className="list list-disc list-inside indent-2"
                    >
                      <li>
                        Max. width: <span>{max_width}</span>
                      </li>
                      <li>
                        Max. height: <span>{max_height}</span>
                      </li>
                      <li>
                        Max. weight: <span>{max_weight}</span>
                      </li>
                    </div>
                  )
              )}
            </div>
          )}

          {deliveryData?.type !== "" && (
            <div className="mt-4 indent-0">
              <p>Select delivery time:</p>
              <select
                className="select select-md w-full focus-within:outline-offset-0 focus-within:outline-0 focus-within:border-2 focus-within:border-blue-600"
                id="price"
                onChange={(e) => onChange("price", Number(e.target?.value))}
              >
                <option value={0}>Delivery time</option>
                {paxi.map(({ abbr, delivery_times }) =>
                  delivery_times.map(
                    ({ time, price }, index) =>
                      deliveryData?.type === abbr && (
                        <option key={index} value={price}>
                          {time} days - R {price.toFixed(2)}
                        </option>
                      )
                  )
                )}
              </select>
            </div>
          )}
        </div>
      )}
    </>
  );
}
