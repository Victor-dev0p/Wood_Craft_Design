export type Category = "dining" | "seating" | "storage" | "tables";

export type Piece = {
  slug: string;
  name: string;
  category: Category;
  wood: string;
  finish: string;
  price: number;
  leadWeeks: string;
  dimensions: string;
  weight: string;
  origin: string;
  image: string;
  gallery: string[];
  tagline: string;
  description: string;
  details: string[];
  featured: boolean;
};

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All Pieces" },
  { id: "dining", label: "Dining" },
  { id: "seating", label: "Seating" },
  { id: "tables", label: "Consoles & Coffee" },
  { id: "storage", label: "Storage" },
];

export const woods = [
  {
    name: "Dark Walnut",
    tone: "Deep chocolate with violet undertones",
    origin: "Missouri & Iowa groves",
    hardness: "Janka 1,010",
  },
  {
    name: "White Oak",
    tone: "Honey-gold with open ray fleck",
    origin: "Appalachian highlands",
    hardness: "Janka 1,360",
  },
  {
    name: "Black Cherry",
    tone: "Warm amber that deepens with age",
    origin: "Pennsylvania forests",
    hardness: "Janka 950",
  },
  {
    name: "Pacific Maple",
    tone: "Pale cream with subtle figure",
    origin: "Oregon Cascades",
    hardness: "Janka 950",
  },
];

export const pieces: Piece[] = [
  {
    slug: "signature-dining-table",
    name: "Signature Dining Table",
    category: "dining",
    wood: "Handcrafted Dark Walnut",
    finish: "Hand-rubbed tung oil",
    price: 8400,
    leadWeeks: "10–14 weeks",
    dimensions: "96\" L × 40\" W × 30\" H",
    weight: "168 lb",
    origin: "Portland atelier",
    image: "/images/dining-table.jpg",
    gallery: ["/images/dining-table.jpg", "/images/hero-dining.jpg", "/images/dining-evening.jpg", "/images/wood-grain.jpg"],
    tagline: "Our signature solid wood table. Built with seamless traditional mortise-and-tenon joinery.",
    description:
      "A gathering table designed to outlast the rooms it occupies. Book-matched walnut slabs are kiln-dried for eighteen months, then joined with through-tenons that remain visible as a quiet record of the making. The apron is sculpted by hand so the table appears to hover, even as it seats ten without a whisper of rack.",
    details: [
      "Solid 8/4 American black walnut, no veneer",
      "Through mortise-and-tenon apron joinery",
      "Hand-planed top finished in six coats of tung oil",
      "Leveling feet concealed in the legs",
      "Optional two 18\" butterfly leaves",
    ],
    featured: true,
  },
  {
    slug: "walnut-lounge-chair",
    name: "Walnut Lounge Chair",
    category: "seating",
    wood: "Handcrafted Dark Walnut",
    finish: "Danish oil & natural linen",
    price: 4200,
    leadWeeks: "8–12 weeks",
    dimensions: "31\" W × 34\" D × 31\" H",
    weight: "42 lb",
    origin: "Portland atelier",
    image: "/images/lounge-chair.jpg",
    gallery: ["/images/lounge-chair.jpg", "/images/living-room.jpg", "/images/joinery.jpg"],
    tagline: "Sleek mid-century lines meet ergonomics. Sculpted entirely by hand with precision joints.",
    description:
      "The lounge chair is a study in restraint. Steam-bent walnut arms follow the natural sweep of the grain, while the seat is suspended on leather webbing so the chair gives without losing its architecture. Upholstery is cut from undyed Belgian linen, removable, and meant to be recovered rather than replaced.",
    details: [
      "Steam-bent solid walnut frame",
      "Leather-webbed seat with down-blend cushion",
      "Belgian linen, undyed and removable",
      "Hand-cut dovetail arm joints",
      "Available in oak or cherry on commission",
    ],
    featured: true,
  },
  {
    slug: "minimalist-console-table",
    name: "Minimalist Console Table",
    category: "tables",
    wood: "Handcrafted White Oak",
    finish: "Osmo hardwax oil",
    price: 3100,
    leadWeeks: "6–9 weeks",
    dimensions: "60\" L × 14\" W × 32\" H",
    weight: "54 lb",
    origin: "Portland atelier",
    image: "/images/console-table.jpg",
    gallery: ["/images/console-table.jpg", "/images/wood-grain.jpg", "/images/joinery.jpg"],
    tagline: "An elegant, understated shelving solution. Double-tenon design with beautiful cross-grain.",
    description:
      "A hallway piece that refuses to shout. The top is a single rift-sawn oak board, selected for its quiet figure, and the legs are tenoned through so the joinery becomes the only ornament. A recessed lower shelf holds books, ceramics, or nothing at all.",
    details: [
      "Rift-sawn white oak throughout",
      "Through-tenon legs with contrasting walnut wedges",
      "Single-board top, live or square edge",
      "Wall-anchoring hardware included",
      "Custom lengths from 48\" to 84\"",
    ],
    featured: true,
  },
  {
    slug: "circular-coffee-table",
    name: "Circular Coffee Table",
    category: "tables",
    wood: "Handcrafted Minimalist Ash",
    finish: "Natural hardwax oil",
    price: 2800,
    leadWeeks: "6–8 weeks",
    dimensions: "42\" Ø × 16\" H",
    weight: "48 lb",
    origin: "Portland atelier",
    image: "/images/coffee-table.jpg",
    gallery: ["/images/coffee-table.jpg", "/images/living-room.jpg", "/images/wood-grain.jpg"],
    tagline: "A low-profile statement piece featuring a beautifully jointed top and organic soft taper.",
    description:
      "Turned from a single ash slab and coopered so the grain radiates from the center. The edge is eased by hand until it feels worn-in on the first day. Three splayed legs are wedged from beneath — a joinery detail you only notice when you look for it.",
    details: [
      "Coopered ash top with radiating grain",
      "Wedged through-tenon legs",
      "Soft-radius edge, hand-eased",
      "Optional inset marble or leather disc",
      "Also available in 36\" and 48\" diameters",
    ],
    featured: true,
  },
  {
    slug: "cascade-sideboard",
    name: "Cascade Sideboard",
    category: "storage",
    wood: "Handcrafted White Oak",
    finish: "Osmo hardwax oil",
    price: 7600,
    leadWeeks: "12–16 weeks",
    dimensions: "78\" L × 18\" W × 32\" H",
    weight: "186 lb",
    origin: "Portland atelier",
    image: "/images/sideboard.jpg",
    gallery: ["/images/sideboard.jpg", "/images/media-console.jpg", "/images/wood-grain.jpg"],
    tagline: "A low credenza of sliding doors and secret drawers, built for rooms that gather.",
    description:
      "Four sliding doors conceal adjustable shelves and a pair of felt-lined drawers for silver. The case is frame-and-panel oak, the doors book-matched so the grain walks continuously across the face. Soft-close runners are the only concession to hardware.",
    details: [
      "Frame-and-panel white oak case",
      "Book-matched sliding doors",
      "Felt-lined silver drawers",
      "Adjustable interior shelves",
      "Cable pass-through for media use",
    ],
    featured: false,
  },
  {
    slug: "oregon-writing-desk",
    name: "Oregon Writing Desk",
    category: "tables",
    wood: "Handcrafted Black Cherry",
    finish: "Hand-rubbed linseed oil",
    price: 5400,
    leadWeeks: "9–12 weeks",
    dimensions: "54\" L × 26\" W × 29.5\" H",
    weight: "72 lb",
    origin: "Portland atelier",
    image: "/images/desk.jpg",
    gallery: ["/images/desk.jpg", "/images/joinery.jpg", "/images/wood-grain.jpg"],
    tagline: "A quiet desk for long mornings — one drawer, one leather inlay, no ornament.",
    description:
      "Cherry chosen for its even color and left to darken in the shop for a season before finishing. A single drawer is dovetailed by hand and lined in vegetable-tanned leather. The writing surface is a matching leather inlay, stitched at the corners and replaceable.",
    details: [
      "Solid Pennsylvania black cherry",
      "Hand-cut dovetail drawer",
      "Vegetable-tanned leather inlay",
      "Cable grommet optional",
      "Matching credenza available",
    ],
    featured: false,
  },
  {
    slug: "cedar-platform-bed",
    name: "Cedar Platform Bed",
    category: "storage",
    wood: "Handcrafted Pacific Maple",
    finish: "Natural hardwax oil",
    price: 6800,
    leadWeeks: "12–16 weeks",
    dimensions: "King 80\" × 84\" × 14\" H",
    weight: "210 lb",
    origin: "Portland atelier",
    image: "/images/bed.jpg",
    gallery: ["/images/bed.jpg", "/images/nightstand.jpg", "/images/wood-grain.jpg"],
    tagline: "A low platform with integrated night ledges and a headboard of vertical slats.",
    description:
      "The bed is a landscape more than a piece of furniture. Maple slats rise behind the pillows, spaced so morning light can pass through. Two floating ledges replace nightstands if the room is small, and the platform is slatted for a natural mattress.",
    details: [
      "Solid Pacific maple platform and slats",
      "Integrated night ledges",
      "Queen, king, and California king",
      "No box spring required",
      "Matching nightstands available",
    ],
    featured: false,
  },
  {
    slug: "hearth-dining-chairs",
    name: "Hearth Dining Chairs",
    category: "seating",
    wood: "Handcrafted White Oak",
    finish: "Osmo hardwax oil",
    price: 1450,
    leadWeeks: "8–10 weeks",
    dimensions: "19\" W × 21\" D × 32\" H",
    weight: "16 lb each",
    origin: "Portland atelier",
    image: "/images/dining-chairs.jpg",
    gallery: ["/images/dining-chairs.jpg", "/images/hero-dining.jpg", "/images/joinery.jpg"],
    tagline: "A set of four or more — sculpted seats, steam-bent backs, made to sit for hours.",
    description:
      "Each chair is carved from a single oak blank so the seat follows the sitter. The back is steam-bent and tenoned into the rear legs, then rasped until the transition disappears. Sold in sets of four, six, or eight, with an optional upholstered pad.",
    details: [
      "Carved solid oak seat",
      "Steam-bent back splat",
      "Sold in sets of 4 / 6 / 8",
      "Optional leather pad",
      "Stackable two-high for storage",
    ],
    featured: false,
  },
  {
    slug: "river-bench",
    name: "River Bench",
    category: "seating",
    wood: "Handcrafted Dark Walnut",
    finish: "Tung oil",
    price: 3600,
    leadWeeks: "7–10 weeks",
    dimensions: "72\" L × 16\" W × 18\" H",
    weight: "64 lb",
    origin: "Portland atelier",
    image: "/images/bench.jpg",
    gallery: ["/images/bench.jpg", "/images/wood-grain.jpg", "/images/workshop.jpg"],
    tagline: "A live-edge walnut slab on sculpted trestle legs, meant for entryways and tables.",
    description:
      "We keep a small reserve of live-edge walnut specifically for this bench. The bark is removed, the edge is sanded until it is silk, and the underside is flattened so it sits true. Trestle legs are wedged through the top and can be knocked down for delivery.",
    details: [
      "Single live-edge walnut slab",
      "Knock-down trestle base",
      "Bark-free, silk-sanded edge",
      "Custom lengths 48\"–96\"",
      "Indoor use only",
    ],
    featured: false,
  },
  {
    slug: "twin-nightstands",
    name: "Twin Nightstands",
    category: "storage",
    wood: "Handcrafted White Oak",
    finish: "Osmo hardwax oil",
    price: 2400,
    leadWeeks: "6–8 weeks",
    dimensions: "20\" W × 16\" D × 24\" H each",
    weight: "28 lb each",
    origin: "Portland atelier",
    image: "/images/nightstand.jpg",
    gallery: ["/images/nightstand.jpg", "/images/bed.jpg", "/images/wood-grain.jpg"],
    tagline: "A pair of compact cabinets with a single drawer and an open niche for books.",
    description:
      "Designed as companions to the Cedar Platform Bed, though they stand on their own. One drawer, dovetailed, and an open cubby sized for a novel and a glass. Sold as a pair, grain-matched across both cabinets.",
    details: [
      "Sold as a grain-matched pair",
      "Hand-cut dovetail drawer",
      "Open book niche",
      "Soft-close runners",
      "Available in walnut or cherry",
    ],
    featured: false,
  },
  {
    slug: "studio-stool",
    name: "Studio Stool",
    category: "seating",
    wood: "Handcrafted White Oak",
    finish: "Natural hardwax oil",
    price: 680,
    leadWeeks: "4–6 weeks",
    dimensions: "14\" Ø × 26\" H",
    weight: "11 lb",
    origin: "Portland atelier",
    image: "/images/stool.jpg",
    gallery: ["/images/stool.jpg", "/images/kitchen.jpg", "/images/workshop.jpg"],
    tagline: "A three-legged kitchen stool, turned and wedged, light enough to move with one hand.",
    description:
      "Three splayed legs, a turned seat, and a foot ring that is tenoned rather than screwed. The stool is the first piece every apprentice in the shop is asked to complete — a small object that contains every joint we care about.",
    details: [
      "Turned oak seat",
      "Wedged through-tenon legs",
      "Tenoned foot ring",
      "Counter or bar height",
      "Stackable three-high",
    ],
    featured: false,
  },
  {
    slug: "library-shelves",
    name: "Library Shelves",
    category: "storage",
    wood: "Handcrafted White Oak",
    finish: "Osmo hardwax oil",
    price: 5200,
    leadWeeks: "10–14 weeks",
    dimensions: "84\" H × 42\" W × 13\" D",
    weight: "118 lb",
    origin: "Portland atelier",
    image: "/images/bookshelf.jpg",
    gallery: ["/images/bookshelf.jpg", "/images/wood-grain.jpg", "/images/joinery.jpg"],
    tagline: "A freestanding case of adjustable shelves, built like cabinetry rather than furniture.",
    description:
      "Uprights are through-tenoned into the top and base so the case never racks, even when fully loaded. Shelves rest on hidden brass pins and can be reset in one-inch increments. The back is a solid oak panel, not plywood, so the piece can stand in a room rather than against a wall.",
    details: [
      "Solid oak throughout, including the back",
      "Adjustable brass-pin shelves",
      "Through-tenon case joinery",
      "Wall-anchor kit included",
      "Modular — units may be joined",
    ],
    featured: false,
  },
];

export const testimonials = [
  {
    name: "Sarah Mitchell",
    city: "Portland, OR",
    piece: "Signature Dining Table",
    quote:
      "The attention to grain matching and joinery detail is extraordinary. Our dining table has become the centerpiece of our home.",
    image: "/images/client-sarah.jpg",
    rating: 5,
  },
  {
    name: "James Calder",
    city: "Seattle, WA",
    piece: "Walnut Lounge Chair",
    quote:
      "I commissioned a pair of lounge chairs after seeing the dining table. They arrived exactly as drawn, and they sit better than anything I have owned.",
    image: "/images/client-james.jpg",
    rating: 5,
  },
  {
    name: "Elena Voss",
    city: "Bend, OR",
    piece: "Cascade Sideboard",
    quote:
      "They treated our mid-century bungalow as a collaborator, not a backdrop. The sideboard looks as if it has always been here.",
    image: "/images/client-elena.jpg",
    rating: 5,
  },
];

export const stats = [
  { value: "12+", label: "Years of Craft" },
  { value: "340+", label: "Pieces Delivered" },
  { value: "100%", label: "Solid Wood" },
  { value: "FSC", label: "Certified Sourcing" },
];

export const clientStats = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "100%", label: "Project Completion" },
  { value: "340+", label: "Happy Collectors" },
  { value: "12+", label: "Years Excellence" },
];

export const philosophy = [
  {
    id: "forestry",
    title: "Sustainable Forestry & Tree Sourcing",
    icon: "leaf",
    body: "Every piece we sculpt begins its journey in certified, sustainably managed North American forests. We select only mature trees that have reached the end of their natural lifecycle, ensuring zero deforestation impact while honoring the wood’s full character.",
  },
  {
    id: "joinery",
    title: "Traditional Hand-Cut Joinery",
    icon: "joinery",
    body: "Mortise-and-tenon, dovetail, and wedged through-tenons are cut by hand in our Portland atelier. Hardware is used only where it improves the life of the piece — never as a substitute for structure.",
  },
  {
    id: "finish",
    title: "Organic Oil Finishes",
    icon: "heart",
    body: "We finish exclusively with plant-based oils and hardwaxes. They deepen the grain, remain repairable for decades, and never off-gas. A table can be renewed with a cloth and a small tin of oil.",
  },
];

export function getPiece(slug: string) {
  return pieces.find((p) => p.slug === slug);
}

export function relatedPieces(slug: string, limit = 3) {
  const current = getPiece(slug);
  if (!current) return pieces.slice(0, limit);
  return pieces
    .filter((p) => p.slug !== slug)
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, limit);
}
