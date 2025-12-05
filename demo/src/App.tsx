import { ElevationGrid } from "./components/ElevationGrid"
import { ShadowDemo } from "./components/ShadowDemo"
import { ComparisonSystems } from "./components/ComparisonSystems"
import { ComparisonTechniques } from "./components/ComparisonTechniques"
import { ColoredShadows } from "./components/ColoredShadows"
import { Playground } from "./components/Playground"
import { Icon } from "./components/Icons"
import { CodeBlock } from "./components/CodeBlock"

function Hero() {
  return (
    <header className="hero">
      {/* Floating orbs for depth */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="hero-content">
        <div className="hero-icon">
          <Icon name="layers" size="xl" />
        </div>
        <h1>Effective Shadow</h1>
        <p className="tagline">Shadows that actually make sense.</p>
        <p className="hero-prose">
          Stop copying random shadow values from Stack Overflow or ChatGPT.{" "}
          <strong>Effective Shadow</strong> uses <strong>Bézier curves</strong>{" "}
          to distribute multiple layers like real light does — smooth, natural,
          and mathematically precise. Grab a preset or roll your own.
        </p>
        <div className="hero-actions">
          <a
            href="https://www.npmjs.com/package/@effective/shadow"
            className="btn btn-primary"
          >
            <Icon name="package" size="md" />
            npm install @effective/shadow
          </a>
          <a
            href="https://github.com/sebastian-software/effective-shadow"
            className="btn btn-secondary"
          >
            <Icon name="github" size="md" />
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
    <section className="section section-glow" id="elevation">
      <div className="section-header">
        <Icon name="sunrise" size="lg" className="section-icon" />
        <h2>Pick Your Altitude</h2>
      </div>
      <div className="prose" style={{ marginBottom: 32 }}>
        <p>
          Seven levels, each roughly <strong>1.5–2× bigger</strong> than the
          last. The higher you go, the more layers we add for that buttery
          smooth falloff.
        </p>
        <p>
          Not just nice numbers — there's actual math behind this. Curious? The{" "}
          <a href="#playground">playground</a> lets you poke at the guts.
        </p>
      </div>
      <ElevationGrid />
    </section>
  )
}

function SectionWhyBezier() {
  return (
    <section className="section section-dots" id="why-bezier">
      <div className="section-header">
        <Icon name="spline" size="lg" className="section-icon" />
        <h2>The Math That Makes It Real</h2>
      </div>
      <div className="prose">
        <p>
          Most shadow tools just divide values linearly. Add 2px blur per layer,
          done. Looks robotic, feels flat.
        </p>
        <p>
          We use <strong>Bézier curves</strong> instead — the same math that
          makes CSS animations feel smooth. Applied to shadows, you get:
        </p>
        <ul>
          <li>
            <strong>Crisp edges up close</strong> — tight blur near the surface
          </li>
          <li>
            <strong>Soft diffusion at distance</strong> — outer layers spread
            naturally
          </li>
          <li>
            <strong>No visible steps</strong> — smooth transitions all the way
          </li>
        </ul>
        <p>
          It's the difference between a shadow that looks <em>drawn on</em> and
          one that looks like it <em>belongs there</em>.
        </p>
      </div>
    </section>
  )
}

function SectionBoxVsDrop() {
  return (
    <section className="section section-mesh" id="box-vs-drop">
      <div className="section-header">
        <Icon name="image" size="lg" className="section-icon" />
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
          <Icon name="lightbulb" size="md" />
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
        <p>
          <strong>Safari tip:</strong> Add <code>will-change: filter</code> to
          elements using <code>drop-shadow()</code> to prevent rendering
          glitches during scroll. This promotes the element to its own
          compositing layer.
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
    <section className="section section-glow">
      <div className="section-header">
        <Icon name="git-compare" size="lg" className="section-icon" />
        <h2>How We Stack Up</h2>
      </div>
      <p className="section-desc">
        Same concept, wildly different results. Spot the smoothness gap.
      </p>
      <ComparisonSystems />
    </section>
  )
}

function SectionComparisonTechniques() {
  return (
    <section className="section section-alt">
      <div className="section-header">
        <Icon name="copy" size="lg" className="section-icon" />
        <h2>One Shadow, Two Flavors</h2>
      </div>
      <p className="section-desc">
        box-shadow for rectangles, drop-shadow for everything else. We make them
        match.
      </p>
      <ComparisonTechniques />
    </section>
  )
}

function SectionColoredShadows() {
  return (
    <section className="section section-glow" id="colored-shadows">
      <div className="section-header">
        <Icon name="paintbrush" size="lg" className="section-icon" />
        <h2>Add Some Color</h2>
      </div>
      <p className="section-desc">
        Black shadows are fine. Colored glows are next level. Perfect for CTAs
        that need to pop.
      </p>
      <ColoredShadows />
    </section>
  )
}

function SectionPlayground() {
  return (
    <section className="section section-mesh" id="playground">
      <div className="section-header">
        <Icon name="sliders" size="lg" className="section-icon" />
        <h2>Build Your Own</h2>
      </div>
      <p className="section-desc">
        Tweak the knobs. See what happens. Copy the result.
      </p>
      <Playground />
    </section>
  )
}

function SectionQuickStart() {
  return (
    <section className="section section-dots" id="quick-start">
      <div className="section-header">
        <Icon name="zap" size="lg" className="section-icon" />
        <h2>Get Started in 30 Seconds</h2>
      </div>

      <div className="usage-section">
        <h3>
          <CssLogo />
          CSS Classes
        </h3>
        <p>
          The simplest approach — import our CSS and use class names directly:
        </p>
        <CodeBlock
          code={`import "@effective/shadow/shadows.css"

<div class="shadow-3">Elevated card</div>
<img class="drop-shadow-2" src="icon.svg" />`}
        />
      </div>

      <div className="usage-section">
        <h3>
          <CssLogo />
          CSS Modules
        </h3>
        <p>For scoped styles with automatic class name hashing:</p>
        <CodeBlock
          code={`import shadows from "@effective/shadow/shadows.module.css"

<div className={shadows["shadow-3"]}>Elevated card</div>`}
        />
      </div>

      <div className="usage-section">
        <h3>
          <TailwindLogo />
          Tailwind CSS Plugin
        </h3>
        <p>Extend Tailwind with our shadow utilities:</p>
        <CodeBlock
          code={`// tailwind.config.js
import effectiveShadow from "@effective/shadow/tailwind"

export default {
  plugins: [effectiveShadow]
}

<div class="shadow-effective-3">Card</div>
<img class="drop-shadow-effective-2" src="icon.svg" />`}
        />
        <a
          href="https://sebastian-software.github.io/effective-shadow/tailwind/"
          target="_blank"
          rel="noopener noreferrer"
          className="demo-link"
        >
          → See Tailwind Demo
        </a>
      </div>

      <div className="usage-section">
        <h3>
          <JsLogo />
          JavaScript API
        </h3>
        <p>For full control, use the TypeScript/JavaScript API:</p>
        <CodeBlock
          code={`// Pre-generated shadows (levels 0-7)
import { boxShadow, dropShadow } from "@effective/shadow"

element.style.boxShadow = boxShadow[3]
element.style.filter = dropShadow[2]

// Custom shadows with full control
import { buildShadow, toBoxShadow, toDropShadow } from "@effective/shadow"

const shadow = buildShadow({
  shadowLayers: 4,
  finalOffsetY: 12,
  finalBlur: 24,
  finalAlpha: 0.25
})

const css = toBoxShadow(shadow)
const filter = toDropShadow(shadow)`}
        />
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
    <section className="section section-alt">
      <div className="section-header">
        <Icon name="lightbulb" size="lg" className="section-icon" />
        <h2>Standing on Shoulders</h2>
      </div>
      <p className="section-desc">
        The folks who figured this stuff out before us.
      </p>
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
          <strong>Smooth Shadow Generator</strong> — Philipp Brumm's smooth
          shadow tool with easing controls (site currently offline)
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
      <div className="footer-brand">
        <div className="footer-logo">
          <Icon name="layers" size="lg" />
        </div>
        <span className="footer-name">Effective Shadow</span>
      </div>

      <p className="footer-tagline">
        Beautiful shadows, mathematically precise.
      </p>

      <div className="footer-links">
        <a
          href="https://github.com/sebastian-software/effective-shadow"
          className="footer-link"
        >
          <Icon name="github" size="md" />
          <span>GitHub</span>
        </a>
        <a
          href="https://www.npmjs.com/package/@effective/shadow"
          className="footer-link"
        >
          <Icon name="package" size="md" />
          <span>npm</span>
        </a>
        <a href="https://www.sebastian-software.de" className="footer-link">
          <Icon name="heart" size="md" />
          <span>Sebastian Software</span>
        </a>
      </div>

      <div className="footer-copyright">
        © {new Date().getFullYear()} Sebastian Software GmbH
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
      <SectionComparisonTechniques />
      <SectionComparisonSystems />
      <SectionColoredShadows />
      <SectionPlayground />
      <SectionQuickStart />
      <SectionInspiration />
      <Footer />
    </div>
  )
}
