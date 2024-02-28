

export {
    getAllContentPagedAsync as GetAllContentPagedAsync,
    getPageAsync as GetPageAsync
}


const cacheStrategy = 'force-cache'; // 'force-cache' or 'no-store'
const UMBRACO_URL = 'http://localhost:59970'; // replace with your Umbraco URL
const UMBRACO_API_KEY = 'your-api-key'; // replace with your Umbraco API Key if you're using the protected endpoint model
const UMBRACO_CONTENT_LANGUAGE = 'en-US'; // replace with your Umbraco API Key if you're using the protected endpoint model


/**
 * Gets all site content in pages
 * 
 * @param take The number of items to select from the content tree. Defaults to 10
 * @param skip The number of items to skip from the content tree. Defaults to 0
 * @param previewMode Set to `true` to see the pages in preview mode. Defaults to false
 * @returns A collection of content items
 */
const getAllContentPagedAsync = async (take: number = 10, skip: number = 0, previewMode: boolean = false) => {
    const data = await fetch(`${UMBRACO_URL}/umbraco/delivery/api/v2/content?skip=${skip}&take=${take}&fields=properties[all]`,
    {
        cache: cacheStrategy,
        method: 'GET',
        headers: {
            'Start-Item': 'Website',
            'Api-Key': `${UMBRACO_API_KEY}`,
            'Accept-Language': `${UMBRACO_CONTENT_LANGUAGE}`,
            'Preview': `${previewMode}`,
        }
    });

    const siteContent = await data.json();
    return siteContent;
}


/**
 * Gets a single page by its pagepath
 * @param pagePath the page path (for example "/home")
 * @param previewMode set to `true` to view the content in preview mode. Defaults to `false`
 * @returns A single content item
 */
const getPageAsync = async (pagePath: string, previewMode: boolean = false) => {
    const url:  string = `${UMBRACO_URL}/umbraco/delivery/api/v2/content/item/${pagePath}/?fields=properties[all]`;
    const data = await fetch(`${url}`,
    {
        cache: cacheStrategy,
        method: 'GET',
        headers: {
            'Start-Item': 'Website',
            'Api-Key': `${UMBRACO_API_KEY}`,
            'Accept-Language': `${UMBRACO_CONTENT_LANGUAGE}`,
            'Preview': `${previewMode}`,
        }
    });

    const pageContent = await data.json();
    return pageContent;

}