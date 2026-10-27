import type { LandscapeContent } from "./schema";
import mumbaiRaw from "./landscapes/mumbai.json";
import gangotriRaw from "./landscapes/gangotri.json";
import karnalRaw from "./landscapes/karnal.json";
import marathwadaRaw from "./landscapes/marathwada.json";

export const LANDSCAPES: Record<string, LandscapeContent> = {
  mumbai: mumbaiRaw as unknown as LandscapeContent,
  gangotri: gangotriRaw as unknown as LandscapeContent,
  karnal: karnalRaw as unknown as LandscapeContent,
  marathwada: marathwadaRaw as unknown as LandscapeContent,
};

export const LANDSCAPE_IDS = Object.keys(LANDSCAPES) as (keyof typeof LANDSCAPES)[];
