import { LandscapeContentSchema } from "./schema";
import mumbaiRaw from "./landscapes/mumbai.json";
import gangotriRaw from "./landscapes/gangotri.json";
import karnalRaw from "./landscapes/karnal.json";
import marathwadaRaw from "./landscapes/marathwada.json";
import arcticRaw from "./landscapes/arctic.json";
import amazonRaw from "./landscapes/amazon.json";
import greatBarrierReefRaw from "./landscapes/great-barrier-reef.json";

console.log("🔍 Validating all climate landscapes against Zod schema...");

const entries: [string, unknown][] = [
  ["mumbai", mumbaiRaw],
  ["gangotri", gangotriRaw],
  ["karnal", karnalRaw],
  ["marathwada", marathwadaRaw],
  ["arctic", arcticRaw],
  ["amazon", amazonRaw],
  ["great-barrier-reef", greatBarrierReefRaw],
];

try {
  const validatedList: { id: string; name: string }[] = [];
  for (const [id, raw] of entries) {
    const val = LandscapeContentSchema.parse(raw);
    validatedList.push({ id, name: val.name });
  }

  console.log(`✅ Build Validation Passed: Successfully validated ${validatedList.length} landscape datasets:`);
  for (const item of validatedList) {
    console.log(`   - ${item.id} (${item.name}): OK`);
  }
  process.exit(0);
} catch (error) {
  console.error("❌ Fatal Validation Error: Missing required field or invalid format in landscape content!");
  console.error(error);
  process.exit(1);
}
