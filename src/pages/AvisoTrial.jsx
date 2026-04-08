import { useNavigate } from 'react-router-dom'
import { useNegocioStore } from '../store/negocio'
import TrialNoticeContent, { TRIAL_DAYS_DEMO } from '../components/shared/TrialNoticeContent'

export default function AvisoTrial() {
  const navigate = useNavigate()
  const nombreBarberia = useNegocioStore(s => s.nombreBarberia) || 'tu barbería'

  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 flex justify-center">
      <TrialNoticeContent
        dias={TRIAL_DAYS_DEMO}
        nombreBarberia={nombreBarberia}
        variant="fullscreen"
        onBack={() => navigate('/calendario')}
        onActivate={() => navigate('/settings/subscription')}
        onRemindLater={() => navigate('/calendario')}
      />
    </div>
  )
}