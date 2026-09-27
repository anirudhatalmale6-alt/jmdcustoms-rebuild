# JMD Customs Brokers Inc. — static rebuild

Static HTML/CSS/JS reconstruction of jmdcustoms.com (previously WordPress +
Astra + Elementor Pro), rebuilt after the host lost the site files.

## Design recovered from the archive, not guessed

The original theme settings were pulled out of the Wayback Machine snapshot of
2025-08-22, which still holds the compiled stylesheets:

| Token | Value | Source |
|---|---|---|
| Brand navy | `#0A2463` | Elementor kit `post-9.css` (`--e-global-color-a28a494`) |
| Logo green | `#0D9746` | Elementor kit (`--e-global-color-a45ba91`) |
| Orange | `#F37D02` | Elementor kit (`--e-global-color-045fb81`) |
| Link / accent | `#fb2056` | Astra palette (`--ast-global-color-0`) |
| Link hover | `#da1c4b` | Astra palette (`--ast-global-color-1`) |
| Body text | `#7A7A7A` | Elementor (`--e-global-color-text`) |
| Footer | `#54595F` | Elementor (`--e-global-color-secondary`) |
| Headings | Montserrat 700 | Astra typography |
| Body | Noto Sans 400 | Astra typography |
| Container | 1200px | Astra (`--ast-normal-container-width`) |

Logo and photography are the original asset files retrieved from the archive.

## Navigation

Reconstructed from the live DOM of the archived page:

- Homepage
- Services ▾ — Customs Clearance / Warehousing and Distribution / Bonded Warehouse
- Resources
- Gallery ▾ — Bonded / Warehouse / Logistics
- Contact Us
- Buttons: Get a Quote, PARS Tracker

## Stack

Plain HTML, CSS and vanilla JS. No build step, no framework, no dependencies.
Drop the folder on any host.

## Notes

- The quote form validates client-side but is not yet connected to an inbox.
- Inner pages are not built yet; this is the homepage reference build.
