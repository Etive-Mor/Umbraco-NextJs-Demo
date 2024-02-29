import { GetPageAsync } from "@/services/services.umbraco/services.umbraco.content";
import RenderDefaultUmbracoProperties from "../Common/render-default-umb-properties";
import Header from "../Common/header";
import SiteMap from "../Common/sitemap";


const page = async ({ params }: { params: any }) => {
    console.log('slug: ' + JSON.stringify(params.slug))
    const thisPage = await GetPageAsync(params.slug.join('/'));

    return (
        <>
            <div className='grid grid-cols-6 gap-4'>
                <div className='col-span-6'>
                    <Header thisPage={thisPage} slug={params.slug} />
                </div>
                <div className='col-span-4'>
                    <h1 className="text-3xl mb-4">{thisPage.name}</h1>
                    <p className='py-3'>This page is a dynamic [...slug]</p>
                </div>
                <div className='col-span-2'>
                    <RenderDefaultUmbracoProperties umbProps={thisPage} />
                    <SiteMap />

                </div>
            </div>
        </>
    )
}

export default page;