/**
 * Client testimonials for the `/packages` page.
 *
 * Empty until a real client quote comes in — `PackageTestimonials.astro`
 * renders nothing while this array is empty, so the section never shows
 * placeholder or fabricated content on the live site. Add an entry here
 * once a client agrees to be quoted.
 */
import type { Bilingual } from './profile';

export interface Testimonial {
  /** The client's quote. Keep it verbatim; only trim for length. */
  quote: Bilingual;
  /** Client's name as they want it shown (or a company name if they prefer anonymity). */
  author: string;
  /** Client's role/company, e.g. "Founder, A2 Reklam". */
  role: Bilingual;
  /** Optional slug of the related entry in `src/content/projects/`, for a "see the project" link. */
  projectSlug?: string;
}

export const testimonials: Testimonial[] = [];
