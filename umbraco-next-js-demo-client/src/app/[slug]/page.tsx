import { GetPageAsync } from "@/services/services.umbraco/services.umbraco.content";


const page = async ({params}: {params: any}) => {
    const thisPage = await GetPageAsync(params.slug)


    return (
        <>
            <p>
                {thisPage.name}
            </p>
        </>
    )
}



export default page;