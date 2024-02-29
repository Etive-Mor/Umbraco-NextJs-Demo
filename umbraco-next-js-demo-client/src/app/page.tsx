import { GetAllContentPagedAsync } from "@/services/services.umbraco/services.umbraco.content";
import Link from "next/link";



const Home = async() => {
  // const sitePages = await GetAllContentPagedAsync();



  return (
       <h1 className="text-3xl mb-4">This is the nextjs/Umbraco app</h1>
  );
}



export default Home;
