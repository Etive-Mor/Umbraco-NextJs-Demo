
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

export default HelloWorld;
