/**
 * Enhanced fetch API utility with support for Next.js revalidation and query parameters
 *
 * @param {ApiParameter} params - The parameters for the API request
 * @param {string} params.endpoint - The API endpoint
 * @param {"client" | "server"} params.type - The type of API request
 * @param {HttpMethod} [params.method="GET"] - The HTTP method
 * @param {string} [params.token] - The authentication token
 * @param {Record<string, unknown>} [params.body] - The request body
 * @param {Record<string, string>} [params.reqHeader] - Additional request headers
 * @param {number | false} [params.revalidate] - Next.js revalidation time in seconds
 * @param {string[]} [params.tags] - Next.js cache tags for on-demand revalidation
 * @param {Record<string, string | number | boolean | undefined>} [params.queryParams] - URL query parameters
 * @param {RequestCache} [params.cache] - Cache strategy for the request
 * @returns {Promise<ApiResponse<T>>} - The API response
 */
async function fetchAPI<T>({
  endpoint,
  type,
  method = "GET",
  token,
  body,
  reqHeader = {},
  revalidate,
  tags,
  queryParams,
  cache,
}: ApiParameter): Promise<ApiResponse<T>> {
  let API_BASE_URL = process.env.API_BASE_URL as string;

  const constructURL = (
    baseUrl: string,
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
  ) => {
    const url = new URL(type === "server" ? baseUrl + endpoint : endpoint);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  };

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...reqHeader,
  };

  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (revalidate !== undefined) {
    requestOptions.next = {
      ...requestOptions.next,
      revalidate,
    };
  }

  if (tags && tags.length > 0) {
    requestOptions.next = {
      ...requestOptions.next,
      tags,
    };
  }

  if (cache) {
    requestOptions.cache = cache;
  }

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const url = constructURL(API_BASE_URL, endpoint, queryParams);

  try {
    const response = await fetch(url, requestOptions);

    if (response.status === 500) {
      throw new Error("Internal Server Error");
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        code: response.status,
        status: response.ok,
        message: data?.message,
        error: data?.message,
      } as ApiResponse<T>;
    }

    return data as ApiResponse<T>;
  } catch (error) {
    console.error("Error making authenticated request:", error);
    return {
      code: 500,
      status: false,
      message: "Error from API",
      error: error instanceof Error ? error.message : "Unknown error",
    } as ApiResponse<T>;
  }
}

export default fetchAPI;
