import { boxShadow, dropShadow } from "."

import "./Shadow.css"

export function Shadow() {
  return (
    <div className="group">
      <div className="col">
        {boxShadow.map((shadow, index) => (
          <div key={index} className="shadow" style={{ boxShadow: shadow }}>
            Box Shadow: {index}
          </div>
        ))}
      </div>
      <div className="col">
        {dropShadow.map((shadow, index) => (
          <div key={index} className="shadow" style={{ filter: shadow }}>
            Drop Shadow: {index}
          </div>
        ))}
      </div>
    </div>
  )
}
