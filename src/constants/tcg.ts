export const tcg = [
  {
    name: "Overnight",
    abbr: "ovn",
    minimum_charge: 200,
    mass_range: 2,
    rate_per_kg: 46,
    delivery_time: "11:00 by following day or 1-3 days",
    note: "All parcels will post overnight, but if high risk, it will be posted as economy",
  },
  {
    name: "Economy road",
    abbr: "eco",
    minimum_charge: 150,
    mass_range: "0-15",
    rate_per_kg: "-",
    delivery_time: "2-5 days",
    note: "",
  },
];

export const additional_info = {
  note: "1-2 working days to be added on the transit times for regional areas",
  nb_note:
    "prices are charged on the greater of either actual or volumetric mass",
  date_effective: "insert date here...",
};
