export type TelemetryEventName =
  | "page:view"
  | "cta:click"
  | "export:pdf:request"
  | "export:pdf:success"
  | "export:pdf:error"
  | "export:docx:request"
  | "export:docx:success"
  | "export:docx:error"
  | "ui:error"
  | "ui:rage_click";

export type TelemetryDeviceClass = "mobile" | "desktop" | "unknown";

export type TelemetryEvent = {
  name: TelemetryEventName;
  /**
   * ISO date string at client; server will also record its own timestamp.
   * Not trusted for security decisions; used only for debugging.
   */
  ts?: string;
  path: string;
  device?: TelemetryDeviceClass;
  props?: Record<string, unknown>;
};

export type TelemetryIngestResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

