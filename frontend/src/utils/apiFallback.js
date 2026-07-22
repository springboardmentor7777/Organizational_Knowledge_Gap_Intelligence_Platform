/**
 * apiFallback.js
 * Centralized Backend → Mock Data Fallback Architecture.
 *
 * Allows seamless development and testing when backend services are offline
 * while preserving full production backend integration readiness.
 */

const IS_FALLBACK_ENABLED = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

/**
 * Determines if an error is an authentication / authorization failure (401 / 403).
 * Auth errors must NEVER be hidden by mock fallback.
 */
function isAuthError(error) {
  const status = error?.response?.status;
  return status === 401 || status === 403;
}

/**
 * Executes a backend API request with automatic fallback to mock data when backend is offline.
 *
 * @param {Object} config
 * @param {Function} [config.request] - Async function returning Axios response (e.g. () => api.get('/employees'))
 * @param {any|Function} config.mockData - Mock data payload or getter function
 * @param {Function} [config.normalize] - Optional DTO normalization function
 * @param {string} [config.moduleName='Module'] - Module name for console logging
 * @returns {Promise<any>}
 */
export async function fetchWithFallback({
  request,
  mockData,
  normalize = (data) => data,
  moduleName = 'Module',
}) {
  // Attempt backend API call if request function is provided
  if (typeof request === 'function') {
    try {
      const response = await request();
      const payload = response?.data !== undefined ? response.data : response;

      console.info(`[${moduleName}] Connected to backend successfully.`);

      if (Array.isArray(payload)) {
        return payload.map(normalize);
      }
      return normalize(payload);
    } catch (error) {
      // 🚨 CRITICAL: Never hide 401 Unauthorized or 403 Forbidden errors
      if (isAuthError(error)) {
        throw error;
      }

      // If fallback is explicitly disabled in environment, throw error directly
      if (!IS_FALLBACK_ENABLED) {
        console.error(`[${moduleName}] Backend call failed and mock fallback is disabled.`, error);
        throw error;
      }

      console.warn(`[${moduleName}] Backend unavailable (${error.message || 'offline'}). Using mock data.`);
    }
  }

  // Execute fallback to mock data
  const resolvedMock = typeof mockData === 'function' ? mockData() : mockData;
  const mockPayload = await Promise.resolve(resolvedMock);

  if (Array.isArray(mockPayload)) {
    return mockPayload.map(normalize);
  }
  return normalize(mockPayload);
}
