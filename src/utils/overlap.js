const MAX_COLS = 3
const HOUR_START = 7
const CELL_HEIGHT = 64

function minutesToPx(min) {
  return ((min - HOUR_START * 60) / 60) * CELL_HEIGHT
}

export function calcularLayout(citas) {
  if (!citas.length) return { normal: [], scrollClusters: [] }

  const DURACION = 60

  const sorted = [...citas].map(c => {
    const [h, m] = c.hora.split(':').map(Number)
    const start = h * 60 + m
    return { ...c, start, end: start + DURACION }
  }).sort((a, b) => a.start - b.start)

  const clusters = []
  let current = []
  for (const cita of sorted) {
    if (current.length === 0) {
      current.push(cita)
    } else {
      const lastEnd = Math.max(...current.map(c => c.end))
      if (cita.start < lastEnd) {
        current.push(cita)
      } else {
        clusters.push([...current])
        current = [cita]
      }
    }
  }
  if (current.length) clusters.push(current)

  const normal = []
  const scrollClusters = []

  for (const cluster of clusters) {
    const cols = []
    for (const cita of cluster) {
      let placed = false
      for (const col of cols) {
        const lastInCol = col[col.length - 1]
        if (cita.start >= lastInCol.end) {
          col.push(cita)
          placed = true
          break
        }
      }
      if (!placed) cols.push([cita])
    }

    const numCols = cols.length

    if (numCols <= MAX_COLS) {
      // Normal — divide ancho equitativamente
      cols.forEach((col, colIdx) => {
        col.forEach(cita => {
          normal.push({
            ...cita,
            _left: colIdx / numCols,
            _width: 1 / numCols,
            _numCols: numCols,
          })
        })
      })
    } else {
      // Scroll — mostrar MAX_COLS visibles, resto con scroll
      const startMin = Math.min(...cluster.map(c => c.start))
      const endMin = Math.max(...cluster.map(c => c.end))
      const topPx = minutesToPx(startMin)
      const heightPx = minutesToPx(endMin) - topPx

      const scrollCitas = []
      cols.forEach((col, colIdx) => {
        col.forEach(cita => {
          scrollCitas.push({
            ...cita,
            _colIdx: colIdx,
            _topInCluster: minutesToPx(cita.start) - topPx,
            _height: Math.max(CELL_HEIGHT * 0.75, 44),
          })
        })
      })

      scrollClusters.push({
        topPx,
        heightPx,
        totalCols: numCols,
        hiddenCount: numCols - MAX_COLS,
        citas: scrollCitas,
      })
    }
  }

  return { normal, scrollClusters }
}
