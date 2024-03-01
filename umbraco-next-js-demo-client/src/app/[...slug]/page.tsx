import { GetAllContentPagedAsync, GetChildrenOfDocumentAsync, GetPageAsync } from "@/services/services.umbraco/services.umbraco.content";
import RenderDefaultUmbracoProperties from "../Common/render-default-umb-properties";
import Header from "../Common/header";
import SiteMapComponent from "../Common/sitemap-component";
import RenderUmbracoBlocklistRow from "../Common/render-umbraco-blocklist-row";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { GenerateDynamicUmbracoMetadataAsync } from "../Common/Helpers/generate-dynamic-umbraco-metadata";


const page = async ({ params }: { params: any }) => {

    /** 
     * This is a big of a hacky redirect to get around Umbraco having a
     * content root of /website/ and a homepage of /website/home/
     */
    if (params.slug[0] === 'home') {
        redirect('/');
    }

    /**
     * Get the page data, and child pages
     */
    const thisPage = await GetPageAsync(params.slug.join('/'));
    const thisPageChildren = await GetChildrenOfDocumentAsync(thisPage.id);

    return (
        <>
            <div className='grid grid-cols-6 gap-4'>
                <div className='col-span-6 pb-12'>
                    {
                        /** 
                         * Render the site's header with a common component
                         */
                    }
                    <Header thisPage={thisPage} />
                </div>
                <div className='col-span-4'>
                    <div className="max-w-prose">
                        {
                            /** 
                             * Check that `thisPage.properties.contentBlocks` has content, and if so
                             * render the ContentRows using a common component
                             */
                        }
                        {thisPage.properties.contentBlocks && (
                            <section className="">
                                {thisPage.properties.contentBlocks.items.map((contentRow: any) => (
                                    <section key={contentRow.content.id} className="gap-7 mb-6 space-y-6">
                                        <RenderUmbracoBlocklistRow content={contentRow.content} settings={contentRow.settings} />
                                    </section>
                                ))}
                            </section>
                        )}
                    </div>

                    <div>
                        {
                            /** 
                             * Check that `thisPageChildren.items` has items, and if so
                             * render links to them
                             */
                        }
                        {thisPageChildren.items && (
                            <>
                                <ol className='grid grid-cols-2 gap-4'>
                                    {thisPageChildren.items.reverse().map((childPage: any) => (

                                        <section key={childPage.id} className="gap-7 mb-6 space-y-6">
                                            <Link href={childPage.route.path}>
                                                <div className='block max-w-sm p-6 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{childPage.name}</h5>
                                                    <p className="font-normal text-gray-700 dark:text-gray-400">{childPage.properties.metaDescription}</p>
                                                </div>
                                            </Link>
                                        </section>
                                    ))}
                                </ol>
                            </>
                        )}
                    </div>
                </div>

                {
                    /** 
                     * Render the page's data for reference
                     */
                }
                <div className='col-span-2  border-solid border-2 border-indigo-600 p-2 space-y-6'>
                    <h3 className='text-xl'>Umbraco Properties for page</h3>
                    <p className=''>This page is a dynamic [...slug]/page.tsx, rendered by <code>./src/app/[...slug]/page.tsx</code></p>
                    <p className=''>This page is of type <code>{thisPage.contentType}</code></p>
                    <p className=''>This page has <code>{thisPageChildren.total}</code> child pages</p>

                    <RenderDefaultUmbracoProperties umbProps={thisPage} />
                    <SiteMapComponent />

                </div>
            </div>
        </>
    )
}

/**
 * Generates the page's metadata
 * @param param0 the page's params, which must include a property params.slug
 * @returns the page's metadata
 */
export async function generateMetadata({ params }: any): Promise<Metadata> {
    return await GenerateDynamicUmbracoMetadataAsync(params.slug.join('/'));
}

/**
 * see:
 * https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration
 * 
 * 
 * https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration
 * @returns 
 */
export async function generateStaticParams(): Promise<any> {
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#paths
    const posts = await GetAllContentPagedAsync(100);

    /** 
     * The umbraco path is a full url path like:
     *  /blog-posts/generative-artificial-intelligence-a-new-frontier-in-creativity-and-innovation
     * We want that split up into an array of strings, which this method does
     */
    return posts.items.map((post: any) => ({
        slug: post.route.path.split('/').filter(notEmpty)
      }))


      function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
        return value !== null && value !== undefined && value !== '';
    }

};


export default page;