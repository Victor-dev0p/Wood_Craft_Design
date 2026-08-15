// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Check, ShoppingBag, Ruler, Sparkles } from "lucide-react";
// import { Product, WoodConfig, SizeConfig } from "../lib/types";
// import { PRODUCTS, WOODS, SIZES } from "../lib/data";

// interface CustomizerProps {
//   onAddToCart: (
//     product: Product,
//     wood: string,
//     size: string,
//     price: number,
//   ) => void;
// }

// export default function Customizer({ onAddToCart }: CustomizerProps) {
//   // Configurable products only (we'll filter to those with options)
//   const configurableProducts = PRODUCTS.filter((p) => p.woodOptions.length > 1);
//   const [selectedProduct, setSelectedProduct] = useState<Product>(
//     configurableProducts[0],
//   );
//   const [selectedWood, setSelectedWood] = useState<WoodConfig>(WOODS[0]);
//   const [selectedSize, setSelectedSize] = useState<SizeConfig>(SIZES[0]);
//   const [finalPrice, setFinalPrice] = useState(selectedProduct.basePrice);
//   const [successMsg, setSuccessMsg] = useState(false);

//   // Sync selected wood & size with available options when product changes
//   useEffect(() => {
//     const availableWoods = WOODS.filter((w) =>
//       selectedProduct.woodOptions.includes(w.id),
//     );
//     const availableSizes = SIZES.filter((s) =>
//       selectedProduct.sizeOptions.includes(s.id),
//     );

//     // Choose first available or default
//     if (
//       availableWoods.length > 0 &&
//       !selectedProduct.woodOptions.includes(selectedWood.id)
//     ) {
//       setSelectedWood(availableWoods[0]);
//     }
//     if (
//       availableSizes.length > 0 &&
//       !selectedProduct.sizeOptions.includes(selectedSize.id)
//     ) {
//       setSelectedSize(availableSizes[0]);
//     }
//   }, [selectedProduct]);

//   // Recalculate price
//   useEffect(() => {
//     let price = selectedProduct.basePrice;

//     // Apply wood modifier
//     const woodMod = selectedProduct.woodOptions.includes(selectedWood.id)
//       ? selectedWood.priceModifier
//       : 0;

//     // Apply size modifier
//     const sizeMod = selectedProduct.sizeOptions.includes(selectedSize.id)
//       ? selectedSize.priceModifier
//       : 0;

//     setFinalPrice(price + woodMod + sizeMod);
//   }, [selectedProduct, selectedWood, selectedSize]);

//   const handleAdd = () => {
//     onAddToCart(
//       selectedProduct,
//       selectedWood.name,
//       selectedSize.name,
//       finalPrice,
//     );
//     setSuccessMsg(true);
//     setTimeout(() => setSuccessMsg(false), 2500);
//   };

//   const currentAvailableWoods = WOODS.filter((w) =>
//     selectedProduct.woodOptions.includes(w.id),
//   );
//   const currentAvailableSizes = SIZES.filter((s) =>
//     selectedProduct.sizeOptions.includes(s.id),
//   );

//   return (
//     <section
//       id="customizer-section"
//       className="py-20 px-4 md:px-8 border-t"
//       style={{ borderColor: "rgba(140, 122, 107, 0.15)" }}
//     >
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <span className="font-mono text-xs tracking-widest uppercase text-[var(--color-accent)] font-semibold">
//             Bespoke Atelier
//           </span>
//           <h2 className="mt-2 text-3xl font-serif font-medium tracking-tight text-[var(--color-secondary-text)] md:text-4xl">
//             Configure Your Masterpiece
//           </h2>
//           <p className="mt-4 max-w-xl mx-auto text-sm text-[var(--color-neutral-muted)] leading-relaxed">
//             Select your premium timber cuts and dimensional scale. Observe
//             pricing adjust in real time to match our artisanal standards.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
//           {/* Left Panel: Preview Frame */}
//           <div className="lg:col-span-7 flex flex-col gap-4">
//             <div
//               className="relative aspect-[16/10] rounded-xl overflow-hidden border"
//               style={{
//                 borderColor: "rgba(140, 122, 107, 0.15)",
//                 background: "var(--color-card-bg)",
//               }}
//             >
//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={`${selectedProduct.id}-${selectedWood.id}`}
//                   src={selectedProduct.imageUrl}
//                   alt={selectedProduct.name}
//                   referrerPolicy="no-referrer"
//                   initial={{ opacity: 0, filter: "brightness(0.95)" }}
//                   animate={{ opacity: 1, filter: "brightness(1)" }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.4 }}
//                   className="w-full h-full object-cover"
//                 />
//               </AnimatePresence>

//               {/* Wooden Grain Swatch Overlays / Info */}
//               <div
//                 className="absolute bottom-4 left-4 right-4 bg-[var(--color-dominant)]/90 backdrop-blur-sm p-4 rounded-lg border flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
//                 style={{ borderColor: "rgba(140, 122, 107, 0.15)" }}
//               >
//                 <div>
//                   <div className="font-sans text-xs font-semibold text-[var(--color-secondary-text)] flex items-center gap-1.5">
//                     <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)]" />
//                     {selectedProduct.name}
//                   </div>
//                   <div className="font-mono text-[10px] text-[var(--color-neutral-muted)] mt-0.5">
//                     Selected cut:{" "}
//                     <span className="text-[var(--color-secondary-text)] font-medium">
//                       {selectedWood.name}
//                     </span>{" "}
//                     • Dimension:{" "}
//                     <span className="text-[var(--color-secondary-text)] font-medium">
//                       {selectedSize.dimensions}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="font-mono text-sm font-semibold text-[var(--color-accent)]">
//                   ${finalPrice.toLocaleString()}
//                 </div>
//               </div>
//             </div>

//             {/* Product Switcher Slider */}
//             <div className="grid grid-cols-3 gap-3">
//               {configurableProducts.map((p) => (
//                 <button
//                   key={p.id}
//                   id={`config-select-${p.id}`}
//                   onClick={() => setSelectedProduct(p)}
//                   className={`p-3 text-left rounded-lg border transition-all ${
//                     selectedProduct.id === p.id
//                       ? "ring-1 ring-[var(--color-accent)] bg-[var(--color-secondary-border)]/5"
//                       : "opacity-80 hover:opacity-100 hover:bg-[var(--color-secondary-border)]/5"
//                   }`}
//                   style={{
//                     borderColor:
//                       selectedProduct.id === p.id
//                         ? "var(--color-accent)"
//                         : "rgba(140, 122, 107, 0.15)",
//                     background: "var(--color-card-bg)",
//                   }}
//                 >
//                   <div className="font-sans text-xs font-medium truncate text-[var(--color-secondary-text)]">
//                     {p.name}
//                   </div>
//                   <div className="font-mono text-[10px] text-[var(--color-neutral-muted)] mt-0.5">
//                     ${p.basePrice} base
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Right Panel: Configurations */}
//           <div className="lg:col-span-5 flex flex-col gap-8">
//             {/* Timber Sourcing Selector */}
//             <div>
//               <label className="font-mono text-[10px] tracking-wider uppercase text-[var(--color-neutral-muted)] font-bold">
//                 1. Select Timber Cut (Wood Species)
//               </label>
//               <div className="mt-3 flex flex-col gap-3">
//                 {currentAvailableWoods.map((wood) => {
//                   const isSelected = selectedWood.id === wood.id;
//                   const modString =
//                     wood.priceModifier > 0
//                       ? `+$${wood.priceModifier}`
//                       : wood.priceModifier < 0
//                         ? `-$${Math.abs(wood.priceModifier)}`
//                         : "Included";

//                   return (
//                     <button
//                       key={wood.id}
//                       id={`wood-option-${wood.id}`}
//                       onClick={() => setSelectedWood(wood)}
//                       className={`relative flex items-center gap-4 p-3 rounded-lg border text-left transition-all ${
//                         isSelected
//                           ? "ring-1 ring-[var(--color-accent)]"
//                           : "hover:bg-[var(--color-secondary-border)]/5"
//                       }`}
//                       style={{
//                         borderColor: isSelected
//                           ? "var(--color-accent)"
//                           : "rgba(140, 122, 107, 0.15)",
//                         background: "var(--color-card-bg)",
//                       }}
//                     >
//                       {/* Wood Swatch Circle */}
//                       <div
//                         className="w-8 h-8 rounded-full border border-black/10 shadow-inner flex-shrink-0 flex items-center justify-center"
//                         style={{ backgroundColor: wood.colorHex }}
//                       >
//                         {isSelected && (
//                           <Check className="w-4 h-4 text-white stroke-[3] mix-blend-difference" />
//                         )}
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <div className="flex justify-between items-baseline">
//                           <span className="font-sans text-xs font-semibold text-[var(--color-secondary-text)]">
//                             {wood.name}
//                           </span>
//                           <span className="font-mono text-[10px] font-medium text-[var(--color-accent)]">
//                             {modString}
//                           </span>
//                         </div>
//                         <p className="font-sans text-[10px] text-[var(--color-neutral-muted)] truncate mt-0.5 leading-normal">
//                           {wood.description}
//                         </p>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Dimensional Scale Selector */}
//             {selectedProduct.sizeOptions.length > 1 && (
//               <div>
//                 <label className="font-mono text-[10px] tracking-wider uppercase text-[var(--color-neutral-muted)] font-bold">
//                   2. Select Dimensional Scale
//                 </label>
//                 <div className="mt-3 flex flex-col gap-3">
//                   {currentAvailableSizes.map((size) => {
//                     const isSelected = selectedSize.id === size.id;
//                     const modString =
//                       size.priceModifier > 0
//                         ? `+$${size.priceModifier}`
//                         : "Included";

//                     return (
//                       <button
//                         key={size.id}
//                         id={`size-option-${size.id}`}
//                         onClick={() => setSelectedSize(size)}
//                         className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
//                           isSelected
//                             ? "ring-1 ring-[var(--color-accent)]"
//                             : "hover:bg-[var(--color-secondary-border)]/5"
//                         }`}
//                         style={{
//                           borderColor: isSelected
//                             ? "var(--color-accent)"
//                             : "rgba(140, 122, 107, 0.15)",
//                           background: "var(--color-card-bg)",
//                         }}
//                       >
//                         <Ruler className="w-5 h-5 text-[var(--color-neutral-muted)] flex-shrink-0 stroke-[1.5]" />
//                         <div className="flex-1 min-w-0">
//                           <div className="flex justify-between items-baseline">
//                             <span className="font-sans text-xs font-semibold text-[var(--color-secondary-text)]">
//                               {size.name}
//                             </span>
//                             <span className="font-mono text-[10px] font-medium text-[var(--color-accent)]">
//                               {modString}
//                             </span>
//                           </div>
//                           <p className="font-mono text-[10px] text-[var(--color-neutral-muted)] truncate mt-0.5">
//                             {size.dimensions}
//                           </p>
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Customizer Primary CTA (Ochre background - strictly 1 per section) */}
//             <div
//               className="pt-4 border-t border-dashed flex flex-col gap-4"
//               style={{ borderColor: "rgba(140, 122, 107, 0.15)" }}
//             >
//               <div className="flex justify-between items-baseline">
//                 <span className="font-sans text-xs font-medium text-[var(--color-secondary-text)]">
//                   Estimated Cost
//                 </span>
//                 <span className="font-mono text-2xl font-semibold text-[var(--color-accent)]">
//                   ${finalPrice.toLocaleString()}
//                 </span>
//               </div>

//               <motion.button
//                 id="add-customized-to-cart-btn"
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleAdd}
//                 className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-md font-sans text-sm font-semibold text-white shadow-sm transition-all duration-300"
//                 style={{
//                   background: "var(--color-accent)", // Accent Muted Ochre
//                 }}
//               >
//                 <ShoppingBag className="w-4 h-4" />
//                 Customize & Add to Cart
//               </motion.button>

//               <AnimatePresence>
//                 {successMsg && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="text-center font-sans text-xs text-[var(--color-accent)] font-medium"
//                   >
//                     ✓ Handcrafted configuration added to your bespoke crate.
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
