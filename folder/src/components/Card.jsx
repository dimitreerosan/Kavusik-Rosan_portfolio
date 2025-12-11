import React from 'react'

// Reusable card primitive with accessible focus styles and motion-reduce fallbacks
// Props: as (string or component), href, className, children, ariaLabel, ...rest
export default function Card({
  as: Component = 'div',
  href,
  className = '',
  ariaLabel,
  children,
  noHover = false,
  ...rest
}) {
  const base = 'rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300'
  const interactive = noHover ? '' : 'group hover:bg-white/[0.05]'
  const motion = noHover ? '' : 'hover:translate-y-1 hover:scale-[1.01] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100'
  const focus = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black'
  const classes = `${base} ${interactive} ${motion} ${focus} ${className}`

  if (href) {
    return (
      <Component href={href} className={classes} aria-label={ariaLabel} {...rest}>
        {children}
      </Component>
    )
  }
  return (
    <Component className={classes} aria-label={ariaLabel} {...rest}>
      {children}
    </Component>
  )
}
