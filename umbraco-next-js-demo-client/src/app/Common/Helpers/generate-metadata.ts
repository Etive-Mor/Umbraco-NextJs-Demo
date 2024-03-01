import { GetPageAsync } from "@/services/services.umbraco/services.umbraco.content";
import { Metadata } from "next";


/**
 * Gets the page's dynamic metadata from Umbraco
 * @param pageSlug the slug for this page, which will be used to query Umbraco
 * @returns the page's metadata
 */
export async function GenerateMetadataAsync(pageSlug: string): Promise<Metadata> {

    const thisPage = await GetPageAsync(pageSlug);

    const data = {
        title: thisPage.properties.metaTitle,
        description: thisPage.properties.metaDescription,
    }
    return data;
}