import { GetAncestorsOfDocumentAsync } from "@/services/services.umbraco/services.umbraco.content";
import Link from "next/link";


const Header = async ({ thisPage }: { thisPage: any }) => {
    /**
     * Get the page's ancestors for the breadcrumb
     */
    const pageAncestors = await GetAncestorsOfDocumentAsync(thisPage.id);

    return (
        <>
            <h1 className='text-5xl mb-4'>{thisPage.name}</h1>


            <ol className='inline-flex items-center space-x-1'>
                {
                /** 
                 * Check the pageAncestors.items has any content, and if so, render the breadcrumb
                 */
                pageAncestors.items && (
                    pageAncestors.items.map((ancestor: any) => (
                        <li key={ancestor.id} className='inline-flex items-center'>
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <Link href={ancestor.route.path}>
                                {ancestor.name}
                            </Link>
                        </li>
                    ))
                )}
                <li className='inline-flex items-center italic'>
                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    {thisPage.name}
                </li>
            </ol>
        </>
    )
}

export default Header;