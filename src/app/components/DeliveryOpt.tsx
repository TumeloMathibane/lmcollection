"use client";

import packages from "../lib/delivery_packages.json";

interface DeliveryOptProps {
  deliveryData: { [key: string]: string | number | boolean | undefined };
  onChange: (key: string, value: string | number) => void;
}

export function DeliveryPackage({ deliveryData, onChange }: DeliveryOptProps) {
  return (
    <>
      {deliveryData?.method === "tcg" &&
        packages.map(
          ({ name, packages }, index) =>
            name === deliveryData?.method && (
              <div key={index}>
                <p>Select prefered delivery type:</p>
                <select
                  className="select select-md w-full"
                  id="type"
                  onChange={(e) => {
                    onChange("type", e.target?.value);
                    onChange(
                      "price",
                      Number(e.target?.value?.split("|")[1] ?? 0)
                    );
                  }}
                  value={deliveryData?.type as string}
                >
                  <option value="">Delivery type</option>
                  {packages.map(({ name, abbr, minimum_charge }, index) => (
                    <option key={index} value={`${abbr}|${minimum_charge}`}>
                      {name} - min. charge @ R {minimum_charge.toFixed(2)}
                    </option>
                  ))}
                </select>

                {deliveryData?.type !== "" && (
                  <div className="mt-4">
                    <p>Information:</p>

                    {packages.map(
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
            )
        )}

      {deliveryData?.method === "paxi" &&
        packages.map(
          ({ name, packages }, index) =>
            name === deliveryData?.method && (
              <div key={index}>
                <p>Select prefered delivery type:</p>
                <select
                  className="select select-md w-full"
                  id="type"
                  onChange={(e) => {
                    onChange("type", e.target?.value);
                    onChange("price", 0);
                  }}
                >
                  <option value="">Delivery type</option>
                  {packages.map(({ name, abbr }, index) => (
                    <option key={index} value={abbr}>
                      {name}
                    </option>
                  ))}
                </select>

                {deliveryData?.type !== "" && (
                  <div className="mt-4">
                    <p>Information:</p>
                    {packages.map(
                      (
                        {
                          abbr,
                          max_width,
                          max_height,
                          max_weight,
                          delivery_times,
                        },
                        index
                      ) =>
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

                            <div className="mt-4 indent-0">
                              <p>Select delivery time:</p>
                              <select
                                className="select select-md w-full"
                                id="price"
                                onChange={(e) =>
                                  onChange("price", Number(e.target?.value))
                                }
                              >
                                <option value={0}>Delivery time</option>
                                {delivery_times.map(
                                  ({ time, price }, index) => (
                                    <option key={index} value={price}>
                                      {time} days - R {price.toFixed(2)}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            )
        )}
    </>
  );
}
