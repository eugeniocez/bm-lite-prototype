export default function BrandSignature({ variant = 'lockup', size = 'md', className = '', subdued = false }) {
  const opacityClass = subdued ? 'opacity-70 dark:opacity-60' : ''
  const markSizeClass = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'
  const lockupSizeClass = size === 'sm' ? 'h-7' : 'h-8'

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center ${className}`.trim()} aria-label="BarberMonster">
        <img
          src="/apple-touch-icon.png"
          alt="BarberMonster"
          className={`${markSizeClass} rounded-xl ${opacityClass}`.trim()}
        />
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center ${className}`.trim()} aria-label="BarberMonster">
      <img
        src="/logo.webp"
        alt="BarberMonster"
        className={`${lockupSizeClass} dark:hidden ${opacityClass}`.trim()}
      />
      <img
        src="/logo-white.webp"
        alt="BarberMonster"
        className={`${lockupSizeClass} hidden dark:block ${opacityClass}`.trim()}
      />
    </div>
  )
}