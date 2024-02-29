import { isValidGuid } from "@/app/Common/Helpers/guid";


export {
    getAllContentPagedAsync as GetAllContentPagedAsync,
    getPageAsync as GetPageAsync,
    getAncestorsOfDocument as GetAncestorsOfDocument,
    getDescendantsOfDocument as GetDescendantsOfDocument,
    getChildrenOfDocument as GetChildrenOfDocument
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
    const data = await fetch(`${UMBRACO_URL}/umbraco/delivery/api/v2/content?skip=${skip}&take=${take}&fields=properties[contentBlocks,metaTitle,metaKeywords,metaDescription,relatedBlogPosts]`,
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
    const url:  string = `${UMBRACO_URL}/umbraco/delivery/api/v2/content/item/${pagePath}/?fields=properties[contentBlocks,metaTitle,metaKeywords,metaDescription]`;
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




/**
 * Gets the ancestors of a document by the document's Umbraco ID
 * @param documentId the Umbraco ID (Guid) of the queried document
 * @param skip Used for paging, configures the number of entities to skip over
 * @param take Used for paging, configures the max number of entities to return
 * @returns a collection of Umbraco documents, each of which is the ancestor of the Content item
 * @throws Error when the documentId is not a valid Guid
 */
const getAncestorsOfDocument = async (documentId: string, skip: number = 0, take: number = 10, previewMode: boolean = false) => {
    return getChildrenAncestorsOrDescendants(documentId, 'ancestors', skip, take, previewMode);
}

/**
 * Gets the Descendants of a document by the document's Umbraco ID
 * @param documentId the Umbraco ID (Guid) of the queried document
 * @param skip Used for paging, configures the number of entities to skip over
 * @param take Used for paging, configures the max number of entities to return
 * @returns a collection of Umbraco documents, each of which is the descendant of the Content item
 * @throws Error when the documentId is not a valid Guid
 */
const getDescendantsOfDocument = async (documentId: string, skip: number = 0, take: number = 10, previewMode: boolean = false) => {
    return getChildrenAncestorsOrDescendants(documentId, 'descendants', skip, take, previewMode);
}

/**
 * Gets the Children of a document by the document's Umbraco ID
 * @param documentId the Umbraco ID (Guid) of the queried document
 * @param skip Used for paging, configures the number of entities to skip over
 * @param take Used for paging, configures the max number of entities to return
 * @returns a collection of Umbraco documents, each of which is the child of the Content item
 * @throws Error when the documentId is not a valid Guid
 */
const getChildrenOfDocument = async (documentId: string, skip: number = 0, take: number = 10, previewMode: boolean = false) => {
    return getChildrenAncestorsOrDescendants(documentId, 'children', skip, take, previewMode);
}



const getChildrenAncestorsOrDescendants = async (documentId: string, childrenAncestorOrDescendantsSpecifier: string = 'children', skip: number = 0, take: number = 10, previewMode: boolean = false) => {
    if (childrenAncestorOrDescendantsSpecifier != 'ancestors' && childrenAncestorOrDescendantsSpecifier != 'descendants' && childrenAncestorOrDescendantsSpecifier != 'children') {
        throw Error(`param 'childrenAncestorOrDescendantsSpecifier' must be either ancestor or descendant. Received ${childrenAncestorOrDescendantsSpecifier}`);
    }
    if (!isValidGuid(documentId)) {
        throw Error(`param documentId must be a valid guid, received '${documentId}'`);
    }

    const url = `${UMBRACO_URL}/umbraco/delivery/api/v2/content/?sort=name:asc&fields=properties[contentBlocks,metaTitle,metaKeywords,metaDescription]&fetch=${childrenAncestorOrDescendantsSpecifier}:${documentId}&skip=${skip}&take=${take}`;

    console.log('making request to ' + url)

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
    const umbracoDocuments = await data.json();
    return umbracoDocuments;
}
