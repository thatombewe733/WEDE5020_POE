# RESET Pilates Studio

A responsive, multi-page website for a fictional Pilates studio, built as part of the WEDE5020 (Web Development Introduction) Portfolio of Evidence — Part 2: Designing the Visuals (CSS Styling and Responsive Design).

**Live pages:** `index.html` (Home), `about.html`, `services.html`, `enquiries.html`, `contact.html`

---

## Project Overview

RESET Pilates Studio is a small studio with two Johannesburg locations (Rosebank and Midrand) offering Mat Pilates, Reformer Pilates, and Private Sessions. The site presents the studio's story, class offerings, pricing, and contact/enquiry forms across five linked HTML pages, all styled from a single external stylesheet.

## Folder Structure

```
REsETPilateStudio_Part2/
├── index.html
├── about.html
├── services.html
├── enquiries.html
├── contact.html
├── README.md
├── css_assets/
│   └── style.css
├── images/
│   ├── studiologo.png
│   ├── herophoto.png
│   ├── smallphoto.png
│   └── largephoto.png
├── screenshots/
│   ├── mobile-320px.png
│   ├── tablet-768px.png
│   └── desktop-1280px.png
├── js_assets/        (reserved for future JS — currently empty)
└── private/          (reserved — currently empty)
```

## Technologies Used

- **HTML5** — semantic structure (`header`, `nav`, `main`, `section`, `footer`) across all five pages
- **CSS3** — a single external stylesheet (`css_assets/style.css`) linked to every page, using:
  - CSS custom properties (`:root` variables) for a consistent colour palette, typography scale, and spacing scale
  - Flexbox for the header, navigation, and text/image sections
  - CSS Grid for the services cards and class-steps layout
  - Media queries at `768px` and `480px` breakpoints for tablet and mobile
  - Pseudo-classes (`:hover`, `:focus`, `:active`) on navigation links, buttons, form fields, and table rows

## Responsive Design Testing

The site was tested using Chrome DevTools' device toolbar across three representative breakpoints to confirm the layout adapts correctly.

### Mobile (320px)
Navigation collapses to a full-width stacked column, and the hero/media sections stack vertically.

![Mobile view at 320px](screenshots/mobile-320px.png)

### Tablet (~768px)
Navigation switches to a horizontal row; the services grid reduces to two columns.

![Tablet view at ~768px](screenshots/tablet-768px.png)

### Desktop (1280px)
Full multi-column layout: horizontal navigation, side-by-side text/image sections, and a three-column services grid.

![Desktop view at 1280px](screenshots/desktop-1280px.png)

**Observations from testing:**
- Layout, navigation, and typography all adjust smoothly between breakpoints with no horizontal scrolling or overlapping content.
- Images scale correctly within their containers at every size (`max-width: 100%`).
- **Follow-up item:** images are currently served as a single fixed-resolution file at every breakpoint. A future iteration should add `srcset`/`sizes` (or `<picture>`) so smaller images are served to mobile devices, reducing load time.

---

## Changelog

All notable changes to this project are documented here, most recent first.

### [Part 2] — CSS Styling and Responsive Design
- Added external stylesheet `css_assets/style.css` and linked it from all five HTML pages.
- Established a base/reset style (`box-sizing: border-box`, margin/padding reset) and a shared colour and typography scale using CSS custom properties.
- Applied typographic styling (font family, size scale, line height, letter spacing) across headings, body text, and the tagline.
- Built the desktop layout using Flexbox (header, nav, media sections) and CSS Grid (services cards, class steps).
- Applied visual/decorative styling: colour palette, background colours, border-radius, and box-shadow on cards, buttons, and the logo.
- Implemented interactive states with `:hover`, `:focus`, and `:active` pseudo-classes on navigation links, the call-to-action button, form inputs, and pricing table rows.
- Added responsive design: media queries at 768px (tablet) and 480px (mobile) breakpoints, switching multi-column layouts to single-column and adjusting font sizes and navigation for smaller screens.
- Used relative units (`rem` for spacing/typography, `%`/`max-width` for images and inputs) to support responsiveness.
- Tested the site across mobile, tablet, and desktop widths using browser developer tools; added screenshot evidence to this README (see *Responsive Design Testing* above).

### [Part 1 feedback addressed]
> **TODO:** Add the specific corrections made in response to your Part 1 marker feedback here — e.g. "Fixed heading hierarchy on About page," "Added missing alt text," "Corrected navigation link on Services page," etc. Copy each point of feedback you received and describe the exact change made against it, so the lecturer can see it was actioned.

### [Part 1] — Structure and Content (prior submission)
- Initial five-page HTML structure created: Home, About Us, Services, Enquiries, Contact Us.
- Semantic HTML markup, navigation, forms, and initial content added prior to CSS styling.

---

## References

> **TODO:** Replace/expand this list with the actual sources you consulted while building the site (Harvard referencing style, as required by the module). Suggested starting points based on the techniques used in this project:

- Mozilla Developer Network (MDN). *CSS Flexible Box Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout (Accessed: [date]).
- Mozilla Developer Network (MDN). *CSS Grid Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout (Accessed: [date]).
- Mozilla Developer Network (MDN). *Using media queries*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries (Accessed: [date]).
- Mozilla Developer Network (MDN). *CSS Custom Properties (--*)*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties (Accessed: [date]).
- W3Schools. *CSS Pseudo-classes*. Available at: https://www.w3schools.com/css/css_pseudo_classes.asp (Accessed: [date]).

---

## Author

Thato Mbewe — WEDE5020, The Independent Institute of Education (IIE)
