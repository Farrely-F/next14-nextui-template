type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiParameter = {
  endpoint: string;
  type: "client" | "server";
  method?: HttpMethod;
  token?: string;
  body?: Record<string, unknown>;
  reqHeader?: Record<string, string>;
  environment?: "sandbox" | "production";
  revalidate?: number | false;
  tags?: string[];
  queryParams?: Record<string, string | number | boolean | undefined>;
  cache?: RequestCache;
};

type GeneralAPIResponse = {
  code: number;
  status?: boolean;
  message?: string;
  error?: string;
};

type ApiResponse<T> = T extends void
  ? GeneralAPIResponse
  : T & GeneralAPIResponse;
