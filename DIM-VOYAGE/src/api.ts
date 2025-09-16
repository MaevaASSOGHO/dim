// src/api.ts
type Query = Record<string, string | number | boolean | undefined | null>;

function buildQuery(params?: Query) {
  if (!params) return "";
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") q.append(k, String(v));
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}

// Détermine la base URL depuis ton .env (Vite ou Next)
const BASE_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) ||
  // @ts-ignore (Vite injecte import.meta.env)
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_URL) ||
  "http://127.0.0.1:8000/api";

export class ApiError extends Error {
  status: number;
  data: any;
  constructor(status: number, data: any) {
    super(`API ${status}`);
    this.status = status;
    this.data = data;
  }
}

type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params?: Query;
  body?: any;                 // objet JS ou FormData
  token?: string | null;      // si tu gères un Bearer token
  headers?: Record<string, string>;
  timeoutMs?: number;         // ex: 10000
};

async function request<T = any>(path: string, opts: Options = {}): Promise<T> {
  const {
    method = "GET",
    params,
    body,
    headers = {},
    timeoutMs = 10000,
  } = opts;

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${BASE_URL}${path}${buildQuery(params)}`;
  console.log("BASE_URL =", process.env.NEXT_PUBLIC_API_URL);
  console.log("TOKEN =", token);

  // Timeout avec AbortController
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const res = await fetch(url, {
    method,
    signal: controller.signal,
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    credentials: "omit",
    cache: "no-store",
  }).finally(() => clearTimeout(id));

  // Essaie de parser la réponse (JSON la plupart du temps)
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json().catch(() => null) : await res.text();

  if (!res.ok) {
    throw new ApiError(res.status, data);
  }
  return data as T;
}

// Helpers pratiques
export const api = {
  get:  <T = any>(p: string, o?: Omit<Options, "method" | "body">) => request<T>(p, { ...o, method: "GET" }),
  post: <T = any>(p: string, body?: any, o?: Omit<Options, "method" | "body">) => request<T>(p, { ...o, method: "POST", body }),
  put:  <T = any>(p: string, body?: any, o?: Omit<Options, "method" | "body">) => request<T>(p, { ...o, method: "PUT", body }),
  patch:<T = any>(p: string, body?: any, o?: Omit<Options, "method" | "body">) => request<T>(p, { ...o, method: "PATCH", body }),
  del:  <T = any>(p: string, o?: Omit<Options, "method" | "body">) => request<T>(p, { ...o, method: "DELETE" }),
};

export default api;
