import { ElevationGrid } from "./components/ElevationGrid"
import { ShadowDemo } from "./components/ShadowDemo"
import { ComparisonSystems } from "./components/ComparisonSystems"
import { ComparisonTechniques } from "./components/ComparisonTechniques"
import { ColoredShadows } from "./components/ColoredShadows"
import { Playground } from "./components/Playground"

function Hero() {
  return (
    <header className="hero">
      <div className="hero-content">
        <div className="hero-icon">
          <span className="icon icon-layers icon-xl" />
        </div>
        <h1>Effective Shadow</h1>
        <p className="tagline">Calculated shadows, not guesswork.</p>
        <p className="hero-prose">
          Most shadow values are copied from tutorials or tweaked until "it
          looks okay". Effective Shadow uses <strong>Bézier curves</strong> to
          mathematically distribute multiple layers — creating the smooth
          falloff of real-world light. Use our presets, or build your own system
          with the calculation engine.
        </p>
        <div className="hero-actions">
          <a
            href="https://www.npmjs.com/package/@effective/shadow"
            className="btn btn-primary"
          >
            <span className="icon icon-package icon-md" />
            npm install @effective/shadow
          </a>
          <a
            href="https://github.com/sebastian-software/effective-shadow"
            className="btn btn-secondary"
          >
            <span className="icon icon-github icon-md" />
            GitHub
          </a>
        </div>
        <Integrations />
      </div>
    </header>
  )
}

function Integrations() {
  return (
    <div className="integrations">
      <span className="integrations-label">Works with</span>
      <div className="integration-logos">
        {/* React */}
        <div className="integration-logo" title="React">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4"
              stroke="#61DAFB"
              strokeWidth="1"
              fill="none"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4"
              stroke="#61DAFB"
              strokeWidth="1"
              fill="none"
              transform="rotate(60 12 12)"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4"
              stroke="#61DAFB"
              strokeWidth="1"
              fill="none"
              transform="rotate(120 12 12)"
            />
          </svg>
        </div>
        {/* Vue */}
        <div className="integration-logo" title="Vue">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 3h4l6 10.5L18 3h4L12 21 2 3z" fill="#42B883" />
            <path d="M6.5 3H12l0 0 5.5 0L12 13 6.5 3z" fill="#35495E" />
          </svg>
        </div>
        {/* Tailwind CSS */}
        <div className="integration-logo" title="Tailwind CSS">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 6c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 1.95-1.65 3.15-1.35.686.171 1.176.666 1.719 1.215C13.194 10.298 14.126 11.25 16.5 11.25c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.686-.171-1.176-.666-1.719-1.215C15.306 6.952 14.374 6 12 6zM7.5 11.25c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 1.95-1.65 3.15-1.35.686.171 1.176.666 1.719 1.215.825.833 1.757 1.785 4.131 1.785 2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.686-.171-1.176-.666-1.719-1.215C10.806 12.202 9.874 11.25 7.5 11.25z"
              fill="#06B6D4"
            />
          </svg>
        </div>
        {/* CSS/CSS Modules */}
        <div className="integration-logo" title="CSS Modules">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3l-.65 3.34h13.59L17.5 9H3.87l-.65 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64H2.16l-.72 3.63 7.89 3.01 9.09-3.01L21 3H5z"
              fill="#264DE4"
            />
          </svg>
        </div>
        {/* Vanilla JS */}
        <div className="integration-logo" title="Vanilla JavaScript">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E" />
            <path
              d="M13.5 18.5c.4.7 1 1.2 2 1.2.8 0 1.4-.4 1.4-1 0-.7-.6-1-1.5-1.4l-.5-.2c-1.5-.6-2.5-1.4-2.5-3.1 0-1.5 1.2-2.7 3-2.7 1.3 0 2.3.5 2.9 1.7l-1.6 1c-.4-.6-.7-.9-1.4-.9-.6 0-1 .4-1 .9 0 .6.4.9 1.3 1.3l.5.2c1.8.8 2.8 1.5 2.8 3.3 0 1.9-1.5 2.9-3.4 2.9-1.9 0-3.2-.9-3.8-2.1l1.8-1.1zM6.5 18.7c.3.5.5 1 1.2 1 .6 0 1-.2 1-1.2v-6.3h2v6.4c0 2-1.2 2.9-2.9 2.9-1.5 0-2.4-.8-2.9-1.7l1.6-1.1z"
              fill="#000"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function SectionElevation() {
  return (
    <section className="section" id="elevation">
      <div className="section-header">
        <span className="icon icon-sunrise icon-lg section-icon" />
        <h2>Elevation Levels</h2>
      </div>
      <div className="prose" style={{ marginBottom: 32 }}>
        <p>
          Seven levels with <strong>harmonic progression</strong> — each roughly
          1.5-2× the previous. Layer count increases with elevation for smoother
          gradients at higher depths.
        </p>
        <p>
          These aren't arbitrary values. The{" "}
          <a href="#playground">playground</a> exposes the full calculation
          engine if you need to build your own scale.
        </p>
      </div>
      <ElevationGrid />
    </section>
  )
}

function SectionWhyBezier() {
  return (
    <section className="section section-alt" id="why-bezier">
      <div className="section-header">
        <span className="icon icon-spline icon-lg section-icon" />
        <h2>Why Bézier Curves?</h2>
      </div>
      <div className="prose">
        <p>
          Most shadow generators use <strong>linear interpolation</strong>{" "}
          between layers — each step increases blur and offset by the same
          amount. This creates shadows that feel mechanical and artificial.
        </p>
        <p>
          <strong>Effective Shadow</strong> uses <strong>Bézier curves</strong>{" "}
          to control how shadow properties change across layers. Just like
          easing functions make animations feel natural, Bézier-curved shadows
          create depth that mimics real-world light behavior:
        </p>
        <ul>
          <li>
            <strong>Sharp near the surface</strong> — early layers have minimal
            blur
          </li>
          <li>
            <strong>Soft further away</strong> — outer layers diffuse more
            naturally
          </li>
          <li>
            <strong>Consistent opacity falloff</strong> — no harsh transitions
            between layers
          </li>
        </ul>
        <p>
          The result? Shadows that feel like they belong in physical space, not
          painted on.
        </p>
      </div>
    </section>
  )
}

function SectionBoxVsDrop() {
  return (
    <section className="section" id="box-vs-drop">
      <div className="section-header">
        <span className="icon icon-image icon-lg section-icon" />
        <h2>box-shadow vs. drop-shadow</h2>
      </div>
      <div className="prose">
        <p>
          CSS offers two ways to add shadows. For UI components, here's what
          matters:
        </p>
      </div>

      <table className="comparison-table">
        <thead>
          <tr>
            <th></th>
            <th>box-shadow</th>
            <th>drop-shadow</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Follows border-radius</td>
            <td className="yes">✓</td>
            <td className="yes">✓</td>
          </tr>
          <tr>
            <td>Follows element shape (SVG, PNG)</td>
            <td className="no">✗</td>
            <td className="yes">✓</td>
          </tr>
          <tr>
            <td>GPU accelerated</td>
            <td className="no">✗ CPU</td>
            <td className="yes">✓ GPU</td>
          </tr>
          <tr>
            <td>Smooth animations</td>
            <td className="meh">Repaint</td>
            <td className="yes">Composited</td>
          </tr>
          <tr>
            <td>Creates stacking context</td>
            <td className="yes">No</td>
            <td className="meh">Yes</td>
          </tr>
          <tr>
            <td>Text rendering</td>
            <td className="yes">Normal</td>
            <td className="yes">Normal*</td>
          </tr>
        </tbody>
      </table>

      <div className="prose" style={{ marginTop: 24 }}>
        <p>
          <small>
            * Text blur was an issue in older browsers but is resolved in modern
            Chrome, Safari, and Firefox.
          </small>
        </p>
      </div>

      <div className="recommendation">
        <div className="recommendation-header">
          <span className="icon icon-lightbulb icon-md" />
          <strong>Recommendation for UI Components</strong>
        </div>
        <p>
          For cards, buttons, modals, and other rectangular UI elements: both
          work equally well. <code>filter: drop-shadow()</code> has a slight
          edge for animations due to GPU compositing. Use{" "}
          <code>box-shadow</code> if you need to avoid creating a new stacking
          context.
        </p>
        <p>
          For icons, logos, and images: always use{" "}
          <code>filter: drop-shadow()</code> — it's the only option that follows
          non-rectangular shapes.
        </p>
      </div>

      <div className="prose" style={{ marginTop: 32 }}>
        <p>
          <strong>Visual difference:</strong>
        </p>
      </div>
      <ShadowDemo />
      <div className="prose">
        <p>
          <strong>Effective Shadow</strong> generates both variants with
          matching visual intensity. We compensate for the algorithm differences
          (Gaussian vs. box blur) so shadows look consistent regardless of which
          you choose.
        </p>
      </div>
    </section>
  )
}

function SectionComparisonSystems() {
  return (
    <section className="section section-alt">
      <div className="section-header">
        <span className="icon icon-git-compare icon-lg section-icon" />
        <h2>Across Design Systems</h2>
      </div>
      <p className="section-desc">
        Same elevation concept, different implementations. Notice the layer
        smoothness.
      </p>
      <ComparisonSystems />
    </section>
  )
}

function SectionComparisonTechniques() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="icon icon-copy icon-lg section-icon" />
        <h2>Technique Consistency</h2>
      </div>
      <p className="section-desc">
        Same calculated values, different rendering engines. The math accounts
        for both.
      </p>
      <ComparisonTechniques />
    </section>
  )
}

function SectionColoredShadows() {
  return (
    <section className="section section-alt" id="colored-shadows">
      <div className="section-header">
        <span className="icon icon-sun icon-lg section-icon" />
        <h2>Colored Shadows</h2>
      </div>
      <p className="section-desc">
        Shadows don't have to be black. For CTAs and interactive elements,
        color-matched glows create visual emphasis and reinforce brand identity.
        Pass an RGB value to <code>toBoxShadow()</code> or{" "}
        <code>toDropShadow()</code> — both produce identical results.
      </p>
      <ColoredShadows />
    </section>
  )
}

function SectionPlayground() {
  return (
    <section className="section" id="playground">
      <div className="section-header">
        <span className="icon icon-sliders icon-lg section-icon" />
        <h2>Playground</h2>
      </div>
      <p className="section-desc">
        Experiment with shadow parameters in real-time.
      </p>
      <Playground />
    </section>
  )
}

function SectionQuickStart() {
  return (
    <section className="section section-alt" id="quick-start">
      <div className="section-header">
        <span className="icon icon-zap icon-lg section-icon" />
        <h2>Quick Start</h2>
      </div>

      <div className="usage-section">
        <h3>
          <CssLogo />
          CSS Classes
        </h3>
        <p>
          The simplest approach — import our CSS and use class names directly:
        </p>
        <pre>
          <code className="language-javascript">{`import "@effective/shadow/shadows.css"
···
<div class="shadow-3">Elevated card</div>
<img class="drop-shadow-2" src="icon.svg" />`}</code>
        </pre>
      </div>

      <div className="usage-section">
        <h3>
          <CssLogo />
          CSS Modules
        </h3>
        <p>For scoped styles with automatic class name hashing:</p>
        <pre>
          <code className="language-javascript">{`import shadows from "@effective/shadow/shadows.module.css"
···
<div className={shadows["shadow-3"]}>Elevated card</div>`}</code>
        </pre>
      </div>

      <div className="usage-section">
        <h3>
          <TailwindLogo />
          Tailwind CSS Plugin
        </h3>
        <p>Extend Tailwind with our shadow utilities:</p>
        <pre>
          <code className="language-javascript">{`// tailwind.config.js
import effectiveShadow from "@effective/shadow/tailwind"

export default {
  plugins: [effectiveShadow]
}
···
<div class="shadow-effective-3">Card</div>
<img class="drop-shadow-effective-2" src="icon.svg" />`}</code>
        </pre>
      </div>

      <div className="usage-section">
        <h3>
          <JsLogo />
          JavaScript API
        </h3>
        <p>For full control, use the TypeScript/JavaScript API:</p>
        <pre>
          <code className="language-javascript">{`// Pre-generated shadows (levels 0-7)
import { boxShadow, dropShadow } from "@effective/shadow"

element.style.boxShadow = boxShadow[3]
element.style.filter = dropShadow[2]
···
// Custom shadows with full control
import { buildShadow, toBoxShadow, toDropShadow } from "@effective/shadow"

const shadow = buildShadow({
  shadowLayers: 4,
  finalOffsetY: 12,
  finalBlur: 24,
  finalAlpha: 0.25
})

const css = toBoxShadow(shadow)
const filter = toDropShadow(shadow)`}</code>
        </pre>
      </div>
    </section>
  )
}

function CssLogo() {
  return (
    <svg
      className="usage-logo"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 3l-.65 3.34h13.59L17.5 9H3.87l-.65 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64H2.16l-.72 3.63 7.89 3.01 9.09-3.01L21 3H5z"
        fill="#264DE4"
      />
    </svg>
  )
}

function TailwindLogo() {
  return (
    <svg
      className="usage-logo"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 1.95-1.65 3.15-1.35.686.171 1.176.666 1.719 1.215C13.194 10.298 14.126 11.25 16.5 11.25c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.686-.171-1.176-.666-1.719-1.215C15.306 6.952 14.374 6 12 6zM7.5 11.25c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 1.95-1.65 3.15-1.35.686.171 1.176.666 1.719 1.215.825.833 1.757 1.785 4.131 1.785 2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.686-.171-1.176-.666-1.719-1.215C10.806 12.202 9.874 11.25 7.5 11.25z"
        fill="#06B6D4"
      />
    </svg>
  )
}

function JsLogo() {
  return (
    <svg
      className="usage-logo"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E" />
      <path
        d="M13.5 18.5c.4.7 1 1.2 2 1.2.8 0 1.4-.4 1.4-1 0-.7-.6-1-1.5-1.4l-.5-.2c-1.5-.6-2.5-1.4-2.5-3.1 0-1.5 1.2-2.7 3-2.7 1.3 0 2.3.5 2.9 1.7l-1.6 1c-.4-.6-.7-.9-1.4-.9-.6 0-1 .4-1 .9 0 .6.4.9 1.3 1.3l.5.2c1.8.8 2.8 1.5 2.8 3.3 0 1.9-1.5 2.9-3.4 2.9-1.9 0-3.2-.9-3.8-2.1l1.8-1.1zM6.5 18.7c.3.5.5 1 1.2 1 .6 0 1-.2 1-1.2v-6.3h2v6.4c0 2-1.2 2.9-2.9 2.9-1.5 0-2.4-.8-2.9-1.7l1.6-1.1z"
        fill="#000"
      />
    </svg>
  )
}

function SectionInspiration() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="icon icon-lightbulb icon-lg section-icon" />
        <h2>Inspired By</h2>
      </div>
      <p className="section-desc">Standing on the shoulders of giants.</p>
      <ul className="inspiration-list">
        <li>
          <a
            href="https://www.joshwcomeau.com/css/designing-shadows/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Designing Beautiful Shadows in CSS
          </a>{" "}
          — Josh W. Comeau's foundational article on layered shadow techniques
        </li>
        <li>
          <a
            href="https://www.joshwcomeau.com/shadow-palette/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shadow Palette Generator
          </a>{" "}
          — Interactive tool for creating coordinated shadow sets
        </li>
        <li>
          <a
            href="https://shadows.brumm.af/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Smooth Shadow Generator
          </a>{" "}
          — Philipp Brumm's smooth shadow tool with easing controls
        </li>
        <li>
          <a
            href="https://m3.material.io/styles/elevation/overview"
            target="_blank"
            rel="noopener noreferrer"
          >
            Material Design 3 Elevation
          </a>{" "}
          — Google's elevation system and shadow principles
        </li>
      </ul>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        <span className="icon icon-heart icon-sm footer-icon" />
        Built by{" "}
        <a href="https://www.sebastian-software.de">Sebastian Software</a>
      </p>
      <div className="footer-links">
        <a href="https://github.com/sebastian-software/effective-shadow">
          <span className="icon icon-github icon-md" /> GitHub
        </a>
        <a href="https://www.npmjs.com/package/@effective/shadow">
          <span className="icon icon-package icon-md" /> npm
        </a>
      </div>
    </footer>
  )
}

export function App() {
  return (
    <div className="page">
      <Hero />
      <SectionElevation />
      <SectionWhyBezier />
      <SectionBoxVsDrop />
      <SectionComparisonSystems />
      <SectionComparisonTechniques />
      <SectionColoredShadows />
      <SectionPlayground />
      <SectionQuickStart />
      <SectionInspiration />
      <Footer />
    </div>
  )
}
