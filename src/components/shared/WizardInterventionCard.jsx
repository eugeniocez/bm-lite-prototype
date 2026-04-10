import Modal from './Modal'

export default function WizardInterventionCard({
  isOpen,
  onClose,
  title,
  description,
  ctaLabel,
  ctaIcon: CtaIcon,
  ctaClassName = '',
  contentClassName = '',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} closeOnBackdrop={false}>
      <div className={`min-h-[220px] flex flex-col justify-between gap-8 py-2 ${contentClassName}`}>
        <div className="text-[15px] leading-7 text-gray-600 dark:text-gray-300">
          {description}
        </div>
        <button
          type="button"
          onClick={onClose}
          className={`w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3.5 rounded-xl text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors ${ctaClassName}`}
        >
          <span>{ctaLabel}</span>
          {CtaIcon && <CtaIcon size={16} />}
        </button>
      </div>
    </Modal>
  )
}