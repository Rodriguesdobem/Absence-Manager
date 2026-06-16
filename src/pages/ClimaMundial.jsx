import React, { useEffect, useMemo, useState } from 'react'
import { getClimaMundial } from '../Services/ClimaService'

const formatTemp = (v) => {
  if (v === null || v === undefined || Number.isNaN(Number(v))) return '—'
  return `${Math.round(Number(v))}°C`
}

function WeatherMetaRow({ icon, label, value }) {
  return (
    <div className="db-weather-meta-item">
      <span>{icon}</span>
      <span>{label}: {value}</span>
    </div>
  )
}

function WeatherErrorCard({ errorText }) {
  return (
    <div className="db-weather-main">
      <div className="db-weather-city">Clima Mundial</div>
      <div className="db-weather-temp">—</div>
      <div className="db-weather-desc">
        <span>⚠️</span>
        <span>Erro ao carregar clima</span>
      </div>
      <div className="db-weather-meta">
        <div className="db-weather-meta-item">
          <span>📝</span>
          <span>{errorText || 'Tente novamente mais tarde.'}</span>
        </div>
      </div>
    </div>
  )
}

export default function ClimaMundial() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [climas, setClimas] = useState(null)

  const cidadePrincipal = useMemo(() => {
    // Mantém a mesma estrutura do mock: "Barueri" é o card principal.
    return climas?.find((c) => c.nome === 'Barueri')
  }, [climas])

  const cidadesChips = useMemo(() => {
    if (!climas) return []
    // Mantém ordem do mock: São Paulo, Rio de Janeiro, Brasília
    const nomes = ['São Paulo', 'Rio de Janeiro', 'Brasília']
    return nomes.map((nome) => climas.find((c) => c.nome === nome)).filter(Boolean)
  }, [climas])

  useEffect(() => {
    let cancelled = false

    async function run() {
      setLoading(true)
      setError(null)
      try {
        const data = await getClimaMundial({ useCache: true })
        if (!cancelled) setClimas(data)
      } catch (e) {
        if (!cancelled) setError('Erro ao carregar clima')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="db-card db-card-weather" style={{ opacity: 0.9 }}>
        <div className="db-card-section-title">
          <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>
          Clima Mundial
        </div>
        <div className="db-updates-empty" style={{ paddingTop: 18 }}>
          <span>Carregando clima...</span>
        </div>
      </div>
    )
  }

  const main = cidadePrincipal

  const mainTemp = main ? formatTemp(main.temperature) : '—'
  const mainDesc = main?.weather?.text ? `${main.weather.icon} ${main.weather.text}` : '—'
  const mainHumidity = main?.humidity !== null && main?.humidity !== undefined ? `${Math.round(Number(main.humidity))}%` : '—'

  // Vento: usamos current_weather.windspeed (m/s) convertendo para km/h
  const windKmH = main?.windSpeedMps !== null && main?.windSpeedMps !== undefined
    ? `${Math.round(Number(main.windSpeedMps) * 3.6)} km/h`
    : (main?.windSpeed10m !== null && main?.windSpeed10m !== undefined ? `${Math.round(Number(main.windSpeed10m) * 3.6)} km/h` : '—')

  // Se todas as cidades falharem, mostramos erro no card principal.
  const anySuccess = Array.isArray(climas) && climas.some((c) => !c.error)
  if (!anySuccess) {
    return (
      <div className="db-card db-card-weather">
        <div className="db-card-section-title">
          <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>
          Clima Mundial
        </div>
        <WeatherErrorCard errorText={error} />
      </div>
    )
  }

  return (
    <div className="db-card db-card-weather">
      <div className="db-card-section-title">
        <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>
        Clima Mundial
      </div>

      {/* Card principal (Barueri) */}
      <div className="db-weather-main">
        <div className="db-weather-city">{main?.nome || 'Barueri'}</div>
        <div className="db-weather-temp">{mainTemp}</div>
        <div className="db-weather-desc">
          <span>{main?.weather?.icon || '🌡️'}</span>
          <span>{main?.weather?.text || 'Condição indisponível'}</span>
        </div>
        <div className="db-weather-meta">
          <WeatherMetaRow icon="💧" label="Umidade" value={mainHumidity} />
          <WeatherMetaRow icon="💨" label="Vento" value={windKmH} />
        </div>
      </div>

      {/* Chips de outras cidades */}
      <div className="db-weather-cities">
        {cidadesChips.map((c) => (
          <div key={c.nome} className="db-city-chip">
            {c.nome}
            <br />
            <strong>{formatTemp(c.temperature)}</strong>
          </div>
        ))}
        {/* Fallback se alguma cidade falhar */}
        {cidadesChips.length < 3 && (
          <>
            {['São Paulo', 'Rio de Janeiro', 'Brasília'].map((nome) => {
              if (cidadesChips.some((c) => c.nome === nome)) return null
              return (
                <div key={nome} className="db-city-chip">
                  {nome}
                  <br />
                  <strong>—</strong>
                </div>
              )
            })}
          </>
        )}
      </div>

      {error && (
        <div style={{ marginTop: 10, color: 'rgba(255,255,255,0.6)', fontSize: 12, textAlign: 'center' }}>
          {error}
        </div>
      )}
    </div>
  )
}

