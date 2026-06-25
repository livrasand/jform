# JFORM Documentation

## What is JFORM?

JFORM is an open-source form protocol designed under a "Privacy-First" and "Developer-First" philosophy, eliminating the need for centralized databases or opaque third-party services.

Unlike traditional platforms (like Google Forms or Typeform) where data belongs to the provider, JFORM turns the GitHub repository into the source of truth and allows each developer to maintain total control over how their responses are processed and stored.

### Core Pillars

- **Decentralization**: Forms are defined using configuration files in `.jform` format (JSON) hosted directly in the user's repository.
- **Zero-Telemetry**: The rendering engine runs entirely in the user's browser (Client-Side). No trackers, no invasive cookies, no logs on intermediate servers.
- **Destination Flexibility (Transport)**: The user decides where their data goes. JFORM is not a store, it's a bridge:
  - **Via Email**: Data is processed in memory and sent to a configured email.
  - **Via Webhook**: Data is sent directly to the user's own server or custom API.
- **Git-Native**: Since `.jform` files live in a repository, versioning, auditing, and collaboration (via Pull Requests) are native.

### Manifesto

> "Forget vendor lock-in, centralized databases, and invasive telemetry. JFORM is the first privacy-first form engine designed as infrastructure as code. Instead of fighting with heavy visual builders, simply define your form structure in a `.jform` file inside your GitHub repository. You maintain absolute ownership of your code and decide exactly where responses flow: to your own server, a webhook, or directly to your email. Zero trackers, pure performance, and privacy by default. Data control returns to where it belongs."

---

## Comparison with Other Tools

| Feature | Form.io | RJSF (React) | JFORM |
|---------|---------|--------------|-------|
| Focus | Enterprise / SaaS | Developer (React) | Privacy-First / Git-Ops |
| Backend | Required (Own) | Indifferent | Decentralized / User-owned |
| Weight | Heavy | Medium (React) | Ultra-light |
| Data Control | On Form.io servers | Where you decide | Where the user chooses |
| Installation | SDK/API | NPM Install | URL-based (No installation) |

### Why does JFORM fill a real gap?

While Form.io and RJSF are powerful tools, JFORM fills a void for the individual developer or Open Source maintainer who:

- Doesn't want to set up a database for a simple contact or sponsor form.
- Doesn't want to depend on SaaS services that may change their privacy policies or pricing.
- Loves the Git ecosystem: Using `.jform` files within a repo allows forms to be versionable, transparent, and auditable.

---

## How to Create a Form

### Phase 1: Deploying the Engine (Your task as maintainer)

1. **The Central Repository**: Create the official repository `livrasand/jform`.
2. **The Frontend (Vercel/Fly.io)**: Deploy your static JavaScript code (`jform.vercel.app`). This frontend will always point to the `main` branch of your repository to read schemas.

### Phase 2: Creating a Form (The user flow / GitOps)

When a developer wants to create a new form, this is the exact flow:

1. **Fork**: The user makes a "Fork" of your official repository `livrasand/jform` to their own GitHub account.
2. **Create their space**: In their fork, navigate to the `/forms/` folder and create a subdirectory with their username (e.g., `/forms/mydomain/`).
3. **Write the schema**: Inside their folder, create the `.jform` file (e.g., `sponsor.jform`) and define their fields and transport:

```json
{
  "title": "Sponsors Data",
  "fields": [...],
  "transport": { ... }
}
```

4. **Pull Request (PR)**: The user commits their changes and opens a Pull Request to your official repository.
5. **Live**: Once you approve and merge the PR, their form becomes instantly available on the web via the dynamic route: `jform.vercel.app/mydomain/sponsor`.

---

## Receiving Responses (The 3 paths)

The user defines in their `.jform` file how they want to receive information, choosing one of these three methods:

### 1. "Self-Hosted" Method (Total Control)

**How it works**: The user processes data on their own server. When submitting the form, the frontend makes a direct POST to the user's infrastructure.

**Configuration**:
```json
"transport": {
  "type": "webhook",
  "destination": "https://user-server.com/api/endpoint"
}
```

### 2. "Mail-Proxy" Method (SaaS Experience without DB)

**How it works**: The user doesn't manage any backend. The JFORM frontend sends data temporarily to your proxy server, which formats the information, fires it to the user's email, and immediately deletes data from memory.

**Configuration**:
```json
"transport": {
  "type": "email",
  "destination_id": "user_token_123"
}
```

### 3. "Third-Party" Method (Open Source Delegation)

**How it works**: The user delegates collection to specialized free services (Formspree, Make, Zapier) or uses GitHub's own API to receive data as "Issues" in a private repository. Zero code required by the user or JFORM.

**Configuration**:
```json
"transport": {
  "type": "webhook",
  "destination": "https://formspree.io/f/unique-code"
}
```

---

## Schema v2

Schema v2 introduces full support for:

- **All field types**: text, email, url, number, textarea, radio, checkbox, select, radio_grid, checkbox_grid, scale, rating, date, time, file, image, video, image_selection, csat, cta
- **Advanced themes**: Support for HEX, RGB, HSL, HSV, and CMYK
- **Google Fonts**: Dynamic font injection
- **Custom header**: Cover image, title, subtitle, specific font
- **Media Elements**: Images and videos interspersed between fields
- **Flexible transport**: Webhook or Email relay

### Complete Example

```json
{
  "$schema": "https://jform.vercel.app/schema.v1.json",
  "form_id": "ultimate-demo-2026",
  "settings": {
    "language": "en",
    "submit_button_text": "Submit"
  },
  "transport": {
    "type": "webhook",
    "destination": "https://user-server.com/api/endpoint"
  },
  "theme": {
    "font_family": "Inter, sans-serif",
    "google_fonts_url": "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Oswald:wght@500&display=swap",
    "page_background": "url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070')",
    "form_background": "rgba(255, 255, 255, 0.85)",
    "colors": {
      "primary_hex": "#0070f3",
      "secondary_rgb": "rgb(255, 99, 71)",
      "text_hsl": "hsl(210, 29%, 24%)",
      "accent_hsv": "hsv(120, 100%, 50%)",
      "border_cmyk": "cmyk(0%, 0%, 0%, 20%)"
    }
  },
  "header": {
    "cover_image": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088",
    "title": "JFORM Form: Ultimate Demo",
    "subtitle": "Demonstration of all capabilities of the open source and privacy-first protocol.",
    "title_font": "Oswald, sans-serif"
  },
  "elements": [
    {
      "id": "info_video",
      "type": "video",
      "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "description": "Please watch this video before starting."
    },
    {
      "id": "q1_short",
      "type": "text",
      "label": "Short answer",
      "placeholder": "Write your name...",
      "required": true
    },
    {
      "id": "q2_paragraph",
      "type": "textarea",
      "label": "Paragraph",
      "placeholder": "Tell us about your open source philosophy...",
      "rows": 4,
      "required": false
    },
    {
      "id": "q3_multiple_choice",
      "type": "radio",
      "label": "Multiple choice (Choose one)",
      "required": true,
      "options": [
        { "value": "go", "label": "Go" },
        { "value": "rust", "label": "Rust" },
        { "value": "ts", "label": "TypeScript" }
      ]
    },
    {
      "id": "q4_checkboxes",
      "type": "checkbox",
      "label": "Checkboxes (Choose multiple)",
      "required": false,
      "options": [
        { "value": "privacy", "label": "Privacy" },
        { "value": "security", "label": "Security" },
        { "value": "performance", "label": "Performance" }
      ]
    },
    {
      "id": "q5_dropdown",
      "type": "select",
      "label": "Dropdown",
      "required": true,
      "options": [
        { "value": "linux", "label": "Linux" },
        { "value": "macos", "label": "macOS" },
        { "value": "windows", "label": "Windows" }
      ]
    },
    {
      "id": "q6_file",
      "type": "file",
      "label": "Upload files",
      "description": "Upload your avatar or GPG public key",
      "accept": "image/png, .asc",
      "max_size_mb": 5,
      "required": false
    },
    {
      "id": "mid_image",
      "type": "image",
      "url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000",
      "alt_text": "Computer with code",
      "caption": "Take a breather, we're almost done."
    },
    {
      "id": "q7_linear_scale",
      "type": "scale",
      "label": "Linear scale",
      "description": "How important is open source to you?",
      "min": 1,
      "max": 5,
      "min_label": "Not important",
      "max_label": "Vital",
      "required": true
    },
    {
      "id": "q8_rating",
      "type": "rating",
      "label": "Rating",
      "icon": "star",
      "max_stars": 5,
      "required": false
    },
    {
      "id": "q9_radio_grid",
      "type": "radio_grid",
      "label": "Multiple choice grid",
      "description": "Evaluate the following tools",
      "required": true,
      "rows": [
        { "id": "r1", "label": "gitGost" },
        { "id": "r2", "label": "CodeTrackr" }
      ],
      "columns": [
        { "id": "c1", "label": "Bad" },
        { "id": "c2", "label": "Okay" },
        { "id": "c3", "label": "Excellent" }
      ]
    },
    {
      "id": "q10_checkbox_grid",
      "type": "checkbox_grid",
      "label": "Checkbox grid",
      "description": "Indicate which languages you use for each area",
      "required": false,
      "rows": [
        { "id": "r_backend", "label": "Backend" },
        { "id": "r_frontend", "label": "Frontend" }
      ],
      "columns": [
        { "id": "c_ts", "label": "TypeScript" },
        { "id": "c_rust", "label": "Rust" },
        { "id": "c_go", "label": "Go" }
      ]
    },
    {
      "id": "q11_date",
      "type": "date",
      "label": "Project start date",
      "required": true
    },
    {
      "id": "q12_time",
      "type": "time",
      "label": "Last commit time",
      "required": false
    }
  ]
}
```

---

## Schema Reference

### Root Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | No | URL of the JSON schema for validation |
| `form_id` | string | No | Unique identifier for the form |
| `settings` | object | No | General form settings |
| `transport` | object | Yes | How responses are delivered |
| `theme` | object | No | Visual customization |
| `header` | object | No | Form header (cover image, title) |
| `elements` | array | Yes | List of fields and layout elements |

---

### `settings`

```json
"settings": {
  "language": "es",
  "submit_button_text": "Send",
  "confirmation_message": "Thanks for your response!"
}
```

| Property | Type | Description |
|----------|------|-------------|
| `language` | `"es"` \| `"en"` | UI language for labels and error messages |
| `submit_button_text` | string | Custom text for the submit button |
| `confirmation_message` | string | Message shown after successful submission. If omitted, shows the default JFORM message |

---

### `transport`

#### Email relay

```json
"transport": {
  "type": "email",
  "destination": "jf_your_token_here"
}
```

Requires registering your email at `jform.vercel.app` to get a `jf_` token. Responses arrive as formatted emails with attachments included.

#### Webhook

```json
"transport": {
  "type": "webhook",
  "destination": "https://your-server.com/api/endpoint"
}
```

Sends a `multipart/form-data` POST directly to your server.

---

### `theme`

```json
"theme": {
  "font_family": "Inter, sans-serif",
  "google_fonts_url": "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
  "page_background": "url('https://images.unsplash.com/photo-xxx')",
  "form_background": "rgba(255, 255, 255, 0.85)",
  "colors": {
    "primary_hex": "#0070f3",
    "secondary_rgb": "rgb(255, 99, 71)",
    "text_hsl": "hsl(210, 29%, 24%)",
    "accent_hsv": "hsv(120, 100%, 50%)",
    "border_cmyk": "cmyk(0%, 0%, 0%, 20%)"
  }
}
```

| Property | Description |
|----------|-------------|
| `font_family` | CSS font-family applied to the entire form |
| `google_fonts_url` | Google Fonts URL injected as `<link>` in the page head |
| `page_background` | CSS value for the page background — color, gradient, or `url('...')` image. Fixed to viewport (no scroll) |
| `form_background` | CSS value for the form card background — supports rgba for transparency over the page background |
| `colors.primary_hex` | Primary color in HEX — used for buttons and accents |
| `colors.secondary_rgb` | Secondary color in RGB |
| `colors.text_hsl` | Text color in HSL |
| `colors.accent_hsv` | Accent color in HSV (converted automatically) |
| `colors.border_cmyk` | Border color in CMYK (converted automatically) |

---

### `header`

```json
"header": {
  "cover_image": "https://images.unsplash.com/photo-xxx",
  "title": "My Form",
  "subtitle": "A short description of this form.",
  "title_font": "Oswald, sans-serif"
}
```

| Property | Description |
|----------|-------------|
| `cover_image` | URL of the banner image shown at the top of the form |
| `title` | Main form title |
| `subtitle` | Subtitle or description shown below the title |
| `title_font` | CSS font-family used only for the title |

---

### `elements` — Field Types

Every element requires a unique `id` and a `type`. Most field types also accept:

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | **Required.** Unique identifier (used as form field name) |
| `type` | string | **Required.** Element type (see below) |
| `label` | string | Field label shown to the user |
| `description` | string | Helper text shown below the label |
| `required` | boolean | Whether the field must be filled before submitting |
| `placeholder` | string | Placeholder text inside the input |
| `border_top` | string | CSS border for the top side, e.g. `"2px solid #0070f3"` |
| `border_bottom` | string | CSS border for the bottom side |
| `border_left` | string | CSS border for the left side |
| `border_right` | string | CSS border for the right side |
| `hide_on_mobile` | boolean | Whether the element should be hidden on mobile screens (width < 640px). Default: false |

#### `text`
Single-line text input.
```json
{ "id": "name", "type": "text", "label": "Your name", "placeholder": "Jane Doe", "required": true }
```

#### `textarea`
Multi-line text input.
```json
{ "id": "bio", "type": "textarea", "label": "Bio", "rows": 4, "required": false }
```
Extra property: `rows` (number) — height of the textarea.

#### `email` / `url` / `number`
Same as `text` but with browser-native validation.
```json
{ "id": "contact", "type": "email", "label": "Email", "required": true }
```

#### `select`
Dropdown selector.
```json
{
  "id": "os", "type": "select", "label": "OS", "required": true,
  "options": [
    { "value": "linux", "label": "Linux" },
    { "value": "macos", "label": "macOS" }
  ]
}
```

#### `radio`
Single choice from a list.
```json
{
  "id": "lang", "type": "radio", "label": "Favorite language", "required": true,
  "options": [
    { "value": "go", "label": "Go" },
    { "value": "rust", "label": "Rust" }
  ]
}
```

#### `checkbox`
Multiple choices from a list.
```json
{
  "id": "features", "type": "checkbox", "label": "What do you value?",
  "options": [
    { "value": "privacy", "label": "Privacy" },
    { "value": "speed", "label": "Speed" }
  ]
}
```

#### `scale`
Linear scale between two numbers with colored labels and optional segment bars.
```json
{
  "id": "importance", "type": "scale", "label": "How important?",
  "min": 1, "max": 5,
  "min_label": "Not at all", "max_label": "Very much",
  "min_label_color": "#e53935",
  "max_label_color": "#43a047",
  "scale_colors": [
    { "color": "oklch(94.1% .03 12.58)", "pct": 60 },
    { "color": "oklch(95.4% .038 75.164)", "pct": 20 },
    { "color": "oklch(95% .052 163.051)", "pct": 20 }
  ],
  "scale_style": "default",
  "required": true
}
```

| Property | Default | Description |
|----------|---------|-------------|
| `min` | `1` | Minimum value |
| `max` | `5` | Maximum value |
| `min_label` | — | Text shown on the left above the numbers |
| `max_label` | — | Text shown on the right above the numbers |
| `min_label_color` | `var(--text-2)` | Custom color for the left label |
| `max_label_color` | `var(--text-2)` | Custom color for the right label |
| `scale_colors` | — | Array of color segments. Each object has `color` (any valid CSS color) and `pct` (percentage of options that get that color). Colors distribute proportionally across the range — e.g. 60/20/20 with 5 options yields 3 bars in color A, 1 in B, 1 in C. Percentages are normalized to 100% automatically. |
| `scale_style` | `"default"` | Visual style for the options: `"default"` (colored top bar via `::before`), `"bordered"` (colored border around the whole option), or `"borderless"` (no border, subtle background on select). |

#### `rating`
Star rating.
```json
{ "id": "stars", "type": "rating", "label": "Rate us", "max_stars": 5, "required": false }
```

#### `radio_grid`
Grid where each row has a single radio choice across columns.
```json
{
  "id": "eval", "type": "radio_grid", "label": "Evaluate tools",
  "rows": [{ "id": "r1", "label": "Tool A" }],
  "columns": [{ "id": "c1", "label": "Bad" }, { "id": "c2", "label": "Good" }]
}
```

#### `checkbox_grid`
Grid where each row can have multiple checkboxes checked.
```json
{
  "id": "usage", "type": "checkbox_grid", "label": "Usage by area",
  "rows": [{ "id": "r_be", "label": "Backend" }],
  "columns": [{ "id": "c_ts", "label": "TypeScript" }, { "id": "c_go", "label": "Go" }]
}
```

#### `date`
Native date picker.
```json
{ "id": "start_date", "type": "date", "label": "Start date", "required": true }
```

#### `time`
Native time picker.
```json
{ "id": "meeting_time", "type": "time", "label": "Meeting time" }
```

#### `file`
File upload. Files are sent as email attachments when using the email transport.
```json
{
  "id": "avatar", "type": "file", "label": "Upload file",
  "accept": "image/png, .pdf",
  "max_size_mb": 5,
  "required": false
}
```

| Property | Description |
|----------|-------------|
| `accept` | Comma-separated MIME types or extensions |
| `max_size_mb` | Maximum file size in MB (client-side hint) |

#### `image`
Displays an image inside the form (not a field, no user input).
```json
{
  "id": "banner", "type": "image",
  "url": "https://example.com/photo.jpg",
  "alt_text": "A photo",
  "caption": "Caption shown below the image"
}
```

#### `video`
Embeds a video (YouTube, Vimeo, etc.) inside the form.
```json
{
  "id": "intro", "type": "video",
  "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "description": "Watch this before continuing."
}
```

#### `image_selection`
Image selector where respondents can choose from a set of predefined images. Supports single (radio) or multiple (checkbox) selection.
```json
{
  "id": "img_choice", "type": "image_selection",
  "label": "Select an image",
  "description": "Choose your preferred option",
  "selection_mode": "single",
  "required": false,
  "image_options": [
    { "value": "opt1", "label": "Option A", "url": "https://example.com/img1.jpg" },
    { "value": "opt2", "label": "Option B", "url": "https://example.com/img2.jpg" }
  ]
}
```

| Property | Description |
|----------|-------------|
| `selection_mode` | `"single"` for radio-style (one image) or `"multiple"` for checkbox-style (multiple images) |
| `image_options` | Array of image options. Each must have `value` (identifier), `label` (display text), and `url` (image URL) |

#### `csat`
Customer Satisfaction (CSAT) rating with emoji scale. Respondents select from a scale of emoticons to rate their satisfaction.
```json
{
  "id": "satisfaction", "type": "csat",
  "label": "How satisfied are you?",
  "description": "Rate your experience",
  "scale": 5,
  "required": false,
  "csat_labels": ["Very dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very satisfied"]
}
```

| Property | Default | Description |
|----------|---------|-------------|
| `scale` | `5` | Number of scale options (3-10) |
| `csat_labels` | — | Array of labels for each scale option. Must match the length of `scale` |

#### `cta`
Call to Action button that links to an external URL. Displays a styled button with customizable text and link.
```json
{
  "id": "reserve", "type": "cta",
  "label": "Book your appointment",
  "button_text": "Reserve interview",
  "button_url": "https://calendly.com/example",
  "open_in_new_tab": true
}
```

| Property | Default | Description |
|----------|---------|-------------|
| `button_text` | — | Text displayed on the button |
| `button_url` | — | URL the button links to |
| `button_style` | `primary` | Button style: `"primary"` (accent color) or `"secondary"` (gray) |
| `open_in_new_tab` | `true` | Whether the link opens in a new tab |

#### `divider`
Horizontal separator line.
```json
{ "id": "sep1", "type": "divider", "spacing": 24, "thickness": 2, "color": "#e0e0e0" }
```

| Property | Default | Description |
|----------|---------|-------------|
| `spacing` | `16` | Vertical margin in px above and below |
| `thickness` | `1` | Line thickness in px |
| `color` | `var(--border)` | Line color |

#### `spacer`
Empty vertical space.
```json
{ "id": "gap1", "type": "spacer", "height": 40 }
```

| Property | Default | Description |
|----------|---------|-------------|
| `height` | `24` | Height in px |

#### `section`
Visual section heading to group fields.
```json
{
  "id": "sec1", "type": "section",
  "label": "Personal data",
  "description": "Fill in your details",
  "margin_top": 16
}
```

| Property | Description |
|----------|-------------|
| `label` | Bold section title |
| `description` | Subtitle or hint below the title |
| `margin_top` | Top margin in px (default `8`) |

---

## Implementation for the Engine (Frontend)

### Complex Color Support

Browsers natively interpret `rgb()`, `hsl()`, and HEX (`#`). For `cmyk()` and `hsv()`, your frontend JS script will require a small conversion function to RGB/HSL before injecting them as CSS variables (`--border-color`, etc.).

### Google Fonts

The frontend will read the `google_fonts_url` property and dynamically inject a `<link rel="stylesheet">` in the DOM's `<head>`, then apply the general `font_family` or the specific header font.

### Media Elements (image and video)

By separating the JSON into an `elements` array instead of `fields`, you tell the renderer: "Iterate over this. If the type doesn't require user input (it's image/video), simply draw the `<img>` or `<iframe>` tag and continue". This avoids sending empty data in the POST.

---

## How to Use JFORM

### Step 1: Fork the Repository

Go to `github.com/livrasand/jform` and click **Fork** to copy it to your account.

### Step 2: Create Your Folder

In your fork, navigate to `/forms/` and create a folder with your name, e.g., `/forms/yourdomain/`.

### Step 3: Write Your .jform File

Create a `contact.jform` file with your fields and how you want to receive responses.

### Step 4: Open a Pull Request

Commit and open a PR. Once approved, your form goes live at `jform.app/yourdomain/contact`.

---

## License

Open source under MIT license. Free and open source software.
