
/**
 * Returns a simple HTML page
 * @returns 
 */
const HelloWorld = async () => {
    return (
        <>
            <h1 className="text-3xl mb-4">Hello World</h1>
            <p>This page is a static HTML page within the NextJS app. It is not changed by Umbraco</p>
        </>
    );
}


/**
 * Generates the page's metadata
 * @param param0 the page's params, which must include a property params.slug
 * @returns the page's metadata
 */
export async function generateMetadata(): Promise<Metadata> {
    const data = {
        title: 'static hello world page',
        description: 'this is a static metadata description',
    }
    return data;

}


export default HelloWorld;
