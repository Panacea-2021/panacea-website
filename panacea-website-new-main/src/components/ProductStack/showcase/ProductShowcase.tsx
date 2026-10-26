"use client";

import { useReducedMotion, type MotionValue } from "framer-motion";
import type { ProductItem } from "../productData";
import LayeredMedia from "./LayeredMedia";
import { ThemeDevice } from "./ProductThemes";

export default function ProductShowcase({
  product,
  isActive,
  isNearActive,
  hovered,
  px,
  py,
}: {
  product: ProductItem;
  isActive: boolean;
  isNearActive: boolean;
  hovered: boolean;
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const reduce = useReducedMotion() ?? false;
  const live = isNearActive && !reduce;

  return (
    <div className="relative w-full h-full">
      <LayeredMedia
        product={product}
        active={live}
        hovered={hovered && isActive}
        px={px}
        py={py}
        device={<ThemeDevice theme={product.theme} active={live} />}
      />
    </div>
  );
}
