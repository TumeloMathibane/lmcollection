"use client";

import { useState, useEffect } from "react";
import packages from "../../data/delivery_packages.json";

interface DeliveryOptProps {
  shippingMethod?: string;
  onChange?: (data: object) => void;
}

export function DeliveryPackage({ shippingMethod }: DeliveryOptProps) {
  const [delivery, setDelivery] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setDelivery({ type: "" });
  }, [shippingMethod]);

  return (
    <>
      {/* for 'tcg' */}
      <div hidden={shippingMethod !== "tcg"}>
        <div className="flex flex-col">
          {packages.map(
            ({ name, packages }) =>
              name === "tcg" && (
                <div key={"tcg"}>
                  <div>
                    <p className="text-sm text-stone-500">
                      Select service type
                    </p>
                    <select
                      className="select select-md"
                      onChange={(e) => {
                        setDelivery({
                          type: e.currentTarget?.value,
                          price: e.currentTarget?.value?.split("|")[1],
                        });
                      }}
                      value={delivery?.type}
                    >
                      <option value="">Service</option>
                      {packages.map(({ name, abbr, minimum_charge }, key) => (
                        <option key={key} value={`${abbr}|${minimum_charge}`}>
                          {name} - min. charge{" "}
                          {`R ${minimum_charge.toFixed(2)}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    hidden={
                      Object.entries(delivery).length === 0 ||
                      delivery?.type === ""
                    }
                    className="mt-2"
                  >
                    <p
                      className="text-sm text-stone-500"
                      onClick={() => console.log(delivery)}
                    >
                      Information:
                    </p>
                    <div>
                      {packages.map(
                        (
                          {
                            abbr,
                            minimum_charge,
                            rate_per_kg,
                            mass_range,
                            delivery_time,
                          },
                          index
                        ) =>
                          delivery?.type === `${abbr}|${minimum_charge}` && (
                            <ol
                              key={index}
                              className="list-disc list-inside indent-1"
                            >
                              <li>
                                Rate per kilogram {"(thereafter)"}:{" "}
                                <span>
                                  {rate_per_kg !== "-"
                                    ? `R ${rate_per_kg.toFixed(2)}`
                                    : "0"}
                                </span>
                              </li>
                              <li>
                                Max. mass/Mass range:{" "}
                                <span className="after:content-['kg'] after:ml-1">
                                  {mass_range}
                                </span>
                              </li>
                              <li>Delivery time: {delivery_time}</li>
                            </ol>
                          )
                      )}
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* for 'paxi' */}
      <div hidden={shippingMethod !== "paxi"}>
        <div>
          <div>
            {packages.map(
              ({ name, packages }) =>
                name === "paxi" && (
                  <div key={"paxi"}>
                    <div>
                      <p className="text-sm text-stone-500">Select type:</p>
                      <select
                        className="select select-md"
                        value={delivery?.type}
                        onChange={(e) => {
                          setDelivery({ type: e.currentTarget?.value });
                        }}
                      >
                        <option value={""}>Package type</option>
                        {packages.map(({ name, abbr }, key) => (
                          <option key={key} value={abbr}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div
                      hidden={
                        Object.entries(delivery).length === 0 ||
                        delivery?.type === ""
                      }
                      className="mt-2"
                    >
                      <p className="text-sm text-stone-500">Specifications:</p>
                      <div>
                        {packages.map(
                          (
                            { abbr, max_width, max_height, max_weight },
                            index
                          ) =>
                            delivery?.type === abbr && (
                              <ol
                                key={index}
                                className="list-disc list-inside indent-2"
                              >
                                <li>Max. width: {max_width}</li>
                                <li>Max. height: {max_height}</li>
                                <li>Max. weight: {max_weight}</li>
                              </ol>
                            )
                        )}
                      </div>
                    </div>

                    <div hidden={delivery?.type === ""} className="mt-2">
                      <p
                        className="text-sm text-stone-500"
                        onClick={() => console.log(delivery)}
                      >
                        Preferred delivery time
                      </p>
                      <select
                        className="select select-md"
                        onChange={(e) => {
                          setDelivery({
                            type: delivery?.type,
                            price: e.currentTarget?.value as string,
                          });
                        }}
                        value={delivery?.price}
                      >
                        <option value="">Time of delivery</option>
                        {packages.map(
                          ({ abbr, delivery_times }) =>
                            delivery?.type === abbr &&
                            delivery_times?.map(({ time, price }, index) => (
                              <option key={index} value={price}>
                                {time} days - R {price.toFixed(2)}
                              </option>
                            ))
                        )}
                      </select>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
