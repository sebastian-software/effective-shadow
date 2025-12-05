import { useState, useCallback } from "react"
import { Highlight, themes } from "prism-react-renderer"
import { Icon } from "./Icons"

interface CodeBlockProps {
  code: string
  language?: string
  showCopy?: boolean
  label?: string
}

export function CodeBlock({
  code,
  language = "tsx",
  showCopy = true,
  label
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code.trim())
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      console.error("Failed to copy")
    }
  }, [code])

  return (
    <div className="code-block-wrapper">
      {label && <div className="code-block-label">{label}</div>}
      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="code-block" style={style}>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
      {showCopy && (
        <button
          className={`code-copy-btn ${isCopied ? "copied" : ""}`}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          <Icon name={isCopied ? "check" : "copy"} size="sm" />
        </button>
      )}
    </div>
  )
}
