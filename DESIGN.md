# Design System: Precision Architect

## 1. Overview & Strategy
The **"Precision Architect"** design system moves beyond standard "Minimalist Tech" into **High-End Editorial Engineering**. The interface should feel structured, airy, and profoundly intentional—like a high-end physical architectural model. 

We break the "template" look by rejecting traditional boxed containment. Layout boundaries should be established through subtle background color shifts (`surface` to `surface-container-low`), creating "soft-edge" transitions.

## 2. Typography
- **Primary Font:** `Inter`
- **Monospace Font:** `ui-monospace` (used for short links, tags, and data-driven/technical labels)

### Text Styles
- **Display / Statements:** `Inter Extra Bold (800)` with `-0.02em` letter-spacing, using `On Surface` (#0d1c2d).
- **Headlines:** `Inter`, using `On Surface Variant` (#464554) to step down from Display text.
- **Body Text:** `Inter Regular` with generous line-height (`1.6`).

## 3. Color Palette
**Color Mode:** Light

### Core Colors
| Token | Color Code | Usage |
|-------|------------|-------|
| **Background / Surface** | `#f8f9ff` | Base application background, often with a faint 24px grid. |
| **Surface Container Lowest** | `#ffffff` | Elevated primary cards for a "purer-than-white" lift. |
| **Surface Container Low** | `#eef4ff` | Sub-sections resting on the base surface. |
| **Primary** | `#4648d4` | Main brand color. |
| **Primary Container** | `#6063ee` | Used in combination with Primary for CTA gradients. |
| **Secondary** | `#2d4fcf` | Accents and secondary elements. |
| **Secondary Container** | `#4b69ea` | Secondary emphasis. |
| **On Surface** | `#0d1c2d` | High-contrast main text (Display). |
| **On Surface Variant** | `#464554` | Medium-contrast secondary text (Headlines). |

### Foundational/Semantic Colors
- **Error:** `#ba1a1a`
- **On Error:** `#ffffff`
- **Outline:** `#767586`
- **Outline Variant:** `#c7c4d7` (Used at 15% opacity for "Ghost Borders")

## 4. UI Components & Tokens
- **Corner Roundness:** Softened corners, standard `8px` (`md` in Tailwind) up to fully rounded (`9999px`) for primary buttons.

### Interaction & Elevation Rules
1. **The "No-Line" Rule:** Do not use 1px solid borders to define layout sections. Rely on background color shifts (`#f8f9ff` to `#ffffff` or `#eef4ff`). If a border is strictly necessary for accessibility, use a "Ghost Border" (`#c7c4d7` at 15% opacity).
2. **Glassmorphism:** For sticky headers or floating navigation, use the `surface` color at 70% opacity combined with a `20px` backdrop-blur.
3. **Buttons:** Primary CTAs should use a linear gradient from `Primary` to `Primary Container` at a 135° angle, injecting 3D luminosity.
4. **Shadows:** Avoid default black drop shadows. Use ambient shadowed tints. For floating modals, use: `box-shadow: 0 24px 48px rgba(13, 28, 45, 0.06)`.
5. **Inputs:** `#ffffff` background with `8px` (`md`) radius. Focus state uses a 2px Ghost Border of `Primary` at 40% opacity.
