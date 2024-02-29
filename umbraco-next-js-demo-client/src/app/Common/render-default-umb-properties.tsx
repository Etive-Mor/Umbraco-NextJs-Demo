const RenderDefaultUmbracoProperties = async ({ umbProps }: { umbProps: any }) => {
    const str = JSON.stringify(umbProps, null, '\t');
    return (
        <>
            <div className="w-auto">
                <h4 className='text-xl'>Page JSON</h4>
                <pre className='text-xs overflow-x-auto'>
                    <code>
                        {str}
                    </code>
                </pre>
            </div>
        </>
    )
}

export default RenderDefaultUmbracoProperties;