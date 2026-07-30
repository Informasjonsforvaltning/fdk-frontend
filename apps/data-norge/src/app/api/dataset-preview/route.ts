import { fetchCsrfToken, fetchDatasetPreview } from "@fdk-frontend/data-access/server";
import { isFetchableExternalUrl } from "@fdk-frontend/utils";

const { FDK_BASE_URI, FDK_DATASET_PREVIEW_API_KEY, FDK_DATASET_PREVIEW_LOCAL_BASE_URI } = process.env;

export const POST = async function (request: Request) {
  try {
    const baseUri =
      process.env.NODE_ENV === "development" ? FDK_DATASET_PREVIEW_LOCAL_BASE_URI : `${FDK_BASE_URI}/dataset`;

    const { downloadUrl } = await request.json();

    // Guard against SSRF: only proxy absolute http(s) URLs to non-internal hosts.
    if (typeof downloadUrl !== "string" || !isFetchableExternalUrl(downloadUrl)) {
      return new Response("Invalid download URL", { status: 400 });
    }

    const referer = request.headers.get("referer") ?? "";

    const csrfResponse = await fetchCsrfToken({
      baseUri: `${baseUri}`,
      apiKey: `${FDK_DATASET_PREVIEW_API_KEY}`,
      referer,
    });

    const { token } = await csrfResponse.json();
    const cookies = csrfResponse.headers.getSetCookie();
    const previewResponse = await fetchDatasetPreview({
      baseUri: `${baseUri}`,
      apiKey: `${FDK_DATASET_PREVIEW_API_KEY}`,
      url: downloadUrl,
      rows: 100,
      token,
      cookies,
      referer,
    });
    if (!previewResponse.ok) {
      return new Response("Failed to get dataset preview", { status: previewResponse.status });
    }
    const previewData = await previewResponse.json();
    return new Response(JSON.stringify(previewData), { status: 200 });
  } catch (err) {
    console.error("Failed to get dataset preview", err instanceof Error ? err.message : "unknown error");
    return new Response("Failed to get dataset preview", { status: 500 });
  }
};
