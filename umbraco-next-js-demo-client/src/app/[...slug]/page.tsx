import { GetChildrenOfDocument, GetPageAsync } from "@/services/services.umbraco/services.umbraco.content";
import RenderDefaultUmbracoProperties from "../Common/render-default-umb-properties";
import Header from "../Common/header";
import SiteMap from "../Common/sitemap";
import RenderUmbracoContentRows from "../Common/render-umbraco-content-rows";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { GenerateMetadataAsync } from "../Common/Helpers/generate-dynamic-umbraco-metadata";


const page = async ({ params }: { params: any }) => {
    console.log('slug: ' + JSON.stringify(params.slug));

    /** 
     * This is a big of a hacky redirect to get around Umbraco having a
     * content root of /website/ and a homepage of /website/home/
     */
    if (params.slug[0] === 'home') {
        redirect('/');
    }
    const thisPage = await GetPageAsync(params.slug.join('/'));
    const thisPageChildren = await GetChildrenOfDocument(thisPage.id);

    return (
        <>
            <div className='grid grid-cols-6 gap-4'>
                <div className='col-span-6 pb-12'>
                    <Header thisPage={thisPage} />
                </div>
                <div className='col-span-4'>
                    <div className="max-w-prose">
                        {thisPage.properties.contentBlocks && (
                            <section className="">
                                {thisPage.properties.contentBlocks.items.map((contentRow: any) => (
                                    <section key={contentRow.content.id} className="gap-7 mb-6 space-y-6">
                                        <RenderUmbracoContentRows content={contentRow.content} settings={contentRow.settings} />
                                    </section>
                                ))}
                            </section>
                        )}
                    </div>

                    <div>
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

                <div className='col-span-2  border-solid border-2 border-indigo-600 p-2 space-y-6'>
                    <h3 className='text-xl'>Umbraco Properties for page</h3>
                    <p className=''>This page is a non-dynamic [page.tsx], rendered by <code>./src/app/page.tsx</code></p>
                    <p className=''>This page is of type <code>{thisPage.contentType}</code></p>
                    <p className=''>This page has <code>{thisPageChildren.total}</code> child pages</p>

                    <RenderDefaultUmbracoProperties umbProps={thisPage} />
                    <SiteMap />

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
    return await GenerateMetadataAsync( params.slug.join('/') );
}


export default page;