


const RenderDefaultUmbracoProperties = async ({ umbProps }: { umbProps: any }) => {
    const str = JSON.stringify(umbProps, null, '\t');
    return (
        <>
            <div className="w-auto border-solid border-2 border-indigo-600">
                <p className='text-xl'>Umbraco Properties for node
                    <span className='font-bold italic'>{umbProps.name}</span>
                </p>
                <pre>
                    <code>
                        {str}
                    </code>
                </pre>
            </div>
        </>
    )
}

export default RenderDefaultUmbracoProperties;