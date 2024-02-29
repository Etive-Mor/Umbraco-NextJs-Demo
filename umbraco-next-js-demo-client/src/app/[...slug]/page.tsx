import { GetPageAsync } from "@/services/services.umbraco/services.umbraco.content";
import RenderDefaultUmbracoProperties from "../Common/render-default-umb-properties";
import Header from "../Common/header";
import SiteMap from "../Common/sitemap";
import RenderUmbracoContentRows from "../Common/render-umbraco-content-rows";


const page = async ({ params }: { params: any }) => {
    console.log('slug: ' + JSON.stringify(params.slug))
    const thisPage = await GetPageAsync(params.slug.join('/'));

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
                </div>
                <div className='col-span-2  border-solid border-2 border-indigo-600 p-2 space-y-6'>
                    <h3 className='text-xl'>Umbraco Properties for page</h3>
                    <p className=''>This page is a dynamic [...slug], rendered by <code>./src/app/[...slug]/page.tsx</code></p>
                    <p className=''>This page is of type <code>{thisPage.contentType}</code></p>

                    <RenderDefaultUmbracoProperties umbProps={thisPage} />
                    <SiteMap />

                </div>
            </div>
        </>
    )
}

export default page;