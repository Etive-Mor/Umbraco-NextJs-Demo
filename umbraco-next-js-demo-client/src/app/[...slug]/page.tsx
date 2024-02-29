import { GetPageAsync } from "@/services/services.umbraco/services.umbraco.content";
import RenderDefaultUmbracoProperties from "../Common/render-default-umb-properties";


const page = async ({ params }: { params: any }) => {
    console.log('slug: ' + JSON.stringify(params.slug))
    const thisPage = await GetPageAsync(params.slug.join('/'));


    return (
        <>
            <h1 className="text-3xl mb-4">{thisPage.name}</h1>
            <p className='py-3'>This page is a dynamic [...slug]</p>
            

            <RenderDefaultUmbracoProperties umbProps={thisPage} />
        </>
    )
}



export default page;