import { GetAllContentPagedAsync } from "@/services/services.umbraco/services.umbraco.content";
import Link from "next/link";


const SiteMapComponent = async () => {
    const sitePages: any = await GetAllContentPagedAsync(100);

    return (
        <>
        <div className=''>
        <h4 className='text-xl'>Sitemap</h4>
            <p className="mb-4">There are {sitePages.total} items in the website. Click the links below to navigate</p>

            <div className='relative overflow-x-auto'>
                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-40'>
                        <tr>
                            <th scope="col" className="px-6 py-3">Page Path</th>
                            <th scope="col" className="px-6 py-3">Page Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                            <td className="px-6 py-4">
                                <Link href='hello-world' >
                                    /hello-world/
                                </Link>
                            </td>
                            <td className="px-6 py-4">
                                <Link href='/hello-world/' >
                                    Hello World (non umbraco page)
                                </Link>
                            </td>
                        </tr>
                        {sitePages.items.map((contentRow: any) => (

                            <tr key={contentRow.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                                <td className="px-6 py-4">
                                    <Link href={contentRow.route.path} >
                                        {contentRow.route.path}
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={contentRow.route.path} >
                                        {contentRow.name}
                                    </Link>
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            </div>
        </>
    )
}

export default SiteMapComponent;