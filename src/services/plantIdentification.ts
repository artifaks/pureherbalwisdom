export interface PlantSuggestion {
  name: string; // scientific name
  probability: number;
  commonNames: string[];
  similarImageUrl?: string;
}

export interface IdentificationResult {
  suggestions: PlantSuggestion[];
  isPlant: boolean;
}

export interface IdentificationError {
  message: string;
  isRateLimit?: boolean;
}

function getApiKey(): string {
  return import.meta.env.VITE_PLANTID_API_KEY || '';
}

export async function identifyPlant(base64Image: string): Promise<IdentificationResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Plant identification API key is not configured.');
  }

  // Strip data URL prefix if present
  const imageData = base64Image.includes(',')
    ? base64Image.split(',')[1]
    : base64Image;

  const response = await fetch('https://plant.id/api/v3/identification', {
    method: 'POST',
    headers: {
      'Api-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      images: [imageData],
      similar_images: true,
    }),
  });

  if (response.status === 429) {
    const error: IdentificationError = {
      message: 'Daily identification limit reached. Please try again tomorrow.',
      isRateLimit: true,
    };
    throw error;
  }

  if (!response.ok) {
    throw new Error('Unable to identify plant. Please try again.');
  }

  const data = await response.json();

  const isPlant = data.result?.is_plant?.probability > 0.5;

  const suggestions: PlantSuggestion[] = (
    data.result?.classification?.suggestions || []
  )
    .slice(0, 5)
    .map((s: any) => ({
      name: s.name || '',
      probability: s.probability || 0,
      commonNames: s.details?.common_names || [],
      similarImageUrl: s.similar_images?.[0]?.url,
    }));

  return { suggestions, isPlant };
}
