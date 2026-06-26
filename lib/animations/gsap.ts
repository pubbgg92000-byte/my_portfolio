"use client";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    registered = true;
  }

  return gsap;
}

export { MotionPathPlugin, ScrollTrigger };
