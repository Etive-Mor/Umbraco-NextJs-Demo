

export {
    getAllContentPagedAsync as GetAllContentPagedAsync
}


const cacheStrategy = 'force-cache'; // 'force-cache' or 'no-store'
const UMBRACO_URL = 'http://localhost:59970'; // replace with your Umbraco URL
const UMBRACO_API_KEY = 'your-api-key'; // replace with your Umbraco API Key if you're using the protected endpoint model
const UMBRACO_CONTENT_LANGUAGE = 'en-US'; // replace with your Umbraco API Key if you're using the protected endpoint model


/**
 * 
 * @param take The number of items to select from the content tree. Defaults to 10
 * @param skip The number of items to skip from the content tree. Defaults to 0
 * @param previewMode Set to `true` to see the pages in preview mode. Defaults to false
 * @returns 
 */
const getAllContentPagedAsync = async (take: number = 10, skip: number = 0, previewMode: boolean = false) => {
    const data = await fetch(`${UMBRACO_URL}/umbraco/delivery/api/v2/content?skip=${skip}&take=${take}&fields=properties%5B%24all%5D`,
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


