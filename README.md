# Lather — Head Spa Website

A luxury head spa website for **Lather**, located in Greenville, NC. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS custom properties
- **Fonts**: Cormorant Garamond (display) + Jost (body) via Google Fonts

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main page
│   └── globals.css       # Global styles & CSS variables
├── components/
│   ├── Navbar.tsx        # Fixed navigation with scroll effect + mobile menu
│   ├── Hero.tsx          # Full-height hero section
│   ├── Services.tsx      # Services listing (row-based layout)
│   ├── About.tsx         # Philosophy & brand values (dark section)
│   ├── Book.tsx          # Booking CTA + contact info
│   └── Footer.tsx        # Footer
└── lib/
    └── data.ts           # Services & brand values data
```

## Design System

| Token | Value | Usage |
|---|---|---|
| `--cream` | `#F7F3EE` | Main background |
| `--linen` | `#EDE6DB` | Hero & booking backgrounds |
| `--stone` | `#8C7B6B` | Muted labels & secondary text |
| `--mink` | `#6B5C4E` | Body text |
| `--bark` | `#3D2E22` | Headings, dark sections, CTA buttons |
| `--sage` | `#A3AC94` | Service taglines |
| `--blush` | `#D4B8A8` | Accent highlights, dividers |

## Services

| Service | Price | Duration |
|---|---|---|
| The Classic Ritual | $125 | 75 min |
| Revitalize & Restore | Inquire | 90 min |
| Nourish & Fortify | Inquire | 90 min |
| Gentleman's Recharge | Inquire | 60 min |

## Customization

- **Services & pricing**: Edit `src/lib/data.ts`
- **Contact details**: Update phone/email in `src/components/Book.tsx`
- **Hours**: Update in `src/components/Book.tsx`
- **Colors**: Modify CSS variables in `src/app/globals.css`

## Next Steps

- [ ] Add a booking integration (Vagaro, Mindbody, Square Appointments, or Acuity)
- [ ] Add real photography to Hero and About sections
- [ ] Set up a contact/inquiry form (Formspree, Resend, etc.)
- [ ] Configure a custom domain
- [ ] Add Google Analytics
- [ ] Update placeholder phone number and email
