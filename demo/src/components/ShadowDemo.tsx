import { boxShadow } from "@effective/shadow"

export function ShadowDemo() {
  const shadowValue = boxShadow[4]

  return (
    <div className="shadow-demo">
      <div className="shadow-demo-panel">
        <div className="label">Circle with box-shadow</div>
        <div className="demo-icon-wrapper">
          <div
            className="demo-shape demo-circle"
            style={{ boxShadow: shadowValue }}
          />
        </div>
        <div className="verdict good">✓ box-shadow follows border-radius</div>
      </div>
      <div className="shadow-demo-panel">
        <div className="label">SVG icon with box-shadow</div>
        <div className="demo-icon-wrapper">
          <div className="demo-icon" style={{ boxShadow: shadowValue }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </div>
        <div className="verdict bad">❌ Shadow shows rectangular box</div>
      </div>
    </div>
  )
}
