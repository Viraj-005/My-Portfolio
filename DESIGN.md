# Design: The Systems Edition

## Intent
An expressive engineering portfolio for prospective clients and recruiters. The user rejected generic landing-page treatments and ASCII effects, then authorized a new palette and typography based on four ranked references.

## References, in priority order
1. https://ysuriadesign.co/ : inspected in a real browser after entering muted mode. Continuous 3D environment and scroll chapters set the ambition for spatial continuity.
2. https://vadimcarazan.com/ : inspected opening and scroll state. Personal identity and work form the main composition.
3. https://www.worksruthi.com/ : inspected content and portrait scroll state. Warm paper, red accents and confident personal voice.
4. https://www.poulo.site/ : inspected opening and work content. Clear project exploration and accessible professional details.

No reference assets or personal claims were copied.

## Visual system
DM Sans for interface and reading. Instrument Serif, including italic, for the name and section titles. Warm ivory #f3f0e8, ink #25251f, restrained ember #b43a23. The opening is deliberately charcoal in both modes; the content defaults to warm light and supports a separately persisted dark preference.

## Composition
A full-height cinematic opening with original Three.js structural frames, personal name, role, direct work anchor and resume link. A large scroll-reading statement introduces the work. The gallery uses a wide lead, staggered featured pair and compact archive. Project information sits outside the imagery. Skills, career, certificates and contact retain real supplied content and functions.

## Motion and performance
The frame assembly responds subtly to pointer and scroll, aligning its layers as the page progresses. One reveal sequence for the name. The statement resolves through native scroll. Existing section reveals and deliberate image hover provide smaller cues. No loading gate, audio autoplay, scroll hijacking or hidden navigation.

Three.js loads as a separate deferred chunk. Pixel ratio is capped at 1.6, animation draws at most 30 frames per second, and offscreen/hidden-tab rendering is skipped. Geometry, environment, materials, listeners and renderer dispose on unmount. Reduced motion keeps the scene still and disables scroll-driven text movement. Semantic identity and actions work without WebGL.

## Content integrity
Existing images are project artwork and are described as such, not newly invented product screenshots. No invented clients, testimonials, awards or employment claims. All project records and certificate downloads remain accessible.

## Last updated
2026-11-10. Rebuilt after the user supplied ranked visual references and released the prior font and palette constraints.

## Verification outcome
Production build and ESLint pass. Browser captures reviewed at 1440px, 768px and 390px, with a final 390px by 844px refinement. Checked absence of horizontal overflow, presence of the WebGL scene, category filtering, project detail opening and Escape closing. A reduced-motion browser run reports no runtime errors. Motion can also be paused explicitly. Contact delivery was not tested by sending a message. The deferred Three.js chunk triggers Vite's size advisory; it is loaded separately from the initial application.

## Interaction refinements
All 17 project images fill their gallery containers with cover cropping; the lead banner keeps its native ratio. Full artwork remains available in project details. The entire project tile opens its existing full detail dialog through one semantic button. Link-style decoration is omitted when a project has no public repository or live URL. Biography uses a bounded grid, with color restored on portrait hover and color shown by default on touch. Theme changes use a 550ms circular View Transition where supported, with instant reduced-motion and keyboard fallbacks.

Verified all 17 expanded project images at 1440px and 390px: cover fit, no page overflow, no overflowing paragraphs, no icon on the internal-only lead project, and no runtime errors. Verified image-area click opens full project details, portrait hover removes grayscale, and theme selection persists.

## Loading and browser identity
The favicon is an original ivory serif-inspired v with ember punctuation on charcoal, supplied as SVG, 32px ICO and a 180px Apple touch icon. A matching inline boot loader appears before React mounts and fades away on mount, without a forced delay. A separate scene indicator remains only until the first 3D frame renders or the scene falls back. Both loading paths were verified to dismiss in normal and reduced-motion browser modes, with no runtime errors and successful icon responses.

## Signature loader and modal artwork
Replaced the icon-and-track loader with an original animated handwritten-style Viraj signature and ember underline, shared by the boot and scene indicators. Reduced motion shows the completed strokes. Project modals now use natural image dimensions at full container width and one scrollable dialog, removing the image height cap and gradient overlay. Browser checks on wide and square artwork confirm full-width fit, preserved natural proportions, reachable scrolling, no horizontal overflow and no runtime errors.

## Theme toggle correction
Header-specific theme button colors now guarantee a visible icon on the permanent dark opening and on light/dark scrolled surfaces, including hover. Both icons stay mounted and rotate/crossfade between states. The circular page reveal is started through WAAPI after View Transition readiness; ordinary palette fades provide a fallback. Browser checks confirmed visible final icons in both themes, an actively running root reveal, and no runtime errors. Reduced motion remains instant.

## Specializations and DataCamp certificates
Specializations now have a dedicated editorial layout with four numbered areas, concise descriptions, and responsive divider rows. Existing reveal motion is retained. Added three high-resolution WebP images rendered from the supplied DataCamp certificates: Large Language Models (LLMs) Concepts, Intermediate Python, and Introduction to Python. These appear first in the 17-certificate gallery and support the existing full-image dialog and image download. Course names and completion dates were checked against the supplied documents. Build and lint pass; desktop and 390px browser checks confirm image loading, dialog opening, no horizontal overflow, and no runtime errors.
