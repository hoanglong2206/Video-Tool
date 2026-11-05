import { useEffect } from "react";

export interface StreamEvent {
  event: string;
  data: any;
}

export function useEventStream(onEvent: (event: string, data: any) => void) {
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const es = new EventSource(`${apiUrl}/api/v1/events/stream`);

    const handleEvent = (type: string) => (e: MessageEvent) => {
      try {
        const parsed = JSON.parse(e.data);
        onEvent(type, parsed);
      } catch {
        onEvent(type, e.data);
      }
    };

    es.addEventListener("render:progress", handleEvent("render:progress"));
    es.addEventListener("workflow:stage_changed", handleEvent("workflow:stage_changed"));
    es.addEventListener("approval:decision", handleEvent("approval:decision"));

    es.onerror = () => {
      // EventSource automatically retries connection
    };

    return () => {
      es.close();
    };
  }, [onEvent]);
}
