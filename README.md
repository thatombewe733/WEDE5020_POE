# RESET Pilates Studio Website

## Project Title
RESET Pilates Studio 

## Student Information
- **Student Name:** Thato Mbewe
- **Student Number:** ST10521635
- **Module:** WEDE5020 – Web Design and Development


## Project Overview
RESET Pilates Studio is a fictional Pilates studio based in Johannesburg, South Africa, operating from two locations: Rosebank and Midrand. This project is a multi-page website built to showcase the studio's classes, pricing, instructors, and contact information, and to allow prospective clients to enquire about classes or book a trial session.

The website was designed with a calm, minimal aesthetic reflecting the studio's brand values of breath, control, and movement, using a moss green and warm brass colour palette throughout.

The website consists of five HTML pages — Home, About Us, Services, Enquiries, and Contact Us — all linked through a consistent navigation menu, header, and footer. Content was researched and written specifically for a Pilates studio audience, covering class types, pricing, instructor bios, studio history, and multiple contact locations.

## Website Goals and Objectives
- Provide a clear, easy-to-navigate website that introduces RESET Pilates Studio to potential clients.
- Present information on class types (Mat Pilates, Reformer Pilates, Private Sessions) along with pricing.
- Allow visitors to submit enquiries about classes and book trial sessions through an online form.
- Provide accurate contact information and locations for both studio branches.
- Build the website using semantic, accessible HTML5 structured across five pages.

**Key Performance Indicators (KPIs):**
- Number of enquiry form submissions.
- Time spent on the Services page (indicating engagement with pricing/class info).
- Click-through rate from homepage to the Enquiries page ("Book a Trial Class" CTA).

## Key Features and Functionality

| Page | Purpose |
|---|---|
| `index.html` | Homepage with hero image, introduction, and call to action |
| `about.html` | Studio history, mission, vision, and instructor profiles |
| `services.html` | Class types, class process, and pricing table |
| `enquiries.html` | Enquiry form for booking trial classes |
| `contact.html` | Studio locations, hours, contact details, and contact form |

**Core functionality:**
- Consistent navigation menu across all five pages
- Logo, hero, small, and portrait images placed across the site
- Enquiry form with class-type selection
- Contact form for general messages
- Pricing table for class packages
- Semantic HTML5 structure (`header`, `nav`, `main`, `section`, `footer`)

**File and Folder Structure**
```
RESETPILATESTUDIO/
│
├── css/
│   └── styles.css
├── images/
│   ├── herophoto.png
│   ├── largephoto.png
│   ├── smallphoto.png
│   └── studiologo.png
├── js/
│   ├── data.js
│   └── main.js
├── about.html
├── contact.html
├── enquiries.html
├── index.html
├── services.html
├── robots.txt
├── sitemap.xml
└── README.md
```

## Timeline and Milestones

| Milestone | Status |
|---|---|
| Target organisation selected (RESET Pilates Studio) | Complete |
| Website Project Proposal drafted and submitted | Complete |
| Content research and sourcing | Complete |
| Sitemap and file structure created | Complete |
| HTML files created for all 5 pages | Complete |
| Images integrated into pages | Complete |
| Navigation tested across all pages | Complete |
| README.md compiled | Complete |
| GitHub repository set up and pushed | Complete |

## Part 1 Details
This README currently documents Part 1 of the WEDE5020 POE, covering:
- Website Project Proposal
- Content research and sourcing
- Website structure and planning (sitemap, file structure)
- Initial HTML structure and basic content for all five pages

Part 2 covered styling and layout. Part 3 (below) adds JavaScript functionality, SEO, form validation and deployment.

## Part 3 Details
Part 3 enhances the website with JavaScript, SEO, validated forms and deployment.

**JavaScript enhancements** (`js/main.js`, `js/data.js`)
- Accordion (FAQ on `services.html`), tabs (class types on `services.html`) and modals (instructor bios on `about.html`), all keyboard accessible.
- Google Maps embed on `contact.html` with buttons to switch between branches and an "Open in Google Maps" link; studio addresses now use Rosebank Mall (50 Bath Avenue) and Mall of Africa (Waterfall City).
- Gallery with lightbox (`index.html`, `about.html`) with next/previous buttons, arrow keys and Escape to close.
- CSS and JavaScript animations: scroll-reveal sections, hover transitions and animated accordion panels (disabled for users who prefer reduced motion).
- Dynamic content: the class timetable on `services.html` is built from a JavaScript data file with live search, filter by class type and sort by day, price or name.

**SEO**
- Unique title tags, meta descriptions and keywords on every page; canonical URLs and Open Graph tags.
- One H1 per page with H2/H3 headings in order; descriptive alt text and image dimensions; lazy loading below the fold.
- Clean file names, internal links between pages, mobile-friendly responsive layout.
- Local SEO: Johannesburg/Rosebank/Midrand keywords and LocalBusiness (schema.org) structured data.
- `robots.txt` and `sitemap.xml` added.
- Off-page plan: Google Business Profile for both branches, local directory listings, and Instagram/Facebook promotion linking back to the site.

**Forms and validation**
- `enquiries.html`: validated enquiry form (name, email, SA phone number, class, branch, package, date, goals). After validation it is submitted with AJAX (`fetch`) and shows a response with the estimated cost and class availability.
- `contact.html`: validated contact form with message type; the validated input is compiled into an email addressed to the recipient set in `js/main.js` (`CONTACT_RECIPIENT`) and the client sends it with one click.
- Inline error messages, character counters, HTML5 attributes plus JavaScript checks, and a honeypot field against spam bots.

**Security and performance**
- Content-Security-Policy (frame-src limited to Google Maps) and referrer meta tags, and user input is only written to the page with `textContent`.
- Single shared stylesheet and script files, lazy-loaded images, `font-display: swap`.

**Deployment**
- Hosted on GitHub Pages: https://thatombewe733.github.io/WEDE5020_POE/

## Sitemap
```
Home (index.html)
│
├── About Us (about.html)
├── Services (services.html)
├── Enquiries (enquiries.html)
└── Contact Us (contact.html)
```
All five pages share a common header (logo, title, tagline, navigation) and footer (studio name, locations, copyright).

## Changelog

### [Unreleased]
- Replace the placeholder contact email and add a live AJAX endpoint (see `js/main.js`)

### [2.0.0] - 2026-10-31 (Part 3)
**Feedback from Part 2 (edit these entries to match your marker's comments)**
- Fixed broken markup on `about.html`: a paragraph sat outside its `<section>` and closing tags were misplaced; all content is now inside correctly nested sections.
- Fixed inconsistent capitalisation of "Midrand" (previously "midrand") in the footers and on `contact.html`.
- Replaced `<table border="1">` with a styled table using `<thead>`, `<tbody>`, a caption and `scope` attributes for accessibility.
- Replaced the `<br>`-based form layout with labelled `.field` blocks (label, input, hint, error message) styled with CSS.
- Added `width`/`height` and `loading="lazy"` to images and improved alt text so each describes what the photo shows.
- Added a skip-to-content link, `aria-current` on the active navigation item and a responsive mobile menu.

**New in Part 3**
- Added `css/styles.css`: moss green and brass palette, Poppins/Lato fonts, responsive grid layout and focus styles.
- Added `js/main.js` and `js/data.js` with accordion, tabs, modals, gallery lightbox, scroll animations, Leaflet map, and timetable search/filter/sort.
- Added `faq` accordion and class-type tabs to `services.html`, and instructor bio modals to `about.html`.
- Added gallery with lightbox to `index.html` and `about.html`.
- Added interactive map with both studio locations to `contact.html`.
- Rebuilt `enquiries.html` form with branch, package and date fields, JavaScript validation, AJAX submission and a response showing cost and availability.
- Rebuilt `contact.html` form with message type, validation, and a compiled email the client can send to the recipient stated in the code.
- Added unique titles, meta descriptions, keywords, canonical links, Open Graph tags and LocalBusiness JSON-LD to every page.
- Added `robots.txt` and `sitemap.xml`.
- Added Content-Security-Policy, referrer policy and Subresource Integrity on CDN scripts.
- Updated folder structure: `css_assets`, `js_assets` and `private` replaced by `css` and `js`.
- Deployed the site to GitHub Pages.

### [1.1.0] - 2026-08-14
- Updated studio locations from Rosebank & Bryanston to Rosebank & Midrand, Johannesburg, and corrected addresses across all footers and the Contact page
- Added descriptive comments across all HTML files (e.g. `<!-- Logo -->`, `<!-- Hero Image -->`, `<!-- Address -->`) to improve code readability
- Added `smallphoto.png` to the "Why Choose RESET?" section on `index.html`
- Added `largephoto.png` to the "Our Classes" section on `index.html`
- Added alt text to logo images that were previously missing descriptions

### [1.0.0] - 2026-08-13
- Fixed inconsistent studio addresses across all footers (previously mismatched between pages)
- Corrected mismatched location details on `contact.html`
- Wrapped content blocks on `about.html` in semantic `<section>` tags
- Replaced incorrect `<pre>` tag with `<p>` for tagline text
- Fixed missing space in `herophoto.png` image tag on `index.html`

### [0.1.0] - 2026-08-12
- Initial creation of five HTML pages: `index.html`, `about.html`, `services.html`, `enquiries.html`, `contact.html`
- Created folder structure (`css_assets`, `images`, `js_assets`, `private`)
- Added enquiry form to `enquiries.html`
- Added contact form and studio location details to `contact.html`
- Added pricing table and class descriptions to `services.html`
- Added instructor profiles and mission/vision content to `about.html`

## References

Google, 2026. *Google Maps.* [online] Available at: <https://www.google.com/maps> [Accessed 2 November 2026].

Google, 2026. *Search Central: SEO Starter Guide.* [online] Available at: <https://developers.google.com/search/docs> [Accessed 31 October 2026].

Schema.org, 2026. *Schema.org.* [online] Available at: <https://schema.org> [Accessed 31 October 2026].

Google Fonts, 2026. *Google Fonts.* [online] Available at: <https://fonts.google.com> [Accessed 14 August 2026].

The Independent Institute of Education, 2026. *WEDE5020: Web Design and Development – Module Manual.* Johannesburg: IIE.

Unsplash, 2026. *Unsplash.* [online] Available at: <https://unsplash.com> [Accessed 14 August 2026].

---
© RESET Pilates Studio 2026
