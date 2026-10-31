# HakiOS Web

A mobile-first, single-file web UI prototype inspired by the general layout of HakiOS/iOS: lock screen, home screen, app grid, dock, Control Center, and lightweight demo apps.

## Run it on Android

1. Open this repository on GitHub.
2. Open `index.html`.
3. To run it as a website, enable GitHub Pages in **Settings → Pages** and select the `main` branch and `/(root)`.
4. Wait for the Pages deployment, then open the published website on your phone.

## Included

- Responsive lock screen and home screen
- Swipe-up unlock gesture
- Dynamic Island-style expandable pill
- Status bar and date/time
- Control Center toggles, brightness and volume sliders
- Home-screen icons and dock
- Demo apps: Messages, Notes, Contacts, Safari-style search screen, Settings, Camera, Photos, Phone, Calendar, Clock, Music, Maps, Mail, App Store, YouTube, and Files
- Local browser storage for notes, messages, contacts, and recent searches
- Wallpaper switching

## Important notes

This is a **web simulator**, not the HakiOS operating system or a bootable iOS environment. The upstream [HakiOS kernel repository](https://github.com/oosexgang/hakios-xnu-kernel) is an operating-system/kernel project and does not distribute a complete web-ready copy of iOS artwork, fonts, screenshots, or app assets. This project therefore recreates the general visual language with original CSS/SVG shapes and placeholders; it does not contain Apple's proprietary assets or claim pixel-perfect equivalence.

Some app screens are visual demos. Safari-style search stores recent terms locally but does not fetch real Google results; Camera does not take photos; Music does not play audio; Maps and Photos use placeholders.

## Credits and licensing

- HakiOS upstream project: https://github.com/oosexgang/hakios-xnu-kernel
- This web prototype is a separate implementation and is not affiliated with or endorsed by Apple or the HakiOS maintainers.
- No upstream kernel code or Apple/iOS artwork is copied into this web UI. Review the upstream repository's license and notices separately before reusing its code.
