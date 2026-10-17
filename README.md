# QuickNotes App

QuickNotes is a lightweight, responsive, and secure note-taking web application built entirely with vanilla HTML5, CSS3, and modern JavaScript. It allows users to quickly capture thoughts, categorize entries into distinct groups (Personal, Work, Study, and Ideas), perform real-time search filtering, and preserve their notes seamlessly across browser sessions using `localStorage`. Designed with a focus on web semantics, accessible forms, safe DOM manipulation practices, and clean responsive design, QuickNotes delivers a sleek and intuitive productivity tool without the overhead of external libraries or frameworks.

## Features

- **Semantic HTML5 Architecture**: Structured with clean semantic tags (`<header>`, `<main>`, `<section>`, and `<footer>`) and accessible form controls.
- **Card-Based UI with Category Themes**: Notes are rendered as elevated cards with distinct visual color accents and badges for each category (`Personal`, `Work`, `Study`, and `Ideas`).
- **Safe DOM Rendering**: List items and user content are constructed strictly using `document.createElement()` and `textContent` to prevent cross-site scripting (XSS) vulnerabilities.
- **Instant Validation**: Client-side validation prevents empty submissions and restricts notes to a maximum of 200 characters with live error feedback.
- **Dynamic Pluralized Counter**: An interactive counter dynamically displays accurate status for zero (`0 notes`), one (`1 note`), and multiple notes (`X notes`).
- **Real-Time Search & Filtering**: Instant live search filters notes by both note body text and category names as the user types.
- **Persistent Storage**: All notes automatically persist in the browser via `localStorage` with `JSON.stringify` and `JSON.parse`.
- **Responsive Layout**: Designed mobile-first with Flexbox and media queries (`@media (max-width: 600px)`) ensuring a seamless experience across all screen sizes.

## How to Run the Project Locally

Because QuickNotes is built with pure vanilla web standards, it requires no package installations or build steps.

### Method 1: Direct File Opening
1. Clone the repository:
   ```bash
   git clone https://github.com/FranNMK/quicknotes-app.git
   cd quicknotes-app
   ```
2. Double-click `index.html` or open it directly in any modern web browser (Chrome, Firefox, Safari, Edge).

### Method 2: Local HTTP Server (Recommended)
You can run a lightweight local server using Python or Node.js:

- **Using Python 3**:
  ```bash
  python3 -m http.server 8000
  ```
  Then navigate to `http://localhost:8000` in your browser.

- **Using Node / npx**:
  ```bash
  npx serve .
  ```
  Then visit the URL provided in the terminal.

- **Using VS Code Live Server**:
  Right-click `index.html` and click **"Open with Live Server"**.

## What I Learned

During the development of this project, several key concepts and best practices were reinforced:

1. **Semantic HTML and Accessible Form Design**: I learned how crucial proper semantic structuring is for accessibility, screen readers, and maintainability. Specifically, ensuring that `<label>` elements are explicitly linked to input elements using the `for` attribute and `id` guarantees a seamless user experience.
2. **Defensive DOM Manipulation & Security**: I gained hands-on experience avoiding `innerHTML` when handling user input. By utilizing `document.createElement()`, `classList`, and `textContent`, the application remains secure against injection attacks and cross-site scripting (XSS) while rebuilding the DOM deterministically.
3. **State Management & Local Storage Persistence**: I deepened my understanding of client-side state handling. Managing an in-memory array of note objects, synchronizing state with browser `localStorage` through `JSON.stringify()` and `JSON.parse()`, and centralizing the UI update inside a unified `render()` function provided a solid architecture pattern.
4. **Responsive CSS Design with Modern Flexbox**: I practiced building clean, fluid layouts using CSS custom properties, flex containers, and mobile media queries (`max-width: 600px`), ensuring that both form controls and card collections gracefully adapt to small viewports.
