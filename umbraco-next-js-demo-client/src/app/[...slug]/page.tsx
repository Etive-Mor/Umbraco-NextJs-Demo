import { GetPageAsync } from "@/services/services.umbraco/services.umbraco.content";


const page = async ({ params }: { params: any }) => {
    console.log('slug: ' + JSON.stringify(params.slug))
    const thisPage = await GetPageAsync(params.slug.join('/'));


    return (
        <>
            <main className="flex min-h-screen flex-col p-24">
                <h1 className="text-3xl mb-4">{thisPage.name}</h1>
                <p>This page is a dynamic [...slug]</p>

            </main>
        </>
    )
}



export default page;