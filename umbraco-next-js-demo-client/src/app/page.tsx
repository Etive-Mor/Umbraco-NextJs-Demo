import { GetAllContentPagedAsync } from "@/services/services.umbraco/services.umbraco.content";
import Link from "next/link";



const Home = async() => {
  const sitePages = await GetAllContentPagedAsync();



  return (
    <main className="flex min-h-screen flex-col p-24">
       <h1 className="text-3xl mb-4">This is the nextjs/Umbraco app</h1>

      <p className="mb-4">There are {sitePages.total} items in the website:</p>


        <ul className="list-disc list-inside pl-4">
        {sitePages.items.map((contentRow: any) => (
                <li key={contentRow.id}>
                  <Link href={contentRow.route.path} >
                    <span className="font-bold">{contentRow.name}</span> at <span className="italic">{contentRow.route.path}</span>
                  </Link>
                </li>
            ))}
        </ul>
    </main>
  );
}



export default Home;
