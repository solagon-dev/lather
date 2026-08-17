/**
 * The single point at which the homepage hands the wordmark from the hero to
 * the navigation bar.
 *
 * Both ends import this. That is the whole point: the hero flies its wordmark
 * to the bar and the bar reveals its own, and if those two happen at different
 * scroll offsets the effect collapses into "one thing disappeared and another
 * appeared somewhere else". Sharing the constant is what makes it read as a
 * single object coming to rest.
 *
 * It must also land *before* the hero's sticky panel unsticks. That panel is
 * pinned for `190svh - 100svh = 90svh` of scroll; past that it scrolls away,
 * taking the hero's wordmark with it. Handing over at 0.9 put the crossfade
 * exactly on that boundary, so the outgoing mark visibly drifted upward while
 * the bar's copy stayed put — which reads as two wordmarks, not one arriving.
 * Landing at 0.72 leaves the whole crossfade inside the pinned stretch.
 */
export const HERO_HANDOFF_VH = 0.72;

/**
 * Marks the navbar's wordmark so the hero can measure it. The hero derives its
 * landing scale and position from this element's real geometry rather than
 * from tuned constants, so the two stay aligned across breakpoints and font
 * loads without anyone re-tuning a magic number.
 */
export const NAV_WORDMARK_ATTR = "data-nav-wordmark";

/** Scroll offset, in pixels, where the handoff completes. */
export function handoffAt() {
  return window.innerHeight * HERO_HANDOFF_VH;
}
