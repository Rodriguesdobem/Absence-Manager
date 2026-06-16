// Servico para buscar dados reais de clima na Open-Meteo (sem API key)
// Usado pelo Dashboard para substituir o mock de "Clima Mundial".

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast'

const CACHE_KEY = 'absence_manager_clima_cache_v1'
const CACHE_TTL_MS = 15 * 60 * 1000 // 15 min

const CIDADES = [
  { nome: 'Barueri', latitude: -23.5106, longitude: -46.8761 },
  { nome: 'São Paulo', latitude: -23.5505, longitude: -46.6333 },
  { nome: 'Rio de Janeiro', latitude: -22.9068, longitude: -43.1729 },
  { nome: 'Brasília', latitude: -15.7939, longitude: -47.8828 },
]

function mapWeatherCodeToTextAndIcon(weathercode) {
  const code = Number(weathercode)

  const map = [
    { max: 0, text: 'Céu limpo', icon: '☀️' },
    { max: 1, text: 'Principalmente limpo', icon: '🌤️' },
    { max: 2, text: 'Parcialmente nublado', icon: '⛅' },
    { max: 3, text: 'Nublado', icon: '☁️' },
    { max: 45, text: 'Neblina', icon: '🌫️' },
    { max: 48, text: 'Neblina congelante', icon: '🌫️' },
    { max: 51, text: 'Chuva fraca', icon: '🌦️' },
    { max: 53, text: 'Chuva moderada', icon: '🌧️' },
    { max: 55, text: 'Chuva forte', icon: '🌧️' },
    { max: 57, text: 'Chuva congelante', icon: '🌧️' },
    { max: 61, text: 'Chuva fraca', icon: '🌦️' },
    { max: 63, text: 'Chuva moderada', icon: '🌧️' },
    { max: 65, text: 'Chuva forte', icon: '🌧️' },
    { max: 67, text: 'Chuva congelante', icon: '🌧️' },
    { max: 71, text: 'Neve fraca', icon: '❄️' },
    { max: 73, text: 'Neve moderada', icon: '❄️' },
    { max: 75, text: 'Neve forte', icon: '❄️' },
    { max: 77, text: 'Grãos de neve', icon: '❄️' },
    { max: 80, text: 'Aguaceiro fraco', icon: '🌦️' },
    { max: 81, text: 'Aguaceiro moderado', icon: '🌧️' },
    { max: 82, text: 'Aguaceiro forte', icon: '🌧️' },
    { max: 83, text: 'Aguaceiro intenso', icon: '⛈️' },
    { max: 86, text: 'Granizo fraco', icon: '⛈️' },
    { max: 95, text: 'Tempestade', icon: '⛈️' },
    { max: 99, text: 'Tempestade intensa', icon: '⛈️' },
  ]

  const hit = map.find((m) => code <= m.max)
  return hit || { text: 'Condição desconhecida', icon: '🌡️' }
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    if (!parsed.generatedAt || !Array.isArray(parsed.data)) return null

    const age = Date.now() - parsed.generatedAt
    if (age > CACHE_TTL_MS) return null

    return parsed.data
  } catch {
    return null
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ generatedAt: Date.now(), data }))
  } catch {
    // ignore
  }
}

async function fetchCityWeather({ nome, latitude, longitude }, { timeoutMs = 8000 } = {}) {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), timeoutMs)

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current_weather: 'true',
    hourly: 'relativehumidity_2m,wind_speed_10m',
  })

  try {
    const url = `${OPEN_METEO_BASE_URL}?${params.toString()}`
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const json = await res.json()

    const current = json.current_weather || {}
    const hourly = json.hourly || {}

    const temperature = current.temperature ?? null
    const weathercode = current.weathercode ?? null
    const windSpeedMps = current.windspeed ?? null

    const humidityArr = hourly.relativehumidity_2m || []
    const windArr = hourly.wind_speed_10m || []

    const humidity = humidityArr.length ? humidityArr[0] : null
    const windSpeed10m = windArr.length ? windArr[0] : null

    const mapped = mapWeatherCodeToTextAndIcon(weathercode)

    return {
      nome,
      temperature,
      feelsLike: null,
      weather: {
        text: mapped.text,
        icon: mapped.icon,
        weathercode,
      },
      humidity,
      windSpeedMps,
      windSpeed10m,
    }
  } finally {
    clearTimeout(t)
  }
}

export async function getClimaMundial({ useCache = true } = {}) {
  if (useCache) {
    const cached = readCache()
    if (cached) return cached
  }

  const results = await Promise.all(
    CIDADES.map((cidade) =>
      fetchCityWeather(cidade).catch((err) => ({
        nome: cidade.nome,
        error: String(err?.message || err),
      }))
    )
  )

  const normalized = results.map((r) => {
    if (r?.error) {
      return {
        nome: r.nome,
        temperature: null,
        feelsLike: null,
        weather: { text: null, icon: '🌡️' },
        humidity: null,
        windSpeedMps: null,
        windSpeed10m: null,
        error: r.error,
      }
    }
    return r
  })

  writeCache(normalized)
  return normalized
}

export const cidadesClima = CIDADES

